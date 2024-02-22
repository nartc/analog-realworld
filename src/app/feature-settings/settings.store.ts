import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, exhaustMap, pipe, tap, throwError } from 'rxjs';
import { UpdateUser, UserAndAuthenticationApiClient } from '../shared-data-access-api';
import { AuthStore } from '../shared-data-access-auth/auth.store';
import { ApiStatus } from '../shared-data-access-models/api-status';

export const SettingsStore = signalStore(
	withState({ status: 'idle' as ApiStatus }),
	withComputed((store) => {
		const [authStore] = [inject(AuthStore)];
		return {
			isLoading: computed(() => store.status() === 'loading'),
			user: computed(authStore.user),
		};
	}),
	withMethods((store) => {
		const [router, authStore, userAndAuthenticationApiClient] = [
			inject(Router),
			inject(AuthStore),
			inject(UserAndAuthenticationApiClient),
		];

		return {
			updateUser: rxMethod<UpdateUser>(
				pipe(
					tap(() => patchState(store, { status: 'loading' })),
					exhaustMap((updateUser) =>
						userAndAuthenticationApiClient.updateCurrentUser({ body: { user: updateUser } }).pipe(
							tap((response) => {
								patchState(store, { status: 'success' });
								void router.navigate(['/profile', response.user.username]);
							}),
							catchError(({ error }: HttpErrorResponse) => {
								patchState(store, { status: 'error' });
								return throwError(() => error);
							}),
						),
					),
				),
			),
			logout: () => {
				localStorage.removeItem('analog-conduit-signals-token');
				localStorage.removeItem('analog-conduit-signals-user');
				return authStore.authenticate();
			},
		};
	}),
);
