import { createNoopInjectionToken } from 'ngxtension/create-injection-token';

export type ProfileArticlesType = 'my' | 'favorites';
export const [injectProfileArticlesType, provideProfileArticlesType] =
	createNoopInjectionToken<ProfileArticlesType>('articles by type in profile');
