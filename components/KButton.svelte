<script context="module" lang="ts">
</script>

<script lang="ts">
    import KBoxEffect from "./effects/KBoxEffect.svelte";

    type BoxEffectProps = Omit<KBoxEffect["$$prop_def"], "ripple">;
    interface $$Props extends BoxEffectProps {
        text?: boolean;
        href?: string;
        disabled?: boolean;
        title?: string;
    }

    export let disabled: $$Props["disabled"] = false;
    export let href: $$Props["href"] = null;
    export let title: $$Props["title"] = null;
    export let text: $$Props["text"] = false;

    export let color: $$Props["color"] = "gradient";
    export let radius: $$Props["radius"] = text ? "tile" : "rounded";
    export let background: $$Props["background"] = !text;
    export let glow: $$Props['glow'] = false
</script>

{#if href}
    <a {href} {title} on:click {disabled} class="button" class:text>
        <KBoxEffect {...$$props} {color} {radius} {glow} {background} ripple>
            <span><slot /></span>
            <svelte:fragment slot="overlay-effects">
                <div class="hover-glass" />
            </svelte:fragment>
        </KBoxEffect>
    </a>
{:else}
    <button {title} on:click {disabled} class="button" class:text>
        <KBoxEffect {...$$props} {color} {radius} {glow} {background} ripple>
            <span><slot /></span>
            <svelte:fragment slot="overlay-effects">
                <div class="hover-glass" />
            </svelte:fragment>
        </KBoxEffect>
    </button>
{/if}

<style>
    button {
        appearance: unset;
        background: unset;
        border: none;
        font: inherit;
        color: inherit;
        padding: 0;
    }

    .button {
        cursor: pointer;
    }
    .button {
        padding: 0.2em;
    }
    .button.text {
        padding: 0;
    }
    .button div {
        margin: auto;
        width: 100%;
        height: 100%;
    }
    .hover-glass {
        position: absolute;
        inset: 0;
        background-color: currentColor;
        filter: opacity(0.3);

        transition: var(--k-transition);
        transition-property: opacity;
        opacity: 0;
    }
    .button:hover .hover-glass {
        opacity: 1;
    }

    .button:disabled {
        filter: saturate(0) !important;
        cursor: not-allowed !important;
    }
</style>
