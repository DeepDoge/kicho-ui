<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import KBackgroundEffect from "./effects/KBackgroundEffect.svelte";
    import KBorderEffect from "./effects/KBorderEffect.svelte";
    import KGlowEffect from "./effects/KGlowEffect.svelte";

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
            active = false
        }
    }}
    on:close={() => onActiveChange()}
>
    <KBorderEffect>
        <KBackgroundEffect blur />
    </KBorderEffect>
    <slot />
</dialog>

<style>
    dialog {
        position: fixed;
        font: inherit;
        border: none;
        background-color: transparent;
        overflow: visible;
        --border-radius: var(--k-border-radius);
        --background: var(--k-color-mode);
        --background-opacity: .99;
        --border-width: 0;
        --border-color: transparent;
        --glow-color: var(--k-color-gradient);
        color: var(--k-color-mode-contrast);
    }

    dialog::backdrop {
        position: fixed;
        inset: 0;
    }
</style>
