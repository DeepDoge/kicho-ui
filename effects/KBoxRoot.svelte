<script context="module" lang="ts">
    export type KBoxTemplate = "outlined" | "filled" | "glow-only" | "text";
</script>

<script lang="ts">
    export let template: KBoxTemplate = "filled";
    export let textFilled = false;
</script>

<div class="kicho-box-root {template}" class:text-filled={textFilled}>
    <slot />
</div>

<style>
    .kicho-box-root {
        display: contents;
    }

    .kicho-box-root {
        --k-box-border-radius: 0.5em;
        --k-box-default-background: var(--k-color-gradient);
        --k-box-text-color: var(--k-color-gradient-contrast);
    }

    .kicho-box-root {
        --k-box-glow-blur: 0.25em;
        --k-box-glow-brightness: 1;
        --k-box-glow-background: var(--k-box-default-background);
    }

    .kicho-box-root {
        --k-box-background: var(--k-box-default-background);
        --k-box-foreground: var(--k-box-default-background);
        --k-box-foreground-offset: 0.2em;
    }

    .kicho-box-root {
        --k-box-background-opacity: .95;
        --k-box-foreground-opacity: .95;
        --k-box-glow-opacity: 0.5;
    }

    .kicho-box-root.filled {
        --k-box-foreground-opacity: 0;
    }

    .kicho-box-root.outlined {
        --k-box-foreground: var(--k-color-mode);
        --k-box-text-color: var(--k-color-mode-inverse);
    }

    .kicho-box-root.text-filled {
        --k-box-text-color: var(--k-box-default-background);
    }
    .kicho-box-root.text-filled :global(.kicho-effect:last-of-type ~ *) {
        display: inline-block;
        background: var(--k-box-text-color);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }

    .kicho-box-root.glow-only {
        --k-box-background: var(--k-color-mode);
        --k-box-foreground-opacity: 0;
        --k-box-foreground-offset: 0em;
        --k-box-text-color: var(--k-color-mode-inverse);
    }

    .kicho-box-root.text {
        --k-box-default-background: currentColor;
        --k-box-background-opacity: 0;
        --k-box-foreground-opacity: 0;
        --k-box-glow-opacity: 0;
        --k-box-foreground-offset: 0em;
    }
</style>
