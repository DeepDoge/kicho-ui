<script lang="ts">
    import KBoxEffect from "./effects/KBoxEffect.svelte";

    type BoxEffectProps = KBoxEffect["$$prop_def"];

    interface $$Props extends BoxEffectProps {}

    export let color: $$Props["color"] = "master";
    export let background: $$Props["background"] = true;
    export let glow: $$Props["glow"] = false;
    export let size: $$Props["size"] = "smaller";
</script>

<span class="chip">
    <KBoxEffect {...$$props} {color} {background} {glow} {size}>
        <div class="chip-inner">
            <slot />
        </div>
    </KBoxEffect>
</span>

<style>
    .chip {
        display: inline-block;
    }

    .chip-inner {
        display: grid;
        align-items: center;
        grid-auto-flow: column;
        gap: 0.5ch;

        padding: 0 calc(var(--k-padding) * 2);
        letter-spacing: normal;
        white-space: nowrap;
    }
</style>
