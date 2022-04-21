<script lang="ts">
</script>

<div class="hako-effect glow" />
<div class="hako-effect border" />
<div class="hako-effect background" />

<style>
    .glow {
        position: absolute;
        inset: calc(-1 * var(--h-border-width));
        background: var(--h-glow-background);
        filter: blur(var(--h-glow-blur)) brightness(var(--h-glow-brightness));
        border-radius: calc(var(--h-border-radius) / 1.25);
    }

    .border {
        position: absolute;
        inset: calc(-1 * var(--h-border-width));
        background: var(--h-border-background);
        border-radius: var(--h-border-radius);
    }

    .background {
        position: absolute;
        inset: 0;
        background: var(--h-background);
        border-radius: calc(var(--h-border-radius) / 1.25);
        filter: opacity(var(--h-background-opacity));
    }
</style>
