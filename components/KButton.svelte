<script context="module" lang="ts">
    type BoxEffectProps = Omit<KBoxEffect["$$prop_def"], "ripple">;
    export const kButtonDefaults: BoxEffectProps = {
        type: "filled",
        color: "gradient",
        glow: 0.5,
        radius: 'rounded'
    };
</script>

<script lang="ts">
    import KBoxEffect from "./effects/KBoxEffect.svelte";

    interface $$Props extends BoxEffectProps {
        href?: string;
        disabled?: boolean;
        title?: string;
    }
    export let type = kButtonDefaults.type;
    export let color = kButtonDefaults.color;
    export let glow = kButtonDefaults.glow;
    export let radius = kButtonDefaults.radius;

    export let disabled: $$Props["disabled"] = false;
    export let href: $$Props["href"] = null;
    export let title: $$Props["title"] = null;
</script>

{#if href}
    <a {href} {title} on:click {disabled} class="button" class:text={type === "text"}>
        <KBoxEffect {...$$props} {type} {color} {glow} {radius} ripple>
            <span><slot /></span>
        </KBoxEffect>
    </a>
{:else}
    <button {title} on:click {disabled} class="button" class:text={type === "text"}>
        <KBoxEffect {...$$props} {type} {color} {glow} {radius} ripple>
            <span><slot /></span>
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

    .button.text {
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
    }

    .button:disabled {
        filter: saturate(0) !important;
        cursor: not-allowed !important;
    }
</style>
