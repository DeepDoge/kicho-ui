<script lang="ts">
    import KBoxEffect from "./effects/KBoxEffect.svelte";

    type BoxProps = KBoxEffect["$$prop_def"];
    interface $$Props extends BoxProps {}

    export let color: $$Props["color"] = "mode-pop";
    export let size: $$Props["size"] = "smaller";

    function recalculateOffset() {
        if (!menuElement) return;
        const windowWidth = document.body.clientWidth;
        const bounds = menuElement.getBoundingClientRect();
        if (bounds.right > windowWidth || bounds.left < 0) offsetX = (bounds.width + (bounds.left - offsetX) - windowWidth + 35 * 0.5) * -1;
    }

    let offsetX = 0;
    let menuElement: HTMLDivElement = null;
    $: menuElement, recalculateOffset();
</script>

<svelte:window on:resize={recalculateOffset} on:scroll={recalculateOffset} />

<div bind:this={menuElement} style:--offset-x={offsetX} class="menu k-slim-scrollbar" on:click={recalculateOffset} on:mousemove={recalculateOffset}>
    <div class="inner">
        <KBoxEffect {...$$props} {color} {size}>
            <div class="content">
                <slot />
            </div>
        </KBoxEffect>
    </div>
</div>

<style>
    :global(*:not(:hover)) > .menu:not(:focus):not(:focus-within) {
        opacity: 0;
        pointer-events: none;
        height: 0;
        border: none;
        min-height: 0;
        overflow: hidden;
    }

    .menu {
        position: absolute;
        min-width: min(20em, calc(100vw - 35px));
        max-width: calc(100vw - 35px);
        max-height: 50vh;
        top: calc(100% - 1px);
        left: 50%;

        padding: var(--k-padding);

        overflow: auto;

        transition: var(--k-transition);
        transition-property: opacity;
        z-index: 10;

        transform: translateX(calc(calc(var(--offset-x) * 1px) - 50%));
    }
</style>
