<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import KTest from "./effects/KTest.svelte";

    export let active = false;
    export let preveventClose = false;

    const dispatch = createEventDispatcher();

    interface HTMLDialogElement extends HTMLElement {
        open: boolean;
        showModal(): void;
        close(): void;
    }

    let _dialogElement: HTMLElement;
    $: dialogElement = _dialogElement as HTMLDialogElement;

    $: dialogElement && onActiveChange() && active;
    function onActiveChange() {
        if (active && !dialogElement.open) dialogElement.showModal();
        if (!active && dialogElement.open) dialogElement.close();
        return true;
    }
</script>

<dialog
    bind:this={_dialogElement}
    on:keydown={(e) => {
        if (e.key.toLowerCase() === "escape") {
            dispatch("closeattempt");
            if (preveventClose) return e.preventDefault();
            active = false;
        }
    }}
    on:close={() => onActiveChange()}
>
    {#if active}
        <KTest blur radius="rounded">
            <div class="dialog-content">
                <slot />
            </div>
        </KTest>
    {/if}
</dialog>

<style>
    dialog {
        position: fixed;
        font: inherit;
        border: none;
        background-color: transparent;
        box-shadow: var(--k-box-shadow);
        overflow: hidden;

        max-height: 95vh;

        display: flex;
    }

    dialog:not([open]) {
        display: none;
    }

    .dialog-content {
        overflow: auto;
        padding: calc(var(--k-padding) * 2);
    }

    dialog::backdrop {
        position: fixed;
        inset: 0;
    }
</style>
