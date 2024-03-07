import type { Cookies } from '@sveltejs/kit';

class LocalStorage {
	private cookies: Cookies;

	constructor(cookies: Cookies) {
		this.cookies = cookies;
	}

	set(key: string, value: string) {
		if (value === null || value === undefined || value === '') this.remove(key);
		this.cookies.set(key, value, {
			path: '/',
			// maxAge: 60 * 60 * 24 * 7 * 365, // 1 year
			maxAge: 60 * 60 * 24, // 1 day
			httpOnly: true,
			sameSite: 'strict',
			secure: false
		});
	}

	get(key: string) {
		return this.cookies.get(key);
	}

	has(key: string) {
		const cookiesMap = new Map(this.cookies.getAll().map((cookie) => [cookie.name, cookie.value]));
		return cookiesMap.has(key);
	}

	remove(key: string) {
		this.cookies.set(key, '', {
			path: '/',
			maxAge: 0,
			httpOnly: true,
			sameSite: 'strict',
			secure: false
		});
	}

	clear() {
		const cookiesMap = new Map(this.cookies.getAll().map((cookie) => [cookie.name, cookie.value]));
		cookiesMap.forEach((value, key) => {
			this.cookies.set(key, '', {
				path: '/',
				maxAge: 0,
				httpOnly: true,
				sameSite: 'strict',
				secure: false
			});
		});
	}
}

export { LocalStorage };
