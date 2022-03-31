<script>
    import Sheet from "./Sheet.svelte";
</script>

<div class="box">
    <Sheet>
        <slot />
    </Sheet>
</div>

<style>
    .box {
        width: 100%;
        height: 100%;
        position: relative;
        padding: var(--g-border-width);
        color: var(--g-background-text-color);

        transition: var(--g-color);
        transition-property: opacity;
    }

    .box::before,
    .box::after,
    .box > :global(.sheet)::before,
    .box > :global(.sheet)::after {
        border-radius: var(--g-border-radius);
    }

    .box::before,
    .box::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
    }

    .box::after {
        background: var(--g-background);
        opacity: var(--g-background-opacity);
        transition: var(--g-transition);
        transition-property: opacity;
    }

    .box::before {
        background: var(--g-glow-color);
        filter: blur(var(--g-glow-blur)) opacity(var(--g-glow-opacity));
        transition: var(--g-transition);
        transition-property: filter;
    }
</style>
