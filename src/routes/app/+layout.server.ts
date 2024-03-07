import { JWT_SECRET } from '$env/static/private';
import { LocalStorage } from '$lib/server/localstorage';
import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const localstorage = new LocalStorage(cookies);
	const token = localstorage.get('token');

	if (!token) throw redirect(303, '/auth/login');

	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
			localstorage.remove('token');
			throw redirect(303, '/auth/login');
		}

		return {
			user: decoded
		};
	});
}) satisfies LayoutServerLoad;
