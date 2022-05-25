<script lang="ts">
    import KBoxEffect from "./effects/KBoxEffect.svelte";
    import KButton from "./KButton.svelte";
    import KField from "./KField.svelte";
    type OptionsType = Record<string, string>;

    type FieldProps = KField["$$prop_def"];
    interface $$Props extends FieldProps {
        options: OptionsType;
        value?: keyof typeof options;
    }

    export let options: $$Props["options"];
    export let value: $$Props["value"] = Object.keys(options)[0];

    $: options && onOptionsChange();
    function onOptionsChange() {
        value = Object.keys(options)[0];
    }

    let active = false;
    const toggle = () => (active = !active);
</script>

<KField {...$$props} let:id>
    <div class="select" class:active>
        <KButton href="javascript:;" background on:click={toggle}>
            <div class="current">{options[value]}</div>
        </KButton>

        <div class="btn">
            <KButton href="javascript:;" color="master" radius="normal" on:click={toggle}>
                <span class="btn-text" />
            </KButton>
        </div>

        <div class="options" on:click={() => (active = false)}>
            <KBoxEffect color="mode-contrast" blur background>
                {#each Object.entries(options) as [key, label] (key)}
                    <div class="option">
                        <input id="{id}-{key}" type="radio" value={key} bind:group={value} />
                        <label for="{id}-{key}">{label}</label>
                    </div>
                {/each}
            </KBoxEffect>
        </div>
    </div>
</KField>

<style>
    input {
        opacity: 0;
        position: absolute;
        pointer-events: none;
        width: 0;
        height: 0;
    }

    .select {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: var(--k-padding);
    }

    .current {
        width: 100%;
    }

    .btn {
        display: grid;
        aspect-ratio: 1/1;
    }
    .btn-text {
        display: grid;
        place-items: center;
        line-height: 0;
        letter-spacing: 0;
        aspect-ratio: 1/1;
    }
    .btn-text::after {
        content: "▼";
    }

    .options {
        display: grid;
        position: absolute;
        top: 100%;
        transform: translateY(calc(-1 * var(--k-border-width)));
        left: 0;
        right: 0;
        z-index: 99999999;
    }

    .option:hover {
        background-color: var(--k-color-master);
        color: var(--k-color-master-contrast);
    }
    label {
        display: block;
    }

    .select:not(.active) .options {
        display: none;
    }
</style>
