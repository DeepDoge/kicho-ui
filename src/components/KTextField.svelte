<script lang="ts">
import KBackgroundEffect from "./effects/KBackgroundEffect.svelte";
import KBorderEffect from "./effects/KBorderEffect.svelte";
import KGlowEffect from "./effects/KGlowEffect.svelte";


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
        <KBorderEffect>
            <KBackgroundEffect></KBackgroundEffect>
        </KBorderEffect>
        {#if type === "textarea"}
            <textarea class="input" bind:value on:input {required} {disabled} {id} {name} />
        {:else}
            <input class="input" bind:this={el} bind:value on:input {required} {disabled} {id} {name} />
        {/if}
    </div>
{/key}

<style>
    .text-field {
        --border-radius: var(--k-border-radius);
        --border-width: 0;
        --border-color: unset;
        --background: var(--k-color-mode-inverse);
        color: var(--k-color-mode);
    }
    
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
</style>