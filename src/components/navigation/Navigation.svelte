<script lang="ts">
	import { page } from '$app/stores';
	import { isNavBarOpen } from '$lib/client/stores/navBar';
	let path: string;

	$: path = $page.url.pathname;

	const match = (regex: string) => {
		return new RegExp(regex).test(path);
	};
</script>

<nav class:open={$isNavBarOpen}>
	<ul>
		<li>
			<a href="/app" class:active={match('^/app$')}><i class="fa-solid fa-house"></i>Home</a>
		</li>
		<li>
			<a
				href="/todolists"
				class:active={match('^/todolist') ||
					match('^/todolists/new') ||
					match('^/todolists/[0-9]+') ||
					match('^/todolists/[0-9]+/edit') ||
					match('^/todolists/[0-9]+/') ||
					match('^/todolists/[0-9]+/tasks') ||
					match('^/todolists/[0-9]+/tasks/new') ||
					match('^/todolists/[0-9]+/tasks/[0-9]+') ||
					match('^/todolists/[0-9]+/tasks/[0-9]+/edit')}
				><i class="fa-solid fa-list"></i>Todo List</a
			>
		</li>
	</ul>
	<ul>
		<li>
			<a href="/settings" class:active={match('^/settings$') || match('^/settings/')}
				><i class="fa-solid fa-cog"></i>Settings</a
			>
		</li>
		<li>
			<a href="/logout" class="logout"><i class="fa-solid fa-sign-out"></i>Logout</a>
		</li>
	</ul>
</nav>

<style lang="scss">
	@import '../../routes/variables.scss';

	nav {
		position: sticky;
		display: none;
		padding: 20px;
		width: 250px;
		height: calc(100vh - $header-height);
		animation-name: slideIn;
		animation-duration: 0.3s;
		background-color: $background-primary;
		border-right: 1px solid $secondary;

		ul {
			position: relative;
			display: flex;
			flex-flow: column nowrap;
			gap: 10px;
			list-style: none;
			padding: 0;
			margin: 0;
			width: 100%;

			li {
				position: relative;
				display: block;
				width: 100%;
				a {
					position: relative;
					display: flex;
					align-items: center;
					justify-content: flex-start;
					gap: 10px;
					width: 100%;
					padding: 10px 20px;
					font-size: 1.2rem;
					background-color: $secondary;
					border-radius: 7px;
					color: $white;

					&:hover {
						background-color: $primary;
						gap: 15px;
					}

					i {
						color: $white;
					}

					&.logout {
						background-color: $danger;
						&:hover {
							background-color: $danger;
						}
					}

					&.active {
						background-color: $primary;
						gap: 15px;
					}
				}
			}
		}

		&.open {
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
			align-items: flex-start;
		}
	}

	@media (max-width: 500px) {
		nav {
			position: fixed;
			left: 0px;
			top: $header-height;
		}
	}

	@keyframes slideIn {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}
</style>
