import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

function processErrorsRecord(errors: Record<string, string[]>): {
	errors: string[];
	hasError: boolean;
} {
	const errorEntries = Object.entries(errors);
	return {
		errors: errorEntries.reduce((authErrors, curr) => {
			authErrors.push(...curr[1].map((error) => `${curr[0]} ${error}`));
			return authErrors;
		}, [] as string[]),
		hasError: errorEntries.length > 0,
	};
}

export type FormErrors = ReturnType<typeof processErrorsRecord>;

export const FormErrorsStore = signalStore(
	withState<{ errors: Record<string, string[]> }>({ errors: {} }),
	withComputed((store) => ({
		formErrors: computed(() => processErrorsRecord(store.errors())),
	})),
	withMethods((store) => ({
		setErrors: (errors: Record<string, string[]>) => patchState(store, { errors }),
	})),
);
