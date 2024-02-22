import { Routes } from '@angular/router';
import { provideProfileArticlesType } from '../feature-profile-articles/profile-articles.di';

export default <Routes>[
	{
		path: '',
		loadComponent: () => import('./profile.analog'),
		children: [
			{
				path: '',
				providers: [provideProfileArticlesType('my')],
				loadComponent: () => import('../feature-profile-articles/profile-articles.analog'),
			},
			{
				path: 'favorites',
				providers: [provideProfileArticlesType('favorites')],
				loadComponent: () => import('../feature-profile-articles/profile-articles.analog'),
			},
		],
	},
];
