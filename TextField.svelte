<script lang="ts">
    import shortid from "shortid";

    import Box from "./Box.svelte";
    export let value: string = null;
    export let label: string = null;
    export let name: string = null

    let id = shortid();
</script>

<Box glow rounded>
    {#if label}
        <label for={id}>{label}</label>
    {/if}
    <input type="text" {id} {name} on:input bind:value />
</Box>

<style>
    input {
        display: block;
        width: 100%;
        height: 100%;

        appearance: none;
        border: none;
        outline: none;
        background: transparent;

        color: inherit;
        font-size: inherit;

        padding: 0.5em 0.75em;
    }
</style>
