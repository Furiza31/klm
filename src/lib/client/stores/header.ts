import { writable } from 'svelte/store';

// Create a writable store with initial value as empty string
export const headerTitle = writable('Home');
