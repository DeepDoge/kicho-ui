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
    export let loading: $$Props["loading"] = false;
    export let href: $$Props["href"] = null;
    export let title: $$Props["title"] = null;
    export let text: $$Props["text"] = false;

    export let color: $$Props["color"] = "mode-contrast";
    export let radius: $$Props["radius"] = text ? "tile" : "normal";
    export let background: $$Props["background"] = !text;
</script>

{#if href}
    <a {href} {title} aria-label={title} on:click {disabled} class="button" class:text>
        <KBoxEffect {...$$props} {color} {radius} {background} {loading} ripple>
            <div class="content text-inline"><slot /></div>
            <svelte:fragment slot="overlay-effects">
                <div class="hover-glass" />
            </svelte:fragment>
        </KBoxEffect>
    </a>
{:else}
    <button {title} aria-label={title} on:click disabled={disabled || loading} class:disabled class:loading class="button" class:text>
        <KBoxEffect {...$$props} {color} {radius} {background} {loading} ripple>
            <div class="content text-inline"><slot /></div>
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
        padding: 0;
    }

    .button {
        cursor: pointer;
        display: grid;
        font: inherit;
        font-size: 1em;
        color: inherit;
        text-align: inherit;
        place-content: stretch;
    }
    .button {
        padding: 0.75ch 1.5ch;
    }
    .button.text {
        padding: 0;
    }
    .button .content {
        display: grid;
        place-items: center;
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
    .button:not(.loading):hover .hover-glass {
        opacity: 1;
    }

    .button.disabled {
        filter: saturate(0) !important;
        cursor: not-allowed !important;
    }

    .button.loading {
        cursor: wait;
    }
</style>
