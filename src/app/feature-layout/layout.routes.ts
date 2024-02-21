import { Routes } from '@angular/router';

export default <Routes>[
	{
		path: '',
		loadComponent: () => import('../feature-home/home.analog'),
	},
];
