import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, catchError, exhaustMap, pipe, switchMap, tap, throwError } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Article, ArticlesApiClient, UpdateArticle } from '../../shared-data-access-api';
import { ApiStatus } from '../../shared-data-access-models/api-status';

export const EditArticleStore = signalStore(
	withState({ status: 'idle' as ApiStatus, article: null as Article | null }),
	withComputed((store) => ({ isLoading: computed(() => store.status() === 'loading') })),
	withMethods((store) => {
		const [router, articlesApiClient] = [inject(Router), inject(ArticlesApiClient)];
		return {
			getArticle: rxMethod<string>(
				pipe(
					filter((slug) => !!slug),
					tap(() => patchState(store, { status: 'loading' })),
					switchMap((slug) =>
						articlesApiClient.getArticle({ slug }).pipe(
							tap((response) => {
								patchState(store, { status: 'success', article: response.article });
							}),
							catchError(({ error }: HttpErrorResponse) => {
								patchState(store, { status: 'error', article: null });
								console.error('error getting article: ', error);
								return throwError(() => error);
							}),
						),
					),
				),
			),
			updateArticle: rxMethod<UpdateArticle>(
				exhaustMap((articleToUpdate) => {
					const article = store.article();
					if (!article) return EMPTY;
					return articlesApiClient.updateArticle({ body: { article: articleToUpdate }, slug: article.slug }).pipe(
						tap((response) => {
							void router.navigate(['/article', response.article.slug]);
						}),
						catchError(({ error }: HttpErrorResponse) => {
							console.error('error updating article: ', error);
							return throwError(() => error);
						}),
					);
				}),
			),
		};
	}),
);
