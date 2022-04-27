<script lang="ts">
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
    export let glowOpacity: number = null
</script>

<div
    class="hako-custom-options"
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
    .hako-custom-options {
        display: contents;
    }

    .hako-custom-options {
        --hako-border-radius: 0.5em;
        --hako-default-background: var(--h-color-gradient-0);
    }

    .hako-custom-options {
        --hako-glow-blur: 0.25em;
        --hako-glow-brightness: 1;
        --hako-glow-background: var(--hako-default-background);
    }

    .hako-custom-options {
        --hako-background: var(--hako-default-background);
        --hako-foreground: var(--hako-default-background);
        --hako-foreground-offset: 0.1em;
    }

    .hako-custom-options {
        --hako-background-opacity: 1;
        --hako-foreground-opacity: 1;
        --hako-glow-opacity: .5;
    }
</style>
