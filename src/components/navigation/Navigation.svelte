<script lang="ts">
	import { activeLink, isNavBarOpen } from '$lib/client/stores/navBar';
</script>

<nav class:open={$isNavBarOpen}>
	<ul>
		<li>
			<a href="/app" class:active={$activeLink === '/app'}><i class="fa-solid fa-house"></i>Home</a>
		</li>
		<li>
			<a href="/app/todolists" class:active={$activeLink === '/app/todolists'}
				><i class="fa-solid fa-list"></i>Todo Lists</a
			>
		</li>
	</ul>
	<ul>
		<li>
			<a href="/settings" class:active={$activeLink === '/settings'}
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
		animation: slideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		background-color: $background-primary;
		border-right: 1px solid $secondary;
		z-index: 1001;

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
