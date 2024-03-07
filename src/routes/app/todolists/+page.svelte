<script lang="ts">
	import { headerTitle } from "$lib/client/stores/header";
    import { activeLink } from "$lib/client/stores/navBar";
	import InputNoLabel from "../../../components/input/InputNoLabel.svelte";
	$headerTitle = "Todo Lists";
    $activeLink = "/app/todolists"
</script>

<svelte:head>
	<title>KLM | Todolists</title>
</svelte:head>

<section>
    <form action="">
        <InputNoLabel icon="fas fa-search" placeholder="Search" id="search" name="search" />
    </form>
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
    }
</style>