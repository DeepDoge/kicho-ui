<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import KBoxEffect from "./effects/KBoxEffect.svelte";

    export let active = false;
    export let preveventClose = false;

    const dispatch = createEventDispatcher();
    export let size = "30em";
    export let align: 'center' | 'end' | 'start' | 'stretch' = 'center'
    export let justify: typeof align = 'center'

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
    style:--ideal-size={size}
    style:justify-content={justify}
    style:align-content={align}
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
    <div class="modal">
        <KBoxEffect background border blur glow radius="normal">
            <slot />
        </KBoxEffect>
    </div>
    {/if}
</dialog>

<style>
    dialog {
        all: unset;
        position: fixed;
        inset: 0;

        display: grid;
        place-items: stretch;
        grid-template-columns: min(var(--ideal-size), 100%);

        padding: 6px;
    }

    dialog:not([open]) {
        display: none;
    }

    .modal {
        padding: calc(var(--k-padding) * 4);
    }

    dialog::before {
        content: "";
        position: fixed;
        inset: 0;
        background-color: var(--k-color-mode);
        background-image: var(--k-color-gradient);
        background-blend-mode: multiply;
        opacity: 0.25;
        backdrop-filter: blur(0.05rem);
    }

    dialog::backdrop {
        display: none;
    }
</style>
