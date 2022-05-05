<script lang="ts">
    import KBackgroundEffect from "./effects/KBackgroundEffect.svelte";
    import KBorderEffect from "./effects/KBorderEffect.svelte";
    import KGlowEffect from "./effects/KGlowEffect.svelte";
    import KRippleEffect from "./effects/KRippleEffect.svelte";

    export let disabled = false;
</script>
<button on:click {disabled}>
    <KBorderEffect>
        <KBackgroundEffect />
        <KRippleEffect />
    </KBorderEffect>
    <div>
        <slot />
    </div>
</button>

<style>
    button {
        appearance: unset;
        background: unset;
        border: none;
        padding: 0.2em 0.5em;
        cursor: pointer;
        text-transform: capitalize;

        font: inherit;
        color: var(--k-color-gradient-contrast);

        --border-width: 0;
        --border-color: transparent;
        --background: var(--k-color-gradient);
        --glow-color: var(--background);
        --glow-opacity: 0;
    }

    button:focus,
    button:hover {
        filter: brightness(1.15);
        --glow-opacity: 1;
    }

    button:disabled {
        filter: saturate(0) !important;
        cursor: not-allowed !important;
    }
</style>
