import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, catchError, exhaustMap, pipe, tap } from 'rxjs';
import { NewUser, UserAndAuthenticationApiClient } from '../shared-data-access-api';
import { AuthStore } from '../shared-data-access-auth/auth.store';
import { FormErrorsStore } from '../shared-data-access-form-errors/form-errors.store';
import { ApiStatus } from '../shared-data-access-models/api-status';

export const RegisterStore = signalStore(
	withState({ status: 'idle' as ApiStatus }),
	withComputed((store) => {
		const formErrorsStore = inject(FormErrorsStore);
		return { isLoading: computed(() => store.status() === 'loading'), errors: computed(formErrorsStore.formErrors) };
	}),
	withMethods((store) => {
		const [userAndAuthenticationApiClient, authStore, formErrorsStore] = [
			inject(UserAndAuthenticationApiClient),
			inject(AuthStore),
			inject(FormErrorsStore),
		];
		return {
			register: rxMethod<NewUser>(
				pipe(
					tap(() => patchState(store, { status: 'loading' })),
					exhaustMap((user) =>
						userAndAuthenticationApiClient.createUser({ body: { user } }).pipe(
							tap(({ user }) => {
								patchState(store, { status: 'success' });
								localStorage.setItem('analog-conduit-signals-token', user.token);
								localStorage.setItem('analog-conduit-signals-user', JSON.stringify(user));
								authStore.authenticate(['/']);
							}),
							catchError(({ error }: HttpErrorResponse) => {
								patchState(store, { status: 'error' });
								console.error('error register user: ', error);
								if (error.errors) {
									formErrorsStore.setErrors(error.errors);
								}
								return EMPTY;
							}),
						),
					),
				),
			),
		};
	}),
);
