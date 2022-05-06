<script lang="ts">
    import KBoxEffect from "./effects/KBoxEffect.svelte";

    export let type: "text" | "password" | "email" | "tel" | "textarea" = "text";
    export let id: string = crypto.randomUUID();
    export let name: string = null;
    export let value: string = null;
    export let label: string = null;
    export let placeholder: string = null
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
        <KBoxEffect border background color="gradient" radius="normal">
            {#if type === "textarea"}
                <textarea class="input" {placeholder} bind:value on:input {required} {disabled} {id} {name} />
            {:else}
                <input class="input" bind:this={el} {placeholder} bind:value on:input {required} {disabled} {id} {name} />
            {/if}
        </KBoxEffect>
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

    .input:disabled {
        filter: saturate(0) !important;
        cursor: not-allowed !important;
    }

    textarea.input {
        resize: vertical;
        width: 100%;
        min-height: 7ch;
        font-size: smaller;
        padding: var(--k-padding);
    }

    label {
        font-size: var(--k-font-smaller);
    }
</style>
