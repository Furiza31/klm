<section>
	<slot />
</section>

<style lang="scss">
	@import '../variables.scss';
	section {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
	}

	:global(body) {
		background: radial-gradient($background-primary -100%, $background-secondary);
	}
</style>
