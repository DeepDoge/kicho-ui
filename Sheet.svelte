<div class="sheet">
    <slot />
</div>

<style>
    .sheet {
        width: 100%;
        height: 100%;
        position: relative;
        color: var(--g-foreground-contrast);
        isolation: isolate;

        transition: var(--g-transition);
        transition-property: color;
    }

    .sheet::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--g-foreground);
        opacity: var(--g-foreground-opacity);
        z-index: -1;

        transition: var(--g-transition);
        transition-property: opacity;
    }
</style>
