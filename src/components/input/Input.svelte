<script lang="ts">
	import { reveal } from 'svelte-reveal';
	export let label: string;
	export let id: string;
	export let name: string;
	export let type = 'text';
	export let value = '';
	export let errors: string[] = [];

	$: errors = errors ?? [];
</script>

<div>
	<label for={id}>{label}</label>
	<input {type} {id} {name} {value} class:error={errors.length > 0} />
	{#each errors as error}
		<span class="error" use:reveal={{ transition: 'fly', duration: 200 }}>{error}</span>
	{/each}
</div>

<style lang="scss">
	@import '../../routes/variables.scss';

	div {
		position: relative;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		gap: 5px;

		label {
			position: relative;
			display: block;
			font-weight: bold;
		}

		input {
			position: relative;
			display: block;
			width: 100%;
			padding: 5px;
			border: 1px solid $secondary;
			border-radius: 5px;

			&:focus {
				border-color: $primary;
			}
		}

		input.error {
			border-color: $danger;
		}

		span {
			position: relative;
			display: block;
			color: $danger;
			font-size: 0.8em;
		}
	}
</style>
