import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { marked } from 'marked';
import { catchError, defer, EMPTY, exhaustMap, forkJoin, pipe, switchMap, tap } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
	Article,
	ArticlesApiClient,
	Comment,
	CommentsApiClient,
	FavoritesApiClient,
	Profile,
	ProfileApiClient,
} from '../shared-data-access-api';
import { AuthStore } from '../shared-data-access-auth/auth.store';
import { ApiStatus } from '../shared-data-access-models/api-status';

export type ArticleStoreState = {
	status: ApiStatus;
	article: Article | null;
	comments: Comment[];
};

const initialState = () =>
	<ArticleStoreState>{
		status: 'idle',
		article: null,
		comments: [],
	};

export const ArticleStore = signalStore(
	withState(initialState()),
	withComputed((store) => {
		const [domSanitizer, authStore] = [inject(DomSanitizer), inject(AuthStore)];
		const isOwner = computed(() => {
			const [article, currentUser] = [store.article(), authStore.user()];
			return !!article && !!currentUser && article.author.username === currentUser.username;
		});

		return {
			isLoading: computed(() => store.status() === 'loading'),
			sanitizedArticle: computed(() => {
				const article = store.article();
				if (!article) return article;
				return { ...article, body: domSanitizer.sanitize(SecurityContext.HTML, marked(article.body)) as string };
			}),
			isOwner,
			currentUserImage: computed(() => authStore.user()?.image || ''),
			commentsWithOwner: computed(() => {
				const [comments, isArticleOwner, currentUser] = [store.comments(), isOwner(), authStore.user()];
				return comments.map((comment) => ({
					...comment,
					isOwner:
						comment.author.username === currentUser?.username ||
						// if the current logged in user is the author, they should have the ability to delete comments
						// in other words, they are owners of all comments
						isArticleOwner,
				}));
			}),
		};
	}),
	withMethods((store) => {
		const [router, articlesApiClient, commentsApiClient, favoritesApiClient, profileApiClient] = [
			inject(Router),
			inject(ArticlesApiClient),
			inject(CommentsApiClient),
			inject(FavoritesApiClient),
			inject(ProfileApiClient),
		];

		return {
			getArticle: rxMethod<string>(
				pipe(
					filter((slug) => !!slug),
					tap(() => patchState(store, { status: 'loading' })),
					switchMap((slug) =>
						forkJoin([articlesApiClient.getArticle({ slug }), commentsApiClient.getArticleComments({ slug })]).pipe(
							tap(([articleResponse, commentsResponse]) => {
								patchState(store, {
									status: 'success',
									article: articleResponse.article,
									comments: commentsResponse.comments,
								});
							}),
							catchError(({ error }: HttpErrorResponse) => {
								console.error(`Error getting information for ${slug}`, error);
								patchState(store, { status: 'error', article: null, comments: [] });
								return EMPTY;
							}),
						),
					),
				),
			),
			toggleFavorite: rxMethod<Article>(
				exhaustMap((article) =>
					defer(() =>
						article.favorited
							? favoritesApiClient.deleteArticleFavorite({ slug: article.slug })
							: favoritesApiClient.createArticleFavorite({ slug: article.slug }),
					).pipe(
						tap((response) => {
							patchState(store, { article: response.article });
						}),
					),
				),
			),
			deleteArticle: rxMethod<string>(
				exhaustMap((slug) =>
					articlesApiClient.deleteArticle({ slug }).pipe(
						tap(() => {
							void router.navigate(['/']);
						}),
					),
				),
			),
			toggleFollowAuthor: rxMethod<Profile>(
				exhaustMap((profile) =>
					defer(() =>
						profile.following
							? profileApiClient.unfollowUserByUsername({ username: profile.username })
							: profileApiClient.followUserByUsername({ username: profile.username }),
					).pipe(
						tap((response) => {
							patchState(store, { article: { ...store.article()!, author: response.profile } });
						}),
					),
				),
			),
			createComment: rxMethod<string>(
				exhaustMap((body) => {
					const article = store.article();
					if (!article) return EMPTY;
					return commentsApiClient
						.createArticleComment({
							slug: article.slug,
							body: { comment: { body } },
						})
						.pipe(
							tap((response) => {
								patchState(store, { comments: [...store.comments(), response.comment] });
							}),
						);
				}),
			),
			deleteComment: rxMethod<number>(
				exhaustMap((id) => {
					const article = store.article();
					if (!article) return EMPTY;
					return commentsApiClient.deleteArticleComment({ slug: article.slug, id }).pipe(
						tap(() => {
							patchState(store, {
								comments: store.comments().filter((comment) => comment.id !== id),
							});
						}),
					);
				}),
			),
		};
	}),
);
