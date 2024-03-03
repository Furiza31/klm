<script lang="ts">
	export let size: number = 22;
	export let border: number = 3;
</script>

<span
	class="loader"
	style={`
    width: ${size}px;
    height: ${size}px;
    border-width: ${border}px;
  `}
></span>

<style lang="scss">
	@import '../../routes/variables.scss';

	.loader {
		border: 3px solid $white;
		border-bottom-color: $primary;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
