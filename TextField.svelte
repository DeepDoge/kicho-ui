<script lang="ts">
    import Box from "./Box.svelte";
</script>

<Box glow rounded>
    <input type="text" on:input />
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

        padding: .5em .75em;
    }

    
</style>