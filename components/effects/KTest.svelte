<script lang="ts">
    import KRippleEffect from "./KRippleEffect.svelte";

    /* export let color: "master" | "slave" | "error" | "mode" | "gradient" | "dark" | "light";
    export let border: "glow" | "solid";
    export let size: "normal" | "larger" | "x-larger" | "xx-larger" = "normal";
    export let blur: boolean
    export let drop: "glow" | "shadow"
    export let radius: "rounded" | "tile" | "normal" = "normal";
    export let ripple = false;
 */
    export let type: "outlined" | "filled" | "text" | "normal" = "normal";
    export let blur = false;
    export let size: "normal" | "larger" | "x-larger" | "xx-larger" = "normal";
    export let glow: number | boolean = false;
    export let color: "master" | "slave" | "error" | "mode" | "gradient" | "dark" | "light" =
        type === "normal" || type === "outlined" ? "gradient" : "mode";
    export let radius: "rounded" | "tile" | "normal" = "normal";
    export let ripple = false;

    $: borderRadius = radius === "normal" ? "var(--k-border-radius)" : radius === "rounded" ? "var(--k-border-radius-rounded)" : "0";
    $: glowValue = glow === true ? 1 : glow || 0;

    $: noBorder = type === "filled";
    $: noBackground = type === "outlined";
</script>

<div
    class="box type-{type}"
    class:noBorder
    class:noBackground
    style:--color="var(--k-color-{color})"
    style:font-size="var(--k-font-{size})"
    style:--glow={glowValue}
    style:border-radius={borderRadius}
>
    {#if glow}
        <div class="glow effect" />
    {/if}
    <div class="border-box effect">
        {#if blur}
            <div class="blur effect" />
        {/if}
        {#if !noBackground}
            <div class="background effect" />
        {/if}
    </div>
    {#if !noBorder}
        <div class="border effect" />
    {/if}
    <div class="content">
        <slot />
    </div>
    {#if ripple}
        <div class="ripple effect">
            <KRippleEffect />
        </div>
    {/if}
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
    }

    .effect {
        position: absolute;
        inset: 0;
    }

    .border-box {
        border: solid 0 transparent;
        border-width: calc(var(--border-width) - 0.2px);
    }

    .glow::before,
    .border {
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
    .glow {
        filter: blur(calc(0.25rem * var(--glow)));
    }
    .glow::before {
        content: "";
        background-color: var(--glow-color);
        background-image: var(--glow-color);
    }
    .noBorder > *:not(.glow) {
        --border-width: 0em;
    }
    .noBorder {
        --glow-color: var(--k-color-gradient)
    }

    .content {
        border: solid var(--border-width) transparent;
        border-radius: inherit;
        overflow: hidden;
    }

    .background {
        background-color: var(--background);
        background-image: var(--background);
    }
    .blur + .background {
        filter: opacity(0.85);
    }
    .blur {
        backdrop-filter: blur(0.3em);
    }
</style>
