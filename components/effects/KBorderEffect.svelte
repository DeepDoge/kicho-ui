<div class="kicho-effect kicho-border">
    <slot></slot>
</div>

<style>
    .kicho-border ~ :global(*:not(.kicho-effect)) {
        border: solid var(--border-width) transparent;
    }

    .kicho-border {
        position: absolute;
        inset: 0;
        border-radius: var(--border-radius);
        overflow: hidden;
    }

    .kicho-border::after {
        content: "";
        position: absolute;
        inset: 0;
        background-color: var(--border-color);
        background-image: var(--border-color);
        padding: var(--border-width);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
    }
</style>
