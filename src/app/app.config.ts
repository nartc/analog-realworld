import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { ApiConfiguration } from './shared-data-access-api';

export const appConfig: ApplicationConfig = {
	providers: [
		{ provide: ApiConfiguration, useValue: { rootUrl: 'https://api.realworld.io/api' } },
		provideRouter(
			[
				{
					path: '',
					loadComponent: () => import('./feature-layout/layout.analog'),
					loadChildren: () => import('./feature-layout/layout.routes'),
				},
			],
			withComponentInputBinding(),
		),
		provideHttpClient(withFetch(), withInterceptors([])),
	],
};
