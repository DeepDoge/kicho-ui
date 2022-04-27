<script lang="ts">
    import HakoEffects from "./HakoEffects.svelte";
    import HakoRoot from "./HakoRoot.svelte";
</script>

<button on:click>
    <HakoEffects />
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
        text-transform: capitalize;
        color: inherit;
        --h-transition: none;
    }

    button:hover,
    button:focus {
        --hako-foreground-opacity: 0.2;
    }
</style>
