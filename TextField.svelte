<script lang="ts">
    import GlowBox from "./GlowBox.svelte";

    export let placeholder = null;
    export let value: string = null;
    export let required = false;
</script>

<div class="text-field">
    <GlowBox>
        <input on:change {required} type="text" bind:value {placeholder} />
    </GlowBox>
</div>

<style>
    input {
        border: none;
        width: 100%;
        height: 100%;
        padding: 0.75em;
        background-color: transparent;
        color: inherit;
        font-size: inherit;
    }

    .text-field:focus-within {
        --g-background: var(--g-sheet-background);
    }

    input::placeholder {
        color: inherit;
    }

    input:focus {
        outline: none;
    }
</style>
