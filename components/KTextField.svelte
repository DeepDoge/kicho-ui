<script lang="ts">
    import crypto from "crypto";
    import KBoxEffect from "./effects/KBoxEffect.svelte";

    type BoxEffectProps = KBoxEffect["$$prop_def"];
    interface $$Props extends BoxEffectProps {
        type?: "text" | "password" | "email" | "tel" | "textarea";
        id?: string;
        name?: string;
        value?: string;
        label?: string;
        placeholder?: string;
        required?: boolean;
        disabled?: boolean;
    }

    export let type: $$Props["type"] = "text";
    export let id: $$Props["id"] = (typeof window !== "undefined" ? window.crypto : crypto).randomUUID();
    export let name: $$Props["name"] = null;
    export let value: $$Props["value"] = null;
    export let label: $$Props["label"] = null;
    export let placeholder: $$Props["placeholder"] = null;
    export let required: $$Props["required"] = false;
    export let disabled: $$Props["disabled"] = false;

    export let color: $$Props["color"] = "mode-contrast";
    export let background: $$Props["background"] = true;

    let el: HTMLInputElement;
    $: el && (el.type = type);
</script>

<div class="field-group">
    {#if label}
        <label for={id}>{label}</label>
    {/if}
    <div class="text-field" class:empty={!value}>
        <KBoxEffect {background} {color}>
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
