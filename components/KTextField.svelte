<script lang="ts">
    import KBoxEffects from "./effects/KBoxEffects.svelte";
    import KOptions from "../KOptions.svelte";
    import type { KBoxTemplate } from "../KOptions.svelte";

    export let template: KBoxTemplate = "outlined";
    export let type: "text" | "password" | "email" | "tel" | "textarea" = "text";
    export let id: string = crypto.randomUUID();
    export let name: string = null;
    export let value: string = null;
    export let label: string = null;
    export let required = false;
    export let disabled = false;

    let el: HTMLInputElement;
    $: el && (el.type = type);
</script>

{#key type}
    {#if label}
        <label for={id}>{label}</label>
    {/if}
    <div class="text-field" class:empty={!value}>
        <KOptions {template} />
        <KBoxEffects />
        {#if type === "textarea"}
            <textarea class="input" bind:value on:input {required} {disabled} {id} {name} />
        {:else}
            <input class="input" bind:this={el} bind:value on:input {required} {disabled} {id} {name} />
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

        font: inherit;
        color: inherit;
        padding: calc(var(--k-padding) * 0.5);
    }

    .input:disabled {
        filter: saturate(0) !important;
        cursor: not-allowed !important;
    }

    textarea.input {
        resize: vertical;
        min-height: 7ch;
        font-size: smaller;
        padding: var(--k-padding);
    }

    .text-field,
    .text-field.empty,
    .text-field:focus-within {
        --k-box-foreground-opacity: 0.9;
        --k-box-foreground: var(--k-color-mode);
        color: var(--k-color-mode-inverse);
    }
</style>
