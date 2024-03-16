import { LocalStorage } from '$lib/server/localstorage';
import { prisma } from '$lib/server/prisma';
import { type User } from '@prisma/client';
import { fail, type Actions } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const localstorage = new LocalStorage(cookies);
	const user = (jwt.decode(localstorage.get('token') || '') as { user: User }).user;

	const todoLists = await prisma.todoList.findMany({
		where: {
			userId: user.id
		}
	});

	return {
		todoLists
	};
}) satisfies PageServerLoad;

const todoListFormSchema = z.object({
	title: z
		.string({ required_error: 'Title is required' })
		.min(1, { message: 'Title is required' })
		.trim()
});

const todoListDeleteSchema = z.object({
	id: z.string()
});

export const actions = {
	create: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());

		const result = todoListFormSchema.safeParse(formData);

		if (!result.success) {
			const { fieldErrors: errors } = result.error.flatten();

			return fail(400, {
				data: formData,
				errors
			});
		}

		const { title } = result.data;

		const localstorage = new LocalStorage(cookies);

		const user = (jwt.decode(localstorage.get('token') || '') as { user: User }).user;

		const todoList = await prisma.todoList.create({
			data: {
				title,
				userId: user.id
			}
		});

		return {
			status: 201,
			todoList,
			action: 'create'
		};
	},
	delete: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		const result = todoListDeleteSchema.safeParse(formData);

		if (!result.success) {
			const { fieldErrors: errors } = result.error.flatten();

			return fail(400, {
				data: formData,
				errors
			});
		}

		const { id } = result.data;

		let todoList = await prisma.todoList.delete({
			where: {
				id: Number(id)
			}
		});

		return {
			status: 204,
			todoList,
			action: 'delete'
		};
	},
	edit: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		const result = todoListFormSchema.safeParse(formData);

		if (!result.success) {
			const { fieldErrors: errors } = result.error.flatten();

			return fail(400, {
				data: formData,
				errors
			});
		}

		const { title } = result.data;

		const todoList = await prisma.todoList.update({
			where: {
				id: Number(formData.id)
			},
			data: {
				title
			}
		});

		return {
			status: 200,
			todoList,
			action: 'edit'
		};
	}
} satisfies Actions;
