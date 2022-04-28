<script lang="ts">
</script>

<div class="kicho-effect glow" />
<div class="kicho-effect background" />
<div class="kicho-effect foreground" />

<style>
    .kicho-effect {
        animation: var(--k-gradient-animation);
        transition: var(--k-transition);
        transition-property: filter, border-radius, background-color, inset;
    }

    .glow {
        position: absolute;
        inset: 0;
        background: var(--k-box-glow-background);
        filter: blur(var(--k-box-glow-blur)) brightness(var(--k-box-glow-brightness)) opacity(var(--k-box-glow-opacity));
        border-radius: var(--k-box-border-radius);
    }

    .background {
        position: absolute;
        inset: 0;
        border-radius: var(--k-box-border-radius);
        background: var(--k-box-background);
        filter: opacity(var(--k-box-background-opacity));
    }

    .foreground {
        position: absolute;
        inset: var(--k-box-foreground-offset);
        background: var(--k-box-foreground);
        border-radius: calc(var(--k-box-border-radius) * 0.75);
        filter: opacity(var(--k-box-foreground-opacity));
    }

    /* content */
    :global(.kicho-effect ~ :not(.kicho-effect)) {
        --border: solid transparent var(--k-box-foreground-offset);
        border-left: var(--border);
        border-right: var(--border);
        color: var(--k-box-text-color);
    }
    :global(.kicho-effect + *:not(.kicho-effect)) {
        border-top: var(--border);
    }
    :global(.kicho-effect ~ *:not(.kicho-effect):last-child) {
        border-bottom: var(--border);
    }
</style>
