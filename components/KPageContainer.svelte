<div class="page-container">
    <slot />
</div>

<style>
    .page-container {
        display: grid;
        grid-auto-flow: row;
        grid-template-columns: 1fr;
        gap: 0.5em;

        padding: var(--k-page-padding);

        justify-content: center;
        grid-template-columns: var(--k-page-width);
    }
</style>
