<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '../../button/Button.svelte';
	import Input from '../../input/Input.svelte';

	export let loading = false;
	export let action: 'create' | 'edit' = 'create';
	export let form:
		| {
				data?: {
					title?: string;
					id?: number;
				};
				errors?: {
					title?: string[];
				};
		  }
		| undefined = undefined;
</script>

<form
	action="?/{action}"
	method="post"
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	}}
>
	<div>
		<Input
			label="Title"
			id="title"
			name="title"
			value={form?.data?.title ?? ''}
			errors={form?.errors?.title}
		/>
	</div>
	<input type="hidden" name="id" value={form?.data?.id} />
	<div>
		<Button {loading} disabled={loading}>
			{action === 'create' ? 'Create' : 'Edit'}
		</Button>
	</div>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;
		justify-content: center;
		width: 100%;

		div {
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 1rem;

			&:last-child {
				justify-content: center;
			}
		}
	}
</style>
