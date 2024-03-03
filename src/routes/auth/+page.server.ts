import { JWT_SECRET } from '$env/static/private';
import { LocalStorage } from '$lib/server/localstorage';
import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const localstorage = new LocalStorage(cookies);
	const token = localstorage.get('token');
	if (!token) return {};
	jwt.verify(token, JWT_SECRET, (err) => {
		if (err) return {};
		throw redirect(303, '/app');
	});
}) satisfies PageServerLoad;
