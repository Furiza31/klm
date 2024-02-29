import { SALT_ROUNDS } from '$env/static/private';
import { prisma } from '$lib/server/prisma';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const registerSchema = z
	.object({
		username: z
			.string({ required_error: 'Username is required' })
			.min(3, { message: 'Username must be at least 3 characters long' })
			.trim(),
		email: z
			.string({ required_error: 'Email is required' })
			.min(1, { message: 'Email is required' })
			.email({ message: 'Email must be valid' })
			.trim(),
		password: z
			.string({ required_error: 'Password is required' })
			.min(3, { message: 'Password must be at least 3 characters long' })
			.trim(),
		confirmPassword: z
			.string({ required_error: 'Confirm password is required' })
			.min(3, { message: 'Confirm password must be at least 3 characters long' })
			.trim()
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match',
				path: ['confirmPassword']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match',
				path: ['password']
			});
		}
	});

export const actions = {
	register: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		const result = registerSchema.safeParse(formData);

		if (!result.success) {
			const { fieldErrors: errors } = result.error.flatten();

			return fail(400, {
				data: formData,
				errors
			});
		}

		const { username, email, password } = result.data;

		const hashedPassword = bcrypt.hashSync(password, Number(SALT_ROUNDS));

		const user = await prisma.user.findUnique({
			where: {
				email
			}
		});

		if (user) {
			return fail(400, {
				data: formData,
				errors: {
					email: ['Email already exists']
				}
			});
		}

		await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword
			}
		});

		throw redirect(303, '/auth/login');
	}
} satisfies Actions;
