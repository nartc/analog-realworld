// <script lang="ts">
// import { inject } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { AuthStore } from './shared-data-access-auth/auth.store';
//
// defineMetadata({ imports: [RouterOutlet] });
//
// const authStore = inject(AuthStore);
// </script>
//
// <template>
// <router-outlet />
// </template>
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from './shared-data-access-auth/auth.store';

@Component({
	selector: 'App',
	standalone: true,
	imports: [RouterOutlet],
	template: `
		<router-outlet />
	`,
})
export default class App {
	authStore = inject(AuthStore);
}
