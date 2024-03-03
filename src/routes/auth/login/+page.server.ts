import { JWT_SECRET } from '$env/static/private';
import { LocalStorage } from '$lib/server/localstorage';
import { prisma } from '$lib/server/prisma';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const registerSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.min(1, { message: 'Email is required' })
		.email({ message: 'Email must be valid' })
		.trim(),
	password: z
		.string({ required_error: 'Password is required' })
		.min(3, { message: 'Password must be at least 3 characters long' })
		.trim()
});

export const actions = {
	login: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());

		const result = registerSchema.safeParse(formData);

		if (!result.success) {
			const { fieldErrors: errors } = result.error.flatten();

			return fail(400, {
				data: formData,
				errors
			});
		}

		const { email, password } = result.data;

		const user = await prisma.user.findUnique({
			where: {
				email
			}
		});

		if (!user) {
			return fail(400, {
				data: formData,
				errors: {
					email: ['Invalid email or password'],
					password: ['Invalid email or password']
				}
			});
		}

		const passwordMatch = await bcrypt.compare(password, user!.password);

		if (!passwordMatch) {
			return fail(400, {
				data: formData,
				errors: {
					email: ['Invalid email or password'],
					password: ['Invalid email or password']
				}
			});
		}

		const token = jwt.sign({ user }, JWT_SECRET, {
			expiresIn: 60 * 60 * 24 * 7 * 365
		});

		const localstorage = new LocalStorage(cookies);

		localstorage.set('token', token);

		return redirect(303, '/app');
	}
} satisfies Actions;
