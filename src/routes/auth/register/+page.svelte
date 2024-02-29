<script lang="ts">
	import { enhance } from '$app/forms';

	let loading = false;

	export let form: {
		data?: {
			username?: string;
			email?: string;
		};
		errors?: {
			username?: string[];
			email?: string[];
			password?: string[];
			confirmPassword?: string[];
		};
	};

	$: console.log(loading);
</script>

<div class="register">
	<h1>Register</h1>

	<form action="?/register" method="post" use:enhance>
		<div>
			<label for="username">Username</label>
			<input
				type="text"
				id="username"
				name="username"
				value={form?.data?.username ?? ''}
				class={form?.errors?.username ? 'error' : ''}
			/>
			{#if form?.errors?.username}
				<span>{form.errors.username[0]}</span>
			{/if}
		</div>
		<div>
			<label for="email">Email</label>
			<input
				type="email"
				id="email"
				name="email"
				value={form?.data?.email ?? ''}
				class={form?.errors?.email ? 'error' : ''}
			/>
			{#if form?.errors?.email}
				<span>{form.errors.email[0]}</span>
			{/if}
		</div>
		<div>
			<label for="password">Password</label>
			<input
				type="password"
				id="password"
				name="password"
				class={form?.errors?.password ? 'error' : ''}
			/>
			{#if form?.errors?.password}
				<span>{form.errors.password[0]}</span>
			{/if}
		</div>
		<div>
			<label for="confirmPassword">Confirm Password</label>
			<input
				type="password"
				id="confirmPassword"
				name="confirmPassword"
				class={form?.errors?.confirmPassword ? 'error' : ''}
			/>
			{#if form?.errors?.confirmPassword}
				<span>{form.errors.confirmPassword[0]}</span>
			{/if}
		</div>
		<button type="submit">Register</button>
	</form>
	<p>
		Already have an account? You can login yourself <a href="/auth/login">here!</a>
	</p>
</div>

<style lang="scss">
	@import '../../variables.scss';

	div.register {
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

			button {
				position: relative;
				display: block;
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
		}
	}
</style>
