<div class="box">
    <slot />
</div>

<style>
    .box {
        width: 100%;
        height: 100%;
        position: relative;
        border: solid var(--g-border-width) transparent;
        color: var(--g-text);
        background: var(--g-background);
        background-clip: content-box;
        border-radius: var(--g-border-radius);
    }

    .box::before,
    .box::after {
        content: "";
        inset: calc(-1 * var(--g-border-width));
        position: absolute;
        background: var(--g-border-color);
        border-radius: var(--g-border-radius);
        z-index: -1;
    }

    .box::after {
        background: var(--g-glow-color);
        filter: blur(.75em) opacity(.75em);
    }
</style>
