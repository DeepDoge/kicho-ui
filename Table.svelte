<script>
    </script>

<table>
    <slot />
</table>

<style>
    table {
        width: 100%;
        padding: 0.5em 0.75em;
        position: relative;
        border-radius: var(--g-border-radius);
        color: var(--g-color-mode-inverse);
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
