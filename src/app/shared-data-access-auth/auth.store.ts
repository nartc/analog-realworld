import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { User, UserAndAuthenticationApiClient } from '../shared-data-access-api';

export type AuthState = {
	status: 'idle' | 'authenticated' | 'unauthenticated';
	user: User | null;
};

const initialState = () => ({ user: null, status: 'idle' }) as AuthState;

export const AuthStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState()),
	withComputed((store) => ({
		isAuthenticating: computed(() => store.status() === 'idle'),
		isAuthenticated: computed(() => store.status() === 'authenticated'),
		username: computed(() => store.user()?.username),
	})),
	withMethods((store) => {
		const [userAndAuthenticationApiClient, router] = [inject(UserAndAuthenticationApiClient), inject(Router)];

		return {
			authenticate: rxMethod<string[] | void>(
				pipe(
					switchMap((segments) => {
						const token = localStorage.getItem('analog-conduit-signals-token');
						if (!token) {
							return of({ user: null, segments });
						}
						return userAndAuthenticationApiClient.getCurrentUser().pipe(
							map(({ user }) => ({ user, segments })),
							catchError(({ error }: HttpErrorResponse) => {
								console.error(`error refreshing user -->`, error);
								return of({ user: null, segments });
							}),
						);
					}),
					tap(({ user, segments }) => {
						patchState(store, { user, status: user ? 'authenticated' : 'unauthenticated' });
						localStorage.setItem('analog-conduit-signals-user', JSON.stringify(user));
						if (segments) {
							void router.navigate(segments);
						}
					}),
				),
			),
		};
	}),
);
