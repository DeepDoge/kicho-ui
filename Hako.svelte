<script lang="ts">
</script>

<div class="hako-effect glow" />
<div class="hako-effect background" />
<div class="hako-effect foreground" />

<style>
    .glow,
    .background,
    .foreground {
        animation: var(--h-gradient-animation);
        transition: var(--h-transition);
        transition-property: filter, border-radius, background-image, background-color, inset;
    }

    .glow {
        position: absolute;
        inset: 0;
        background: var(--hako-glow-background);
        filter: blur(var(--hako-glow-blur)) brightness(var(--hako-glow-brightness)) opacity(var(--hako-glow-opacity));
        border-radius: var(--hako-border-radius);
    }

    .background {
        position: absolute;
        inset: 0;
        border-radius: var(--hako-border-radius);
        background: var(--hako-background);
        filter: opacity(var(--hako-background-opacity));
    }

    .foreground {
        position: absolute;
        inset: var(--hako-foreground-offset);
        background: var(--hako-foreground);
        border-radius: var(--hako-border-radius);
        filter: opacity(var(--hako-foreground-opacity));
    }
</style>
