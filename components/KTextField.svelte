<script lang="ts">
    import KBackgroundEffect from "./effects/KBackgroundEffect.svelte";
    import KBorderEffect from "./effects/KBorderEffect.svelte";

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

<div class="field-group">
    {#if label}
        <label for={id}>{label}</label>
    {/if}
    <div class="text-field" class:empty={!value}>
        <KBorderEffect>
            <KBackgroundEffect blur />
        </KBorderEffect>
        {#if type === "textarea"}
            <textarea class="input" placeholder="..." bind:value on:input {required} {disabled} {id} {name} />
        {:else}
            <input class="input" bind:this={el} placeholder="..." bind:value on:input {required} {disabled} {id} {name} />
        {/if}
    </div>
</div>

<style>
    .input {
        display: block;
        width: 100%;
        height: 100%;
        background: transparent;
        border: none;

        font: inherit;
        color: inherit;
        padding: calc(var(--k-padding));
    }
    .text-field {
        --background: var(--k-color-mode-contrast);
        --background-opacity: 0.05;
        --border-radius: var(--k-border-radius-rounded);
    }
    .text-field:focus-within {
        --background-opacity: 0.1;
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

    label {
        font-size: var(--k-font-smaller);
    }
</style>
