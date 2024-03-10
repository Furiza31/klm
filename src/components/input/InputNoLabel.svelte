<script lang="ts">
	import { reveal } from 'svelte-reveal';

	export let icon: string;
	export let placeholder: string;
	export let id: string;
	export let name: string;
	export let type = 'text';
	export let value = '';
	export let errors: string[] = [];

	$: errors = errors ?? [];
</script>

<div>
	<div class="inputContainer">
		<label for={id}><i class={icon} /></label>
		<input {type} {id} {name} {value} {placeholder} class:error={errors.length > 0} />
	</div>
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
		align-items: flex-start;
		justify-content: flex-start;
		width: 100%;

		div {
			position: relative;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: flex-start;
			width: 100%;
			background-color: $lightgrey;
			padding: 10px 15px;
			gap: 10px;
			border-radius: 10px;
			border: 1px solid $secondary;

			&:has(> input:focus) {
				border: 1px solid $primary;
			}

			i {
				color: $secondary;
				font-size: 1.5rem;
			}

			input {
				width: 100%;
				font-size: 1.2rem;
				background-color: transparent;
				border: none;

				&:focus {
					outline: none;
					border-color: var(--color-secondary);
				}

				&.error {
					border-color: var(--color-error);
				}
			}
		}
	}
</style>
