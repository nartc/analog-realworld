import { Routes } from '@angular/router';
import { authGuard } from '../shared-data-access-auth/auth.guard';

export default <Routes>[
	{
		path: '',
		loadComponent: () => import('../feature-home/home.analog'),
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
];
