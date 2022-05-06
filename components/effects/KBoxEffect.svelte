<script lang="ts">
    import KRippleEffect from "./KRippleEffect.svelte";

    export let glow: typeof color | 'mode-contrast' | boolean = false;
    export let background = false;
    export let blur = false;
    export let border = false;
    export let ripple = false;
    export let contrast = false;

    export let contentBorderDirection: "vertical" | "horizontal" | "manual" = "vertical";

    export let color: "master" | "slave" | "error" | "mode" | "gradient" | "dark" | "light" = "gradient";
    export let size: "smaller" | "normal" | "larger" | "x-larger" | "xx-larger" = "normal";
    export let radius: "rounded" | "tile" | "normal" = "normal";

    function getColor(value: typeof color, isContrast: boolean) {
        return isContrast === contrast ? `var(--k-color-${value})` : `var(--k-color-${value}-contrast)`;
    }

    $: boxColor = getColor(color, false);
    $: boxColorContrast = getColor(color, true);
    $: glowColor = typeof glow === "string" ? `var(--k-color-${glow})` : null;

    let element: HTMLDivElement = null;
</script>

<div
    bind:this={element}
    class="box radius-{radius} direction-{contentBorderDirection}"
    class:use-glow={glow}
    class:use-custom-glow={glowColor}
    class:use-background={background}
    class:use-blur={blur}
    class:use-border={border}
    class:use-contrast={contrast}
    style:font-size="var(--k-font-{size})"
    style:--color-contrast={boxColorContrast}
    style:--color={boxColor}
    style:--glow-color={glowColor}
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
            <KRippleEffect element={element?.parentElement} />
        {/if}
        <slot name="overlay-effects" />
    </div>
</div>

<style>
    /* 
    ====================================
    Color Settings
    ==================================== 
    */
    .box.use-background {
        --background: var(--color);
        color: var(--color-contrast)
    }
    .box.use-border {
        --border-color: var(--color);
        --background: var(--k-color-mode);
        color: var(--k-color-mode-contrast)
    }
    .box.use-glow:not(.use-custom-glow) {
        --glow-color: var(--color)
    }
    .box:not(.use-custom-glow).use-background.use-glow {
        --glow-color: var(--background);
    }
    .box:not(.use-custom-glow).use-border.use-glow {
        --glow-color: var(--border-color);
    }
    .box.use-blur {
        color: var(--k-color-mode-contrast)
    }

    /* 
    ====================================
    Layout Settings
    ==================================== 
    */

    .box {
        --border-width: 0em;
    }
    .box.use-border > :global(*),
    .box.use-glow > .glow {
        --border-width: var(--k-border-width);
    }

    .radius-normal {
        border-radius: var(--k-border-radius);
    }
    .radius-rounded {
        border-radius: var(--k-border-radius-rounded);
    }
    .radius-tile {
        border-radius: 0em;
    }

    /* 
    ====================================
    Initial Styles
    ==================================== 
    */

    .box {
        display: contents;
    }
    .effect,
    .effect::before,
    .effect::after {
        position: absolute;
        inset: 0;
    }

    /* 
    ====================================
    Effect Areas & Top Level Effects
    ==================================== 
    */

    .box > .effect {
        border-radius: inherit;
        overflow: hidden;
    }

    .background-effects {
        border: solid 0 transparent;
        border-width: calc(var(--border-width) - 0.2px);
    }

    .overlay-effects {
        pointer-events: none;
    }

    /* 
    ====================================
    Background Effects
    ==================================== 
    */

    .background.effect {
        background-color: var(--background);
        background-image: var(--background);
    }

    .blur.effect {
        backdrop-filter: blur(0.3em);
    }
    .use-blur > * > .background.effect {
        filter: opacity(0.5);
    }

    /* 
    ====================================
    Border & Glow Effects
    ==================================== 
    */

    .border.effect {
        background-color: var(--border-color);
        background-image: var(--border-color);
    }

    .glow.effect {
        filter: blur(calc(0.25rem * 1));
    }
    .glow.effect::before {
        content: "";
        background-color: var(--glow-color);
        background-image: var(--glow-color);
    }

    .border.effect,
    .glow.effect::before {
        border: solid var(--border-width) transparent;
        border-radius: inherit;
        background-origin: border-box;
    }

    .border.effect,
    .use-border > .glow.effect::before/* ,
    .box:not(.use-background) > .glow.effect::before */ {
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        -webkit-mask-composite: xor;
    }

    /* 
    ====================================
    Content
    ==================================== 
    */

    .content {
        display: contents;
        border-radius: inherit;
        --border: solid var(--border-width) transparent;
    }


    .direction-vertical .content > :global(*:first-child) {
        border-top: var(--border);
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }

    .direction-vertical .content > :global(*) {
        border-left: var(--border);
        border-right: var(--border);
    }

    .direction-vertical .content > :global(*:last-child) {
        border-bottom: var(--border);
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
    }


    .direction-horizontal .content > :global(*:first-child) {
        border-left: var(--border);
        border-top-left-radius: inherit;
        border-bottom-left-radius: inherit;
    }

    .direction-horizontal .content > :global(*) {
        border-top: var(--border);
        border-bottom: var(--border);
    }

    .direction-horizontal .content > :global(*:last-child) {
        border-right: var(--border);
        border-top-right-radius: inherit;
        border-bottom-right-radius: inherit;
    }
</style>
