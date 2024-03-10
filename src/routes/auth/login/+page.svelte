<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '../../../components/button/Button.svelte';
	import Input from '../../../components/input/Input.svelte';

	let loading = false;

	export let form: {
		data?: {
			email?: string;
		};
		errors?: {
			email?: string[];
			password?: string[];
		};
	};
</script>

<svelte:head>
	<title>KLM | Login</title>
</svelte:head>

<div>
	<h1>Login</h1>

	<form
		action="?/login"
		method="post"
		use:enhance={() => {
			loading = true;
			return async ({ update, result }) => {
				loading = false;
				update();
			};
		}}
	>
		<Input
			label="Email"
			id="email"
			name="email"
			type="email"
			value={form?.data?.email ?? ''}
			errors={form?.errors?.email}
		/>
		<Input
			label="Password"
			id="password"
			name="password"
			type="password"
			errors={form?.errors?.password}
		/>
		<Button {loading} disabled={loading}>Login</Button>
	</form>
	<p>
		Already have an account? You can login yourself <a href="/auth/register">here!</a>
	</p>
</div>

<style lang="scss">
	@import '../../variables.scss';

	div {
		position: relative;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: center;
		gap: 20px;
		padding: 20px;
		border-radius: 10px;
		min-width: 250px;
		border: none;
		background-color: $white;
		width: 100%;
		max-width: 400px;
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

		h1 {
			position: relative;
			display: block;
			font-size: 2.5em;
			font-weight: bold;
			color: $primary;
		}

		p {
			position: relative;
			display: block;
			text-align: center;
		}

		form {
			position: relative;
			display: flex;
			flex-flow: column nowrap;
			justify-content: flex-start;
			align-items: center;
			gap: 20px;
			width: 100%;
		}
	}

	@keyframes zoom {
		from {
			transform: scale(0);
		}
		to {
			transform: scale(1);
		}
	}
</style>
