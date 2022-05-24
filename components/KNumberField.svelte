<script lang="ts">
    import KBoxEffect from "./effects/KBoxEffect.svelte";
    import KField from "./KField.svelte";

    type BoxEffectProps = KBoxEffect["$$prop_def"];
    type FieldProps = KField["$$prop_def"];
    interface $$Props extends BoxEffectProps, FieldProps {
        type?: "number";
        name?: string;
        value?: number;
        placeholder?: string;
        required?: boolean;
        disabled?: boolean;
    }

    export let type: $$Props["type"] = "number";
    export let name: $$Props["name"] = null;
    export let value: $$Props["value"] = null;
    export let placeholder: $$Props["placeholder"] = null;
    export let required: $$Props["required"] = false;
    export let disabled: $$Props["disabled"] = false;

    export let color: $$Props["color"] = "mode-contrast";
    export let background: $$Props["background"] = true;

    let el: HTMLInputElement;
    $: el && (el.type = type);
</script>

<KField {...$$props} let:id>
    <div class="text-field" class:empty={!value}>
        <KBoxEffect {background} {color}>
            <input class="input" bind:this={el} {placeholder} bind:value on:input {required} {disabled} {id} {name} />
        </KBoxEffect>
    </div>
</KField>

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
</style>
