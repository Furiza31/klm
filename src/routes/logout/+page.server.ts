import { LocalStorage } from '$lib/server/localstorage';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const localstorage = new LocalStorage(cookies);
	localstorage.clear();

	throw redirect(302, '/auth/login');
}) satisfies PageServerLoad;
