<script>
</script>

<div>
    <table>
        <slot />
    </table>
</div>

<style>
    div {
        max-width: 100%;
        overflow-x: auto;
    }
    table {
        width: 100%;

        padding: 0.25em;
        position: relative;
        border-radius: var(--g-border-radius);
        color: var(--g-color-mode-inverse);
        border-spacing: 1em 0;
        overflow: hidden;
    }
    table::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--g-color-mode);
        opacity: 0.6;
    }
    table > :global(*) {
        position: relative;
    }

    table :global(tr:not(:last-child)) :global(td),
    table :global(th) {
        border-bottom: solid 0.1em var(--g-color-mode-inverse);
        padding: 0.5em;
    }
</style>
