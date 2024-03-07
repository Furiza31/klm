<script>
	import Header from '../../components/header/Header.svelte';
	import Navigation from '../../components/navigation/Navigation.svelte';
</script>

<Header />

<section>
	<Navigation />
	<slot />
</section>

<style lang="scss">
	@import '../variables.scss';

	section {
		display: flex;
		flex-flow: row nowrap;
		background-color: $background-primary;
	}
</style>
