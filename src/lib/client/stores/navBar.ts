import { writable } from 'svelte/store';

// Create a writable store with initial value as false (navBar is not open)
export const isNavBarOpen = writable(false);

export const activeLink = writable('/app');
