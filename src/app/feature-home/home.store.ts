import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, defer, exhaustMap, pipe, switchMap, tap, throwError } from 'rxjs';
import { Article, ArticlesApiClient, FavoritesApiClient, TagsApiClient } from '../shared-data-access-api';
import { ApiStatus } from '../shared-data-access-models/api-status';
import { FeedType } from '../shared-data-access-models/feed-type';

export type HomeStoreState = {
	getArticlesStatus: ApiStatus;
	toggleFavoriteStatus: ApiStatus;
	getTagsStatus: ApiStatus;
	feedType: FeedType;
	selectedTag: string;
	articles: Article[];
	tags: string[];
};

const initialState = () =>
	<HomeStoreState>{
		getArticlesStatus: 'idle',
		toggleFavoriteStatus: 'idle',
		getTagsStatus: 'idle',
		feedType: 'global',
		selectedTag: '',
		articles: [],
		tags: [],
	};

export const HomeStore = signalStore(
	withState(initialState()),
	withMethods((store) => {
		const [articlesApiClient, favoritesApiClient, tagsApiClient] = [
			inject(ArticlesApiClient),
			inject(FavoritesApiClient),
			inject(TagsApiClient),
		];
		return {
			getTags: rxMethod(
				pipe(
					tap(() => patchState(store, { getTagsStatus: 'loading' })),
					switchMap(() =>
						tagsApiClient.getTags().pipe(
							tap((response) => {
								patchState(store, { getTagsStatus: 'success', tags: response.tags });
							}),
							catchError(({ error }: HttpErrorResponse) => {
								console.error('Error getting tags', error);
								patchState(store, { getTagsStatus: 'error', tags: [] });
								return throwError(() => error);
							}),
						),
					),
				),
			),
			getArticles: rxMethod<{ type: FeedType; tag?: string }>(
				pipe(
					tap(({ tag, type }) => {
						patchState(store, { getArticlesStatus: 'loading', feedType: type, selectedTag: tag || '' });
					}),
					switchMap(({ type, tag }) =>
						defer(() => {
							if (type === 'feed') return articlesApiClient.getArticlesFeed();
							if (type === 'tag' && tag) return articlesApiClient.getArticles({ tag });
							return articlesApiClient.getArticles();
						}).pipe(
							tap((response) => {
								patchState(store, { getArticlesStatus: 'success', articles: response.articles });
							}),
							catchError(({ error }: HttpErrorResponse) => {
								console.error(`Error getting articles for ${type}`, error);
								patchState(store, { getArticlesStatus: 'error', articles: [] });
								return throwError(() => error);
							}),
						),
					),
				),
			),
			toggleFavorite: rxMethod<Article>(
				pipe(
					tap(() => patchState(store, { toggleFavoriteStatus: 'loading' })),
					exhaustMap(({ favorited, slug }) =>
						defer(() =>
							favorited
								? favoritesApiClient.deleteArticleFavorite({ slug })
								: favoritesApiClient.createArticleFavorite({ slug }),
						).pipe(
							tap((response) => {
								const articles = store
									.articles()
									.map((article) => (article.slug === response.article.slug ? response.article : article));
								patchState(store, { toggleFavoriteStatus: 'success', articles });
							}),
						),
					),
				),
			),
		};
	}),
);
