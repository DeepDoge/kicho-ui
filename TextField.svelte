<script lang="ts">
    import Hako from "./Hako.svelte";

    export let type: "text" | "password" | "email" | "tel" = "text";
    export let id: string = null;
    export let name: string = null;
    export let value: string = null;
    export let required = false;

    let el: HTMLInputElement;
    $: el && (el.type = type);
</script>

{#key type}
    <div class="text-field">
        <input bind:this={el} bind:value on:input {required} {id} {name} />
        <Hako />
    </div>
{/key}

<style>
    input {
        display: block;
        width: 100%;
        height: 100%;
        background: transparent;
        border: none;

        font-size: inherit;
        color: var(--h-color-mode-inverse);
        padding: calc(var(--h-padding) * 0.5);
        z-index: 1;
    }

    input:focus ~ :global(*)
    {
        --hako-foreground: var(--h-color-mode);
    }
    input:focus {
        color: var(--h-color-mode-inverse);
    }
</style>
