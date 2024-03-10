<script lang="ts">
	import Button from '../../button/Button.svelte';
	import Input from '../../input/Input.svelte';
</script>

<form action="?/new" method="post">
	<div>
		<Input label="Title" id="title" name="title" />
	</div>
	<div>
		<Button>Create</Button>
	</div>
</form>

<style lang="scss"
	form {
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;
		justify-content: center;
		width: 100%;
		
		div {
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 1rem;
		}
	}
</style>
