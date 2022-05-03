<script context="module" lang="ts">
    import "./root.css"
    export type KBoxTemplate = "outlined" | "filled" | "glow-only" | "text";
</script>

<script lang="ts">
    export let template: KBoxTemplate = "filled";
    export let textFilled = false;
</script>

<div class="kicho-box-options {template}" class:text-filled={textFilled} />

<style>
    .kicho-box-options {
        display: contents;
    }

    .kicho-box-options ~ :global(*) {
        --k-box-border-radius: 0.5em;
        --k-box-default-background: var(--k-color-gradient);
        --k-box-text-color: var(--k-color-gradient-contrast);
    }

    .kicho-box-options ~ :global(*) {
        --k-box-glow-blur: 0.25em;
        --k-box-glow-brightness: 1;
        --k-box-glow-background: var(--k-box-default-background);
    }

    .kicho-box-options ~ :global(*) {
        --k-box-background: var(--k-box-default-background);
        --k-box-foreground: var(--k-box-default-background);
        --k-box-foreground-offset: 0.2em;
    }

    .kicho-box-options ~ :global(*) {
        --k-box-background-opacity: 0.95;
        --k-box-foreground-opacity: 0.95;
        --k-box-glow-opacity: 0.5;
    }

    .kicho-box-options.filled ~ :global(*) {
        --k-box-foreground-opacity: 0;
    }

    .kicho-box-options.outlined ~ :global(*) {
        --k-box-foreground: var(--k-color-mode);
        --k-box-text-color: var(--k-color-mode-inverse);
    }

    .kicho-box-options.text-filled ~ :global(*) {
        --k-box-text-color: var(--k-box-default-background);
    }
    .kicho-box-options.text-filled ~ :global(*) :global(.kicho-effect:last-of-type ~ *:not(.kicho-box-options)) {
        display: inline-block;
        background: var(--k-box-text-color);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }

    .kicho-box-options.glow-only ~ :global(*) {
        --k-box-background: var(--k-color-mode);
        --k-box-foreground-opacity: 0;
        --k-box-foreground-offset: 0em;
        --k-box-text-color: var(--k-color-mode-inverse);
    }

    .kicho-box-options.text ~ :global(*) {
        --k-box-default-background: currentColor;
        --k-box-background-opacity: 0;
        --k-box-foreground-opacity: 0;
        --k-box-glow-opacity: 0;
        --k-box-foreground-offset: 0em;
    }
</style>
