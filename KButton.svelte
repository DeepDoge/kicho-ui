<script lang="ts">
    import KBoxEffects from "./effects/KBoxEffects.svelte";
    import KBoxOptions from "./effects/KBoxOptions.svelte";
    import type { KBoxTemplate } from "./effects/KBoxOptions.svelte";
    import KRippleEffect from "./effects/KRippleEffect.svelte";

    export let template: KBoxTemplate = "filled";
</script>

<button on:click>
    <KBoxOptions {template} />
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
        font-size: inherit;
        padding: 0.35em;
        cursor: pointer;
        text-transform: capitalize;
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
</style>
