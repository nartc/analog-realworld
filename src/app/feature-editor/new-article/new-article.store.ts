import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { signalStore, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, catchError, exhaustMap, tap, throwError } from 'rxjs';
import { ArticlesApiClient, NewArticle } from '../../shared-data-access-api';
import { AuthStore } from '../../shared-data-access-auth/auth.store';

export const NewArticleStore = signalStore(
	withMethods(() => {
		const [authStore, router, articlesApiClient] = [inject(AuthStore), inject(Router), inject(ArticlesApiClient)];
		return {
			createArticle: rxMethod<NewArticle>(
				exhaustMap((article) => {
					const currentUser = authStore.user();
					if (!currentUser) return EMPTY;
					return articlesApiClient.createArticle({ body: { article } }).pipe(
						tap((response) => {
							const segments = response ? ['/article', response.article.slug] : ['/profile', currentUser.username];
							void router.navigate(segments);
						}),
						catchError(({ error }: HttpErrorResponse) => {
							console.error('error creating article: ', error);
							return throwError(() => error);
						}),
					);
				}),
			),
		};
	}),
);
