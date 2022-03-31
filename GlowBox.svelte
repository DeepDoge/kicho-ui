<script>
    import Sheet from "./Sheet.svelte";

    export let filled = false;
</script>

<div class="box" class:filled>
    <Sheet>
        <slot />
    </Sheet>
</div>

<style>
    .filled {
        --g-background: var(--g-filled-foreground);
        --g-foreground-contrast: var(--g-filled-foreground-contrast);
        --g-foreground-opacity: 0;
    }

    .box {
        width: 100%;
        height: 100%;
        position: relative;
        padding: var(--g-border-width);
        color: var(--g-background-contrast);

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
        filter: blur(var(--g-glow-blur)) opacity(calc(var(--g-glow-opacity) * var(--g-glow-opacity-mul)));
        transition: var(--g-transition);
        transition-property: filter;
    }
</style>
