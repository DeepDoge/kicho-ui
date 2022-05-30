<script lang="ts">
    import type { Colors } from "$lib/kicho-ui/types/style/colors";
    import KLoadingEffect from "./KLoadingEffect.svelte";
    import KRippleEffect from "./KRippleEffect.svelte";

    export let glow: Colors | "mode-contrast" | boolean = false;
    export let background = false;
    export let blur = false;
    export let border = false;
    export let ripple = false;
    export let fixed = false;
    export let loading = false;
    export let hideContent = false;
    export let contentBorderDirection: "vertical" | "horizontal" | "manual" = "vertical";

    export let color: Colors = "mode";
    export let size: "xx-smaller" | "x-smaller" | "smaller" | "normal" | "larger" | "x-larger" | "xx-larger" = "normal";
    export let radius: "rounded" | "tile" | "normal" | "fab" = "normal";

    function getColor(value: typeof color, isContrast: boolean) {
        if (contrast) {
            return `${isContrast ? value.substring(0, value.length - contrastSuffix.length) : value}`;
        } else {
            return `${isContrast ? `${value}${contrastSuffix}` : value}`;
        }
    }

    const contrastSuffix = "-contrast";
    $: contrast = color.endsWith(contrastSuffix);

    $: boxColor = getColor(color, false);
    $: boxColorContrast = getColor(color, true);
    $: glowColor = typeof glow === "string" ? `var(--k-color-${glow})` : null;

    let element: HTMLDivElement = null;
</script>

<k--
    bind:this={element}
    class="box radius-{radius} direction-{contentBorderDirection}"
    class:loading
    class:hide-content={hideContent}
    class:use-glow={glow}
    class:use-custom-glow={glowColor}
    class:use-background={background}
    class:use-blur={blur}
    class:use-border={border}
    class:use-contrast={contrast}
    class:use-fixed={fixed}
    style:font-size="var(--k-font-{size})"
    style:--color-contrast="var(--k-color-{boxColorContrast})"
    style:--color="var(--k-color-{boxColor})"
    style:--glow-color={glowColor}
>
    {#if glow}
        <k-- class="glow effect" />
    {/if}
    <slot name="under-effects" />

    <k-- class="background-effects effect">
        {#if blur}
            <k-- class="blur effect" />
        {/if}
        {#if background}
            <k-- class="background effect" />
        {/if}
        <slot name="background-effects" />
    </k-->

    {#if border}
        <k-- class="border effect" />
    {/if}

    <k-- class="content">
        <slot />
    </k-->

    <k-- class="overlay-effects effect">
        {#if ripple}
            <KRippleEffect element={element?.parentElement} />
        {/if}
        {#if loading}
            <KLoadingEffect color={boxColorContrast} />
        {/if}
        <slot name="overlay-effects" />
    </k-->
</k-->

<style>
    /* 
    ====================================
    Color Settings
    ==================================== 
    */

    .box.use-background {
        --background: var(--color);
        color: var(--color-contrast);
    }
    .box.use-border {
        --border-color: var(--color);
        --background: var(--k-color-mode);
        color: var(--k-color-mode-contrast);
    }
    .box.use-glow:not(.use-custom-glow) {
        --glow-color: var(--color);
    }
    .box:not(.use-custom-glow).use-background.use-glow {
        --glow-color: var(--background);
    }
    .box:not(.use-custom-glow).use-border.use-glow {
        --glow-color: var(--border-color);
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
    .radius-fab {
        border-radius: var(--k-border-radius-fab);
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
        backdrop-filter: blur(var(--k-blur));
    }
    .use-blur > * > .background.effect {
        filter: opacity(0.6);
    }
    .use-fixed > * > .background.effect {
        background-attachment: fixed;
    }

    /* 
    ====================================
    Border & Glow Effects
    ==================================== 
    */

    .border.effect {
        background-color: var(--border-color);
        background-image: var(--border-color);
        text-rendering: geometricPrecision;
        shape-rendering: geometricPrecision;
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
        mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        -webkit-mask-composite: xor;
    }

    .use-fixed > .border.effect {
        background-attachment: fixed;
    }

    .use-fixed > .glow.effect {
        background-attachment: fixed;
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

    .hide-content > .content {
        visibility: hidden;
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

    .loading.direction-vertical .content > :global(*) {
        cursor: wait !important;
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
