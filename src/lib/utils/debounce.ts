// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
	let timeout: NodeJS.Timeout;

	return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), waitFor);
	} as F;
}
