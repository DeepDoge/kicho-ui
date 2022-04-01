<script lang="ts">
    import GlowBox from "./GlowBox.svelte";
    import { v4 as uuid } from "@lukeed/uuid";

    export let type: "button" | "submit" = "button";
    export let text: boolean = false;
    let id = uuid();
</script>

<div class="button g-box" class:text class:g-box__no-background={text} class:g-box__no-glow={text}>
    <input {id} {type} aria-hidden />
    <label for={id}>
        <slot />
    </label>
</div>

<style>
    input {
        pointer-events: none;
        position: absolute;
        opacity: 0;
    }

    .button {
        text-align: center;
        padding: 0.5em 1em;
    }

    label {
        display: block;
    }

    .button:hover {
        filter: brightness(1.1);
    }

    .button:focus-within {
        filter: brightness(1.2);
    }

    .button:active {
        filter: brightness(1.3);
    }

    .text,
    .text label {
        width: fit-content;
        height: fit-content;
    }

    .text {
        color: transparent;
        background: var(--g-background);
        background-clip: text;
        -webkit-background-clip: text;
        padding: 0 0.2em;
    }

    .text::after {
        background: var(--g-color-mode-contrast);
        border-radius: 0;
        opacity: 0;
    }

    .text:hover::after,
    .text:focus-within::after {
        opacity: 0.1;
    }
</style>
