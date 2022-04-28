<script lang="ts">
    import KBoxEffects from "./effects/KBoxEffects.svelte";
    import KBoxRoot from "./effects/KBoxRoot.svelte";
    import type { KBoxTemplate } from "./effects/KBoxRoot.svelte";
    import KRippleEffect from "./effects/KRippleEffect.svelte";

    export let template: KBoxTemplate = "filled";
</script>

<KBoxRoot {template}>
    <button on:click>
        <KBoxEffects />
        <KRippleEffect />
        <div>
            <slot />
        </div>
    </button>
</KBoxRoot>

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
</style>
