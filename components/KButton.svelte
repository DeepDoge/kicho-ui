<script lang="ts">
    import KBoxEffects from "./effects/KBoxEffects.svelte";
    import KOptions from "../KOptions.svelte";
    import type { KBoxTemplate } from "../KOptions.svelte";
    import KRippleEffect from "./effects/KRippleEffect.svelte";

    export let template: KBoxTemplate = "filled";
    export let disabled = false
</script>

<button on:click {disabled}>
    <KOptions {template} />
    <KBoxEffects />
    <KRippleEffect />
    <div>
        <slot />
    </div>
</button>

<style>
    button {
        appearance: unset;
        background: unset;
        border: none;
        padding: 0.35em;
        cursor: pointer;
        text-transform: capitalize;

        font: inherit;
        color: inherit;
    }

    button:focus,
    button:hover {
        filter: brightness(1.15);
    }

    button:hover > :global(.kicho-box-options.text ~ *) {
        --k-box-foreground: rgba(255, 255, 255);
        --k-box-foreground-opacity: 0.1;
    }

    button:disabled {
        filter: saturate(0) !important;
        cursor: not-allowed !important;
    }
</style>
