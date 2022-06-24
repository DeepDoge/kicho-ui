<script lang="ts">
    import KBoxEffect from "./effects/KBoxEffect.svelte";

    type BoxProps = KBoxEffect["$$prop_def"];
    interface $$Props extends BoxProps {}

    export let color: $$Props["color"] = "mode-pop";
    export let glow: $$Props["glow"] = false;
    export let background: $$Props["background"] = true;
</script>

<div class="menu">
    <KBoxEffect {...$$props} {color} {glow} {background}>
        <div class="content">
            <slot />
        </div>
    </KBoxEffect>
</div>

<style>
    :global(*:not(:hover)) > .menu:not(:focus):not(:focus-within) {
        opacity: 0;
        pointer-events: none;
    }

    .menu {
        position: absolute;
        left: 0;
        width: min(15em, 100vw);
        top: 100%;

        padding: var(--k-padding);

        transition: var(--k-transition);
        transition-property: opacity;
        z-index: 10;
    }
</style>
