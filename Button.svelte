<script lang="ts">
    export let type: "button" | "submit" = "button";
    export let text: string;
</script>

<div class="g-box">
    <input {type} value={text} on:click />
</div>

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
