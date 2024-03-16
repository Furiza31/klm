<script lang="ts">
	import { headerTitle } from '$lib/client/stores/header';
	import { activeLink } from '$lib/client/stores/navBar';
	import TodoListForm from '../../../components/froms/TodoList/TodoListForm.svelte';
	import InputNoLabel from '../../../components/input/InputNoLabel.svelte';
	import Modal from '../../../components/modal/Modal.svelte';
	import TodoList from '../../../components/todolists/TodoList.svelte';
	$headerTitle = 'Todo Lists';
	$activeLink = '/app/todolists';

	let searchValue: string = '';
	let showModalNew = false;
	let showModalEdit = false;
	export let form:
		| {
				data?: {
					title?: string;
					id?: number;
				};
				errors?: {
					title?: string[];
				};
				todoList?: {
					id: number;
					title: string;
				};
				action?: 'create' | 'edit' | 'delete';
		  }
		| undefined = undefined;

	export let data: { todoLists: { id: number; title: string }[] } | undefined = { todoLists: [] };

	let todoLists = data?.todoLists ?? [];

	$: todoListsFiltered = todoLists.filter((todoList) => {
		const title = todoList.title.toLowerCase();
		const search = searchValue.toLowerCase();
		return title.includes(search);
	});

	let editTodoList = (event: CustomEvent<{ id: number; title: string }>) => {
		form = { data: event.detail };
		showModalEdit = true;
	};

	let search = (event: CustomEvent<string>) => {
		searchValue = event.detail;
	};
</script>

<svelte:head>
	<title>KLM | Todolists</title>
</svelte:head>

<section>
	<form action="">
		<InputNoLabel
			icon="fas fa-search"
			placeholder="Search"
			id="search"
			name="search"
			on:input={search}
		/>
	</form>

	{#if todoListsFiltered.length > 0}
		{#each todoListsFiltered as todoList}
			<TodoList {todoList} on:edit={editTodoList} />
		{/each}
	{:else}
		<p>No todo lists</p>
	{/if}

	<div class="add">
		<button on:click={() => (showModalNew = true)}><i class="fas fa-plus"></i></button>
	</div>

	<Modal bind:showModal={showModalNew}>
		<h1 slot="header" class="modalTitle">New Todo List</h1>
		<TodoListForm action="create" {form} />
	</Modal>

	<Modal bind:showModal={showModalEdit}>
		<h1 slot="header" class="modalTitle">Edit Todo List</h1>
		<TodoListForm action="edit" {form} />
	</Modal>
</section>

<style lang="scss">
	@import '../../../routes/variables.scss';

	section {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		padding: 1rem;
		gap: 1.5vh;
		margin-bottom: 70px;

		form {
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: flex-start;
			margin-bottom: 1rem;
		}

		div.add {
			position: fixed;
			bottom: 0px;
			right: 0px;
			margin: 1rem;
			button {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: $primary;
				border: none;
				border-radius: 15px;
				padding: 1rem;
				cursor: pointer;
				transition-duration: 0.3s;
				width: 55px;
				height: 55px;

				&:hover {
					transform: scale(1.1);
				}

				i {
					color: $white;
					font-size: 1.5rem;
				}
			}
		}
	}

	h1.modalTitle {
		color: $primary;
		font-size: 1.5rem;
		font-weight: bold;
	}
</style>
