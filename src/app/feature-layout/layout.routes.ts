import { Routes } from '@angular/router';
import { authGuard } from '../shared-data-access-auth/auth.guard';

export default <Routes>[
	{
		path: '',
		loadComponent: () => import('../feature-home/home.analog'),
		title: 'Home',
	},
	{
		path: 'settings',
		canMatch: [authGuard('protected')],
		loadComponent: () => import('../feature-settings/settings.analog'),
		title: 'Settings',
	},
	{
		path: 'profile/:username',
		canMatch: [authGuard('protected')],
		loadChildren: () => import('../feature-profile/profile.routes'),
	},
	{
		path: 'login',
		canMatch: [authGuard('unprotected')],
		loadComponent: () => import('../feature-login/login.analog'),
		title: 'Sign in',
	},
	{
		path: 'register',
		canMatch: [authGuard('unprotected')],
		loadComponent: () => import('../feature-register/register.analog'),
		title: 'Sign up',
	},
	{
		path: 'editor',
		canMatch: [authGuard('protected')],
		loadChildren: () => import('../feature-editor/editor.routes'),
	},
	{
		path: 'article/:slug',
		canMatch: [authGuard('protected')],
		loadComponent: () => import('../feature-article/article.analog'),
	},
];
