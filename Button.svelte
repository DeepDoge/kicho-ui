<script lang="ts">
    import GlowBox from "./GlowBox.svelte";

    export let type: "button" | "submit" = "button";
    export let text: string;
</script>

<div class="button">
    <GlowBox>
        <input {type} value={text} on:click />
    </GlowBox>
</div>

<style>
    .button {
        width: 100%;
        height: 100%;
        transition: var(--g-transition);
        transition-property: filter;
    }

    .button:hover {
        --g-foreground-opacity: 0;
        --g-foreground-text-color: var(--g-background-text-color)
    }

    .button:hover,
    .button:focus-within {
        --g-glow-brightness-mul: 1.25;
        filter: brightness(1.3);
    }

    .button:active {
        filter: brightness(1.5);
    }
    
    input {
        appearance: none;
        width: 100%;
        height: 100%;
        cursor: pointer;
        border: none;
        outline: none;
        background: transparent;
        color: inherit;
        font-weight: bold;
        font-size: inherit;
        padding: 0.5em 0.75em;
    }
</style>
