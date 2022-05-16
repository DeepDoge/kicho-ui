<script lang="ts">
    import crypto from "crypto";
    import KBoxEffect from "./effects/KBoxEffect.svelte";
    type OptionsType = Record<string, string>;

    export let options: OptionsType;
    export let value: keyof typeof options = Object.keys(options)[0];

    $: options && onOptionsChange();
    function onOptionsChange() {
        value = Object.keys(options)[0];
    }

    let id = (typeof window !== "undefined" ? window.crypto : crypto).randomUUID();
</script>

<div class="select" tabindex="-1">
    <KBoxEffect background border>
        <span class="current" tabindex="-1">{value}</span>
    </KBoxEffect>
    <div class="options">
        <KBoxEffect border background>
            {#each Object.entries(options) as [key, label] (key)}
                <div class="option">
                    <input id="{id}-{key}" type="radio" value={key} bind:group={value} />
                    <label for="{id}-{key}">{label}</label>
                </div>
            {/each}
        </KBoxEffect>
    </div>
</div>

<style>
    input {
        opacity: 0;
        position: absolute;
        pointer-events: none;
        width: 0;
        height: 0;
    }

    .select {
        display: block;
    }

    .current {
        display: grid;
        grid-template-columns: 1fr auto;
        pointer-events: none;
        padding: calc(var(--k-padding));
    }

    .current::after {
        content: "v";
        height: 100%;
        display: grid;
        place-items: center;
        background-color: var(--k-color-slave);
        padding: 0 calc(var(--k-padding) * 2);
        line-height: 0;
        letter-spacing: 0;
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
        background-color: var(--k-color-mode-contrast);
        color: var(--k-color-mode);
    }
    label {
        display: block;
    }

    .select:not(:focus) .options {
        display: none;
    }
    .select:focus .current {
        pointer-events: all;
    }
</style>
