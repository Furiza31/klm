<div class="login">
	<h1>Login</h1>

	<form action="?/login" method="post">
		<div>
			<label for="email">Email</label>
			<input type="email" id="email" name="email" required />
		</div>
		<div>
			<label for="password">Password</label>
			<input type="password" id="password" name="password" required />
		</div>
		<button type="submit">Login</button>
	</form>
	<p>
		Don't have an account? You can register yourself <a href="/auth/register">here!</a>
	</p>
</div>

<style lang="scss">
	@import '../../variables.scss';

	div.login {
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
