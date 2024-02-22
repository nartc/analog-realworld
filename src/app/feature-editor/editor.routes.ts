import { Routes } from '@angular/router';

export default <Routes>[
	{
		path: '',
		loadComponent: () => import('./new-article/new-article.analog'),
		title: 'New Article',
	},
	{
		path: ':slug',
		loadComponent: () => import('./edit-article/edit-article.analog'),
		title: 'Edit Article',
	},
];
