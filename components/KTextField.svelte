<script lang="ts">
    import KBoxEffect from "./effects/KBoxEffect.svelte";
    import KField from "./KField.svelte";

    type BoxEffectProps = KBoxEffect["$$prop_def"];
    type FieldProps = KField["$$prop_def"];
    interface $$Props extends BoxEffectProps, FieldProps {
        type?: "text" | "password" | "email" | "tel" | "textarea";
        name?: string;
        value?: string;
        placeholder?: string;
        required?: boolean;
        disabled?: boolean;
        compact?: boolean;
    }

    export let type: $$Props["type"] = "text";
    export let name: $$Props["name"] = null;
    export let value: $$Props["value"] = null;
    export let placeholder: $$Props["placeholder"] = null;
    export let required: $$Props["required"] = false;
    export let disabled: $$Props["disabled"] = false;

    export let color: $$Props["color"] = "mode-pop";
    export let glow: $$Props["glow"] = false;
    export let background: $$Props["background"] = true;
    export let blur: $$Props["blur"] = false;
    export let loading: $$Props["loading"] = false;
    export let compact: $$Props["compact"] = false;

    let el: HTMLInputElement;
    $: el && (el.type = type);
</script>

<KField {...$$props} let:id>
    <div class="text-field" class:compact class:empty={!value}>
        <KBoxEffect {...$$props} {background} {color} {blur} {glow}>
            {#if type === "textarea"}
                <textarea class="input" class:loading {placeholder} bind:value on:input {required} disabled={loading || disabled} {id} {name} />
            {:else}
                <input
                    class="input"
                    class:loading
                    bind:this={el}
                    {placeholder}
                    bind:value
                    on:input
                    {required}
                    disabled={loading || disabled}
                    {id}
                    {name}
                />
            {/if}
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

        line-height: inherit;
        word-spacing: inherit;
        letter-spacing: inherit;
        font: inherit;
        font-size: 1em;
        color: inherit;
        padding: calc(var(--k-padding) * 1) calc(var(--k-padding) * 1.5);
    }

    .input:not(.loading):disabled {
        filter: opacity(0.5);
        cursor: not-allowed;
    }

    textarea.input {
        resize: vertical;
        width: 100%;
        min-height: 7ch;
        padding: calc(var(--k-padding) * 2);
    }

    .compact .input {
        padding: 0;
    }
</style>
