<script lang="ts">
    import Box from "./Box.svelte";
</script>

<Box glow rounded>
    <div class="inner">
        <Box rounded>
            <button>
                <slot />
            </button>
        </Box>
    </div>
</Box>

<style>
    button {
        display: block;
        width: 100%;
        height: 100%;
        appearance: none;
        background: transparent;
        color: inherit;
        font-size: inherit;
        border: none;
        outline: none;

        padding: 0.5em 0.75em;
        cursor: pointer;
    }

    .inner {
        padding: var(--g-border-width);
        transition: var(--g-transition);
        transition-property: backdrop-filter;
    }

    .inner:hover {
        backdrop-filter: brightness(1.3);
    }
    .inner:focus-within {
        backdrop-filter: brightness(1.25);
    }
    .inner:active {
        backdrop-filter: brightness(1.75);
    }

</style>
