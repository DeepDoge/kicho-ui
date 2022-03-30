<script lang="ts">
    import Box from "./Box.svelte";

    export let placeholder = null;
    export let value: string = null;
    export let required = false;

    let className: string = null;
    export { className as class };
</script>

<Box bind:class={className}>
    <input on:change {required} type="text" bind:value {placeholder} />
</Box>

<style>
    input {
        border: none;
        width: 100%;
        padding: 0.75em;
        background-color: transparent;
        color: inherit;
        font-size: inherit;
    }

    input::placeholder {
        color: inherit;
    }

    input:focus {
        outline: none;
    }
</style>
