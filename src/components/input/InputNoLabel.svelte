<script lang="ts">
    import { reveal } from 'svelte-reveal';

    export let icon: string;
    export let placeholder: string;
	export let id: string;
	export let name: string;
	export let type = 'text';
	export let value = '';
	export let errors: string[] = [];

	$: errors = errors ?? [];
</script>

<div>
    <div>
        <i class="{icon}" />
        <input {type} {id} {name} {value} {placeholder} class:error={errors.length > 0} />
    </div>
    {#each errors as error}
        <span class="error" use:reveal={{ transition: 'fly', duration: 200 }}>{error}</span>
    {/each}
</div>

<style lang="scss">
    @import '../../routes/variables.scss';

    div {
        position: relative;
        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;

        div {
            position: relative;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: flex-start;
            width: 100%;

            i {
                color: $secondary;
                font-size: 1.5rem;
                border: 1px solid $primary;
                border-radius: 7px;
                border-top-right-radius: 0px;
                border-bottom-right-radius: 0px;
                border-right: 0px;
            }

            input {
                width: 100%;
                border: 1px solid $primary;
                border-radius: 7px;
                font-size: 1.2rem;
                transition: all 0.3s ease-in-out;
                border-top-left-radius: 0px;
                border-bottom-left-radius: 0px;
                border-left: 0px;

                &:focus {
                    outline: none;
                    border-color: var(--color-secondary);
                }

                &.error {
                    border-color: var(--color-error);
                }
            }
        }
    }
</style>