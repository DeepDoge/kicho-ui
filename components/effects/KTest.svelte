<script lang="ts">
    import KRippleEffect from "./KRippleEffect.svelte";

    export let blur = false;
    export let border = false;
    export let ripple = false;
    export let background = true;

    export let color: "master" | "slave" | "error" | "mode" | "gradient" | "dark" | "light" = border ? "gradient" : "mode";
    export let size: "normal" | "larger" | "x-larger" | "xx-larger" = "normal";
    export let glow: "fill" | "border" | "none" = "none";
    export let radius: "rounded" | "tile" | "normal" = "normal";

    $: textColor = border ? "var(--k-color-mode-contrast)" : `var(--k-color-${color}-contrast)`;
</script>

<div
    class="box glow-{glow} radius-{radius}"
    class:no-border={!border}
    style:--color="var(--k-color-{color})"
    style:color={textColor}
    style:font-size="var(--k-font-{size})"
>
    {#if glow}
        <div class="glow effect" />
    {/if}
    <slot name="under-effects" />
    <div class="background-effects effect">
        {#if blur}
            <div class="blur effect" />
        {/if}
        {#if background}
            <div class="background effect" />
        {/if}
        <slot name="background-effects" />
    </div>
    {#if border}
        <div class="border effect" />
    {/if}
    <div class="content">
        <slot />
    </div>

    <div class="overlay-effects effect">
        {#if ripple}
            <KRippleEffect />
        {/if}
        <slot name="overlay-effects" />
    </div>
</div>

<style>
    .box {
        display: contents;
        --border-color: var(--color);
        --glow-color: var(--border-color);
        --background: var(--k-color-mode);
        --border-width: var(--k-border-width);
    }
    .box > .effect {
        border-radius: inherit;
        overflow: hidden;
        pointer-events: none;
    }

    .effect {
        position: absolute;
        inset: 0;
    }

    .radius-normal {
        border-radius: var(--k-border-radius);
    }
    .radius-tile {
        border-radius: 0em;
    }
    .radius-rounded {
        border-radius: var(--k-border-radius-rounded);
    }
    .no-border {
        --background: var(--color);
    }

    .background.effect {
        background-color: var(--background);
        background-image: var(--background);
    }
    .blur.effect + .background.effect {
        filter: opacity(0.85);
    }
    .blur.effect {
        backdrop-filter: blur(0.3em);
    }

    .background-effects {
        border: solid 0 transparent;
        border-width: calc(var(--border-width) - 0.2px);
    }

    .glow.effect::before,
    .border.effect {
        position: absolute;
        inset: 0;
        background-color: var(--border-color);
        background-image: var(--border-color);
        background-origin: border-box;
        border: solid var(--border-width) transparent;

        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        -webkit-mask-composite: xor;
    }

    .glow.effect {
        filter: blur(calc(0.25rem * 1));
    }
    .glow.effect::before {
        content: "";
        background-color: var(--glow-color);
        background-image: var(--glow-color);
    }
    .glow-none .glow.effect {
        opacity: 0;
    }
    .glow-fill .glow.effect::before {
        mask: unset;
        -webkit-mask: unset;
        mask-composite: unset;
        -webkit-mask-composite: unset;
    }
    .no-border > *:not(.glow) {
        --border-width: 0em;
    }

    .content {
        display: contents;
    }

    .content > :global(*:only-of-type) {
        border: solid var(--border-width) transparent;
        border-radius: inherit;
        overflow: hidden;
    }

    .content > :global(*:not(:only-of-type)) {
        all: unset !important;
        display: block !important;
        position: fixed !important;
        inset: 0 !important;
        background-color: red !important;
        color: white !important;
    }
    .content > :global(*:not(:only-of-type))::before {
        content: "Invalid";
    }
</style>
