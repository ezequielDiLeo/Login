import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
	{ path: '**', renderMode: RenderMode.Prerender},
	{ path: 'users', renderMode: RenderMode.Client },
	{ path: 'login', renderMode: RenderMode.Prerender },
];
