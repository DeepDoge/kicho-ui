<script lang="ts">
    export let template: "outlined" | "filled" | "glow-only" | "text" = "filled";
    export let textFilled = false;

    export let borderRadius: string = null;

    export let defaultBackground: string = null;

    export let glowBlur: string = null;
    export let glowBrightness: number = null;
    export let glowBackground: string = null;

    export let background: string = null;
    export let foreground: string = null;

    export let foregroundOffset: string = null;

    export let backgroundOpacity: number = null;
    export let foregroundOpacity: number = null;
    export let glowOpacity: number = null;
</script>

<div
    class="hako-options {template}"
    class:text-filled={textFilled}
    style:--hako-default-background={defaultBackground}
    style:--hako-border-radius={borderRadius}
    style:--hako-glow-blur={glowBlur}
    style:--hako-glow-brightness={glowBrightness}
    style:--hako-glow-background={glowBackground}
    style:--hako-background={background}
    style:--hako-foreground={foreground}
    style:--hako-foreground-offset={foregroundOffset}
    style:--hako-background-opacity={backgroundOpacity}
    style:--hako-foreground-opacity={foregroundOpacity}
    style:--hako-glow-opacity={glowOpacity}
>
    <slot />
</div>

<style>
    .hako-options {
        display: contents;
    }

    .hako-options {
        --hako-border-radius: 0.5em;
        --hako-default-background: var(--h-color-gradient-0);
    }

    .hako-options {
        --hako-glow-blur: 0.25em;
        --hako-glow-brightness: 1;
        --hako-glow-background: var(--hako-default-background);
    }

    .hako-options {
        --hako-background: var(--hako-default-background);
        --hako-foreground: var(--h-color-mode);
        --hako-foreground-offset: 0.2em;
    }

    .hako-options {
        --hako-background-opacity: 1;
        --hako-foreground-opacity: 0;
        --hako-glow-opacity: 0.5;
    }

    .hako-options :global(.hako-effect:last-of-type ~ *) {
        color: #fff;
    }

    .hako-options.outlined {
        --hako-foreground: var(--h-color-mode);
        --hako-foreground-opacity: 1;
    }
    .hako-options.outlined :global(.hako-effect:last-of-type ~ *) {
        color: var(--h-color-mode-inverse);
    }

    .hako-options.text-filled :global(.hako-effect:last-of-type ~ *) {
        display: inline-block;
        background: var(--hako-default-background);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }

    .hako-options.glow-only {
        --hako-background: var(--h-color-mode);
        --hako-foreground-opacity: 0;
        --hako-foreground-offset: 0;
    }
    .hako-options.glow-only :global(.hako-effect:last-of-type ~ *) {
        color: var(--h-color-mode-inverse);
    }

    .hako-options.text {
        color: inherit;
        --hako-default-background: currentColor;
        --hako-background-opacity: 0;
        --hako-foreground-opacity: 0;
        --hako-glow-opacity: 0;
        --hako-foreground-offset: 0;
    }
    .hako-options.text :global(.hako-effect:last-of-type ~ *) {
        color: inherit;
    }
</style>
