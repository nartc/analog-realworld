import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, defer, exhaustMap, pipe, switchMap, tap, throwError } from 'rxjs';
import { Profile, ProfileApiClient } from '../shared-data-access-api';
import { AuthStore } from '../shared-data-access-auth/auth.store';
import { ApiStatus } from '../shared-data-access-models/api-status';

export const ProfileStore = signalStore(
	withState({ status: 'idle' as ApiStatus, profile: null as Profile | null }),
	withComputed((store) => {
		const [authStore] = [inject(AuthStore)];
		return {
			isLoading: computed(() => store.status() === 'loading'),
			isOwner: computed(() => {
				const [currentUser, profile] = [authStore.user(), store.profile()];
				return !!currentUser && !!profile && profile.username === currentUser.username;
			}),
		};
	}),
	withMethods((store) => {
		const [profileApiClient] = [inject(ProfileApiClient)];
		return {
			getProfile: rxMethod<string>(
				pipe(
					tap(() => patchState(store, { status: 'loading' })),
					switchMap((username) =>
						profileApiClient.getProfileByUsername({ username }).pipe(
							tap((response) => patchState(store, { status: 'success', profile: response.profile })),
							catchError(({ error }: HttpErrorResponse) => {
								patchState(store, { status: 'error' });
								return throwError(() => error);
							}),
						),
					),
				),
			),
			toggleFollow: rxMethod<Profile>(
				exhaustMap((profile) =>
					defer(() =>
						profile.following
							? profileApiClient.unfollowUserByUsername({ username: profile.username })
							: profileApiClient.followUserByUsername({ username: profile.username }),
					).pipe(
						tap((response) => {
							patchState(store, { profile: response.profile });
						}),
					),
				),
			),
		};
	}),
);
