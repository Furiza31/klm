<script lang="ts">
	import Loader from '../loader/Loader.svelte';

	export let loading: boolean = false;
	export let disabled: boolean = false;
</script>

<button {disabled}>
	{#if loading}
		<Loader />
	{:else}
		<slot />
	{/if}
</button>

<style lang="scss">
	@import '../../routes/variables.scss';

	button {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		padding: 10px 20px;
		border: none;
		border-radius: 5px;
		background-color: $primary;
		color: $white;
		font-weight: bold;
		cursor: pointer;
		width: 50%;

		&:hover {
			width: 55%;
		}
	}

	button[disabled] {
		background-color: $secondary;
		cursor: not-allowed;

		&:hover {
			width: 50%;
		}
	}
</style>
