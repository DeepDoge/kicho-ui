<script lang="ts">
    import KBoxEffect from "./effects/KBoxEffect.svelte";

    type BoxEffectProps = KBoxEffect["$$prop_def"];

    interface $$Props extends BoxEffectProps {}

    export let background: $$Props["background"] = false;
    export let border: $$Props["border"] = true;
    export let glow: $$Props["glow"] = true;
    export let fixed: $$Props['fixed'] = true;
    export let size: $$Props['size'] = 'x-smaller'
    export let radius: $$Props['radius'] ='tile'
</script>

<span class="chip">
    <KBoxEffect {...$$props} {background} {fixed} {radius} {border} {glow} {size}>
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
        padding: 0 calc(var(--k-padding) * 2);
        letter-spacing: normal;
        white-space: nowrap;
    }
</style>
