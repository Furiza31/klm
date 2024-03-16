<script lang="ts">
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	import Loader from '../loader/Loader.svelte';
	export let todoList: { id: number; title: string };

	let loading = false;
	let dispatch = createEventDispatcher();

	function editTodoList() {
		dispatch('edit', todoList);
	}
</script>

<a class="todolist" href="/app/todolists/{todoList.id}">
	<h1>{todoList.title}</h1>
	<div class="actions">
		<button
			on:click|stopPropagation|preventDefault={() => {
				editTodoList();
			}}
		>
			<i class="fas fa-edit"></i>
		</button>
		<form
			action="?/delete"
			method="post"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					loading = false;
					update();
				};
			}}
		>
			<input type="hidden" name="id" value={todoList.id} />
			<button on:click|stopPropagation>
				{#if loading}
					<Loader />
				{:else}
					<i class="fas fa-trash delete" />
				{/if}
			</button>
		</form>
	</div>
</a>

<style lang="scss">
	@import '../../routes/variables.scss';

	a.todolist {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 15px;
		border: 1px solid $secondary;
		border-radius: 5px;
		width: 100%;
		cursor: pointer;
		transition: all 0.3s ease;

		&:hover {
			background-color: $primary;

			h1 {
				color: $white;
			}

			i {
				color: $white;
			}
		}
		div {
			position: relative;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: flex-start;
			gap: 1vw;

			button {
				background-color: transparent;
				border: none;
				cursor: pointer;
				transition: all 0.3s ease;
				padding: 5px 5px;
				border-radius: 50%;
				transform: scale(1.2);
				width: 35px;
				height: 35px;

				i {
					color: $secondary;
					font-size: 1.25rem;

					&.delete {
						color: $danger;
					}
				}

				&:hover {
					background-color: rgba($color: $white, $alpha: 0.5);
					border-radius: 50%;
				}
			}
		}
	}
</style>
