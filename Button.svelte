<script lang="ts">
    import Box from "./Box.svelte";
    export let type: "button" | "submit" = "button";
    export let text: string;

    let className: string = null
    export {className as class}
</script>

<Box type="tag" bind:class={className}>
    <input {type} value={text} on:click />
</Box>

<style>
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
