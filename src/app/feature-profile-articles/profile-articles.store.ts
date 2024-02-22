import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, catchError, defer, exhaustMap, switchMap, tap, throwError } from 'rxjs';
import { ProfileStore } from '../feature-profile/profile.store';
import { Article, ArticlesApiClient, FavoritesApiClient } from '../shared-data-access-api';
import { ApiStatus } from '../shared-data-access-models/api-status';
import { injectProfileArticlesType } from './profile-articles.di';

export const ProfileArticlesStore = signalStore(
	withState({ status: 'idle' as ApiStatus, articles: [] as Article[] }),
	withMethods((store) => {
		const [profileStore, favoritesApiClient, articlesApiClient, profileArticlesType] = [
			inject(ProfileStore),
			inject(FavoritesApiClient),
			inject(ArticlesApiClient),
			injectProfileArticlesType(),
		];
		return {
			getArticles: rxMethod(
				switchMap(() => {
					const profile = profileStore.profile();
					if (!profile) return EMPTY;
					return defer(() => {
						return profileArticlesType === 'my'
							? articlesApiClient.getArticles({ author: profile.username })
							: articlesApiClient.getArticles({ favorited: profile.username });
					}).pipe(
						tap((response) => {
							patchState(store, { status: 'success', articles: response.articles });
						}),
						catchError(({ error }: HttpErrorResponse) => {
							patchState(store, { status: 'error', articles: [] });
							return throwError(() => error);
						}),
					);
				}),
			),
			toggleFavorite: rxMethod<Article>(
				exhaustMap(({ favorited, slug }) =>
					defer(() =>
						favorited
							? favoritesApiClient.deleteArticleFavorite({ slug })
							: favoritesApiClient.createArticleFavorite({ slug }),
					).pipe(
						tap((response) => {
							const articles = store.articles().map((article) => (article.slug === slug ? response.article : article));
							patchState(store, { articles });
						}),
					),
				),
			),
		};
	}),
);
