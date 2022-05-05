<script context="module" lang="ts">
</script>

<script lang="ts">
    import KTest from "./effects/KTest.svelte";

    type BoxEffectProps = Omit<KTest["$$prop_def"], "ripple">;
    interface $$Props extends BoxEffectProps {
        href?: string;
        disabled?: boolean;
        title?: string;
    }

    export let color: $$Props["color"] = "gradient";
    export let radius: $$Props["radius"] = "rounded";

    export let disabled: $$Props["disabled"] = false;
    export let href: $$Props["href"] = null;
    export let title: $$Props["title"] = null;
</script>

{#if href}
    <a {href} {title} on:click {disabled} class="button">
        <KTest {...$$props} {color} {radius} ripple>
            <span><slot /></span>
        </KTest>
    </a>
{:else}
    <button {title} on:click {disabled} class="button">
        <KTest {...$$props} {color} {radius} ripple>
            <span><slot /></span>
        </KTest>
    </button>
{/if}

<style>
    button {
        appearance: unset;
        background: unset;
        border: none;
        font: inherit;
        color: inherit;

        --glow-opacity: 0;
    }

    .button {
        padding: 0.2em;
        cursor: pointer;
    }

    .button:focus,
    .button:hover {
        filter: brightness(1.15);
        --glow-opacity: 1;
    }

/*     .button.text {
        padding: 0;
    }

    .button.text::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: currentColor;
        filter: opacity(0.2);

        transition: var(--k-transition);
        transition-property: opacity;
        opacity: 0;
    }
    .button.text:hover::before {
        opacity: 1;
    } */

    .button:disabled {
        filter: saturate(0) !important;
        cursor: not-allowed !important;
    }
</style>
