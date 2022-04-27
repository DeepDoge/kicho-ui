<script lang="ts">
    import Hako from "./Hako.svelte";
    export let type: "text" | "outlined" | "filled" = "filled";
</script>

<button on:click class:text={type === "text"} class:outlined={type === "outlined"} class:filled={type === "filled"}>
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
        text-transform: capitalize;
    }

    button.filled {
        --hako-foreground: var(--h-color-mode);
        --hako-foreground-opacity: 0;
        color: #fff;
    }
    button.filled:hover,
    button.filled:focus {
        --hako-foreground-opacity: 0.95;
        color: var(--h-color-mode-inverse);
    }

    button.text {
        color: inherit;
        --hako-foreground: currentColor;
        --hako-foreground-opacity: 0;
        --hako-background-opacity: 0;
        --hako-glow-opacity: 0;
        --h-transition: none;
    }
    button.text:hover,
    button.text:focus {
        --hako-foreground-opacity: .1;
    }
</style>
