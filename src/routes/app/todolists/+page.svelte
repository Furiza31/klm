<script lang="ts">
	import { headerTitle } from '$lib/client/stores/header';
	import { activeLink } from '$lib/client/stores/navBar';
	import TodoListForm from '../../../components/froms/TodoList/TodoListForm.svelte';
	import InputNoLabel from '../../../components/input/InputNoLabel.svelte';
	import Modal from '../../../components/modal/Modal.svelte';
	$headerTitle = 'Todo Lists';
	$activeLink = '/app/todolists';

	let showModal = false;
</script>

<svelte:head>
	<title>KLM | Todolists</title>
</svelte:head>

<section>
	<form action="">
		<InputNoLabel icon="fas fa-search" placeholder="Search" id="search" name="search" />
	</form>

	<div class="add">
		<button on:click={() => (showModal = true)}><i class="fas fa-plus"></i></button>
	</div>

	<Modal bind:showModal buttonTitle="Create">
		<h1 slot="header" class="modalTitle">New Todo List</h1>
		<TodoListForm />
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

		form {
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: flex-start;
			margin-bottom: 1rem;
		}

		div.add {
			position: absolute;
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
