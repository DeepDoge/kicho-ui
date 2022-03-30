<div class="box">
    <slot />
</div>

<style>
    .box {
        width: 100%;
        height: 100%;
        position: relative;
        border: solid var(--g-border-width) transparent;
        background: var(--g-background);
        color: var(--g-text);
        background-clip: content-box;
    }

    .box::before,
    .box::after {
        content: "";
        inset: calc(-1 * var(--g-border-width));
        position: absolute;
        background: var(--g-border-background);
        border-radius: var(--g-border-radius);
        z-index: -1;
    }

    .box::after {
        filter: blur(.75em) opacity(.75);
    }
</style>
