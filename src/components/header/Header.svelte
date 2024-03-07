<script lang="ts">
	import { headerTitle } from '$lib/client/stores/header';
	import { isNavBarOpen } from '$lib/client/stores/navBar';
	import { onMount } from 'svelte';

	onMount(() => {
		$isNavBarOpen = window.innerWidth > 500;
	});

	const toggle = () => {
		$isNavBarOpen = !$isNavBarOpen;
	};
</script>

<header>
	<div class="hamburger">
		<button class:open={$isNavBarOpen} on:click={toggle}>
			<span></span>
			<span></span>
			<span></span>
		</button>
	</div>
	<div class="title">
		<h1>{$headerTitle}</h1>
	</div>
	<div></div>
</header>

<style lang="scss">
	@import '../../routes/variables.scss';

	header {
		position: sticky;
		top: 0;
		left: 0;
		width: 100%;
		height: $header-height;
		padding: 10px 20px;

		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid $secondary;

		div {
			position: relative;
			display: flex;
			width: calc(100% / 3);
			height: 100%;
		}

		div.title {
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;

			h1 {
				font-size: 1.5rem;
				font-weight: normal;
			}
		}

		div.hamburger {
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: center;

			button {
				position: relative;
				width: 30px;
				height: 30px;
				display: block;
				padding: 0px;
				margin: 0;
				border: none;
				background-color: transparent;
				cursor: pointer;

				span {
					position: absolute;
					left: 0px;
					width: 100%;
					height: 3px;
					background-color: $secondary;
					border-radius: 5px;

					&:nth-child(1) {
						top: 0;
					}

					&:nth-child(2) {
						top: 50%;
						transform: translateY(-50%);
					}

					&:nth-child(3) {
						top: 100%;
					}
				}

				&.open {
					span {
						&:nth-child(1) {
							top: 50%;
							transform: translateY(-50%) rotate(45deg);
						}

						&:nth-child(2) {
							opacity: 0;
							transform: translate(50%, -50%);
						}

						&:nth-child(3) {
							top: 50%;
							transform: translateY(-50%) rotate(-45deg);
						}
					}
				}
			}
		}
	}
</style>
