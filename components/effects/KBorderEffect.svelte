<div class="kicho-effect kicho-border-box">
    <slot></slot>
</div>
<div class="kicho-effect kicho-border">
</div>


<style>
    .kicho-border-box ~ :global(*:not(.kicho-effect)) {
        border: solid var(--border-width) transparent;
    }

    .kicho-border-box {
        position: absolute;
        inset: 0;
        border-radius: var(--border-radius);
        border: solid calc(var(--border-width) - .1px) transparent;
        overflow: hidden;
    }

    .kicho-border {
        position: absolute;
        inset: 0;
        border: solid var(--border-width) transparent;
        border-radius: var(--border-radius);
        background-color: var(--border-color);
        background-image: var(--border-color);
        background-origin: border-box;
        opacity: var(--border-opacity);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
    }
</style>
