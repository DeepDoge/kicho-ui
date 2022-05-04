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
            if (preveventClose) e.preventDefault();
        }
    }}
    on:close
    on:close={() => (active = false)}
>
    <KGlowEffect border />
    <KBorderEffect>
        <KBackgroundEffect />
    </KBorderEffect>
    <slot />
</dialog>

<style>
    dialog {
        font: inherit;
        border: none;
        background-color: transparent;
        overflow: visible;
        --border-radius: var(--k-border-radius);
        --background: var(--k-color-mode);
        --backkground-opacity: .95;
        --border-width: var(--k-border-width);
        --border-color: unset;
        --glow-color: var(--k-color-gradient);
        color: var(--k-color-mode-inverse);
    }
</style>
