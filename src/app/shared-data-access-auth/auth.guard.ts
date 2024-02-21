import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanMatchFn, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthStore } from './auth.store';

export function authGuard(type: 'protected' | 'unprotected'): CanMatchFn {
	return () => {
		const [router, authStore] = [inject(Router), inject(AuthStore)];

		return toObservable(authStore.isAuthenticated).pipe(
			filter(() => !authStore.isAuthenticating()),
			map((isAuthenticated) => {
				if ((type === 'unprotected' && !isAuthenticated) || (type === 'protected' && isAuthenticated)) return true;
				return router.parseUrl('/');
			}),
		);
	};
}
