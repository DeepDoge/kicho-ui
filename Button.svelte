<script lang="ts">
    import GlowBox from "./GlowBox.svelte";
    import { v4 as uuid } from "@lukeed/uuid";

    export let type: "button" | "submit" = "button";
    export let text: boolean = false;
    let id = uuid();
</script>

<div class="button" class:text>
    <GlowBox filled>
        <input {id} {type} />
        <label for={id}>
            <slot />
        </label>
    </GlowBox>
</div>

<style>
    .button {
        transition: var(--g-transition);
        transition-property: filter;
    }

    .button:hover,
    .button:focus-within {
        --g-glow-opacity-mul: 1.25;
        filter: brightness(1.3);
    }

    .button:active {
        filter: brightness(1.5);
    }

    input {
        position: absolute;
        pointer-events: none;
        opacity: 0;
    }

    label {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        cursor: pointer;
        color: inherit;
        font-weight: bold;
        font-size: inherit;
        padding: 0.5em 0.75em;
    }

    .text {
        width: fit-content;
        height: fit-content;
        --g-foreground-opacity: 0;
        --g-background-opacity: 0;
        --g-glow-opacity-mul: .25;
        --g-border-width: 0;
    }

    .text:hover,
    .text:focus-within {
        --g-glow-opacity-mul: .5;
    }

    .text label {
        padding: 0;
        color: transparent;
        text-transform: capitalize;
        background: var(--g-background);
        background-clip: text;
        -webkit-background-clip: text;
    }
</style>
