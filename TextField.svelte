<script lang="ts">
    import Hako from "./Hako.svelte";

    export let type: "text" | "password" | "email" | "tel" | "textarea" = "text";
    export let id: string = null;
    export let name: string = null;
    export let value: string = null;
    export let required = false;

    let el: HTMLInputElement;
    $: el && (el.type = type);
</script>

{#key type}
    <div class="text-field" class:empty={!value}>
        <Hako />
        {#if type === "textarea"}
            <textarea class="input" bind:value on:input {required} {id} {name} />
        {:else}
            <input class="input" bind:this={el} bind:value on:input {required} {id} {name} />
        {/if}
    </div>
{/key}

<style>
    .input {
        display: block;
        width: 100%;
        height: 100%;
        background: transparent;
        border: none;

        font-size: inherit;
        color: inherit;
        padding: calc(var(--h-padding) * 0.5);
    }

    textarea.input {
        resize: vertical;
        min-height: 7ch;
        font-size: smaller;
        padding: var(--h-padding);
    }

    .text-field,
    .text-field.empty,
    .text-field:focus-within {
        --hako-foreground: var(--h-color-mode);
        color: var(--h-color-mode-inverse);
    }
</style>
