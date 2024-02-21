import { Routes } from '@angular/router';

export default <Routes>[
	{
		path: '',
		loadComponent: () => import('../feature-home/home.analog'),
	},
	// {
	// 	path: 'login',
	// 	canMatch: [authGuard('unprotected')],
	// 	loadComponent: () => import('../feature-login/login.analog'),
	// 	title: 'Sign in',
	// },
];
