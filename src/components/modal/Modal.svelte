<script lang="ts">
	export let showModal: boolean;
	export let buttonTitle: string;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<div>
			<slot name="header" />
			<button class="close" on:click={() => dialog.close()}>
				<i class="fas fa-times"></i>
			</button>
		</div>
		<slot />
	</div>
</dialog>

<style lang="scss">
	@import '../../routes/variables.scss';

	dialog {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: none;
		padding: 20px;
		border-radius: 5px;
		background-color: $background-primary;
		min-width: 350px;
		max-width: 500px;

		&::backdrop {
			background: rgba(0, 0, 0, 0.3);
		}

		& > div {
			div {
				position: relative;
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				justify-content: space-between;
				gap: 5px;
				width: 100%;

				&:last-child {
					margin-top: 20px;
					justify-content: center;
				}

				&:first-child {
					margin-bottom: 20px;
				}

				button {
					position: relative;
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					justify-content: center;
					gap: 5px;
					padding: 10px 15px;
					outline: none;
					border: none;
					border-radius: 5px;
					color: $white;
					cursor: pointer;
					min-width: 100px;

					&.close {
						min-width: fit-content;
						max-width: 40px;
						background-color: transparent;

						&:hover i {
							transform: rotate(90deg);
						}

						i {
							font-size: 1.5rem;
						}
					}
				}
			}
		}

		&[open] {
			animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		}

		&[open]::backdrop {
			animation: fade 0.2s ease-out;
		}
	}
	@keyframes zoom {
		from {
			transform: translate(-50%, -50%) scale(0.95);
		}
		to {
			transform: translate(-50%, -50%) scale(1);
		}
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
