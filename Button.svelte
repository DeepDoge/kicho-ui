<script>
    import Hako from "./Hako.svelte";
</script>

<button on:click>
    <Hako />
    <span>
        <slot />
    </span>
</button>

<style>
    button {
        appearance: unset;
        background: unset;
        border: none;
        font-size: inherit;
        padding: 0.35em;
        cursor: pointer;
        color: #fff;

        --hako-foreground: var(--h-color-mode);
        --hako-foreground-opacity: 0;
    }

    button:hover,
    button:focus {
        --hako-foreground-opacity: .95;
        color: var(--h-color-mode-inverse);
    }
</style>
