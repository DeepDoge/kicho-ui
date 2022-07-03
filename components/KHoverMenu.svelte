<script lang="ts">
    import KBoxEffect from "./effects/KBoxEffect.svelte";

    type BoxProps = KBoxEffect["$$prop_def"];
    interface $$Props extends BoxProps {
        direction?: "left" | "right";
    }

    export let color: $$Props["color"] = "mode-pop";
    export let direction: $$Props["direction"] = "right";
</script>

<div class="menu {direction}">
    <KBoxEffect {...$$props} {color}>
        <div class="content">
            <slot />
        </div>
    </KBoxEffect>
</div>

<style>
    :global(*:not(:hover)) > .menu:not(:focus):not(:focus-within) {
        opacity: 0;
        pointer-events: none;
        width: 0;
        height: 0;
        overflow: hidden;
    }

    .menu {
        position: absolute;
        width: min(20em, 100vw);
        max-height: 50vh;
        top: calc(100% - 1px);

        font-size: 0.75rem;

        padding: var(--k-padding);

        transition: var(--k-transition);
        transition-property: opacity;
        z-index: 10;
    }

    .right {
        left: 0;
    }

    .left {
        right: 0;
    }
</style>
