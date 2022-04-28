<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    export let disabled: boolean = false;
    let containerElement: HTMLDivElement;

    onMount(() => {
        containerElement.parentElement.addEventListener("mousedown", onMouseDown);
        containerElement.parentElement.addEventListener("touchstart", onMouseDown);

        containerElement.parentElement.addEventListener("mouseup", onMouseUp);
        containerElement.parentElement.addEventListener("mouseleave", onMouseUp);
        containerElement.parentElement.addEventListener("touchend", onMouseUp);
        containerElement.parentElement.addEventListener("blur", onMouseUp);
    });

    onDestroy(() => {
        if (!containerElement) return;
        containerElement.parentElement.removeEventListener("mousedown", onMouseDown);
        containerElement.parentElement.removeEventListener("touchstart", onMouseDown);

        containerElement.parentElement.removeEventListener("mouseup", onMouseUp);
        containerElement.parentElement.removeEventListener("mouseleave", onMouseUp);
        containerElement.parentElement.removeEventListener("touchend", onMouseUp);
        containerElement.parentElement.removeEventListener("blur", onMouseUp);
    });

    let holding = false;
    let animatingVisibility = false;
    $: visible = animatingVisibility || holding;
    
    let animate = false;
    let mousePoint = "translate(0px, 0px)";
    let size = "0px";
    
    const onMouseUp = () => (holding = false);
    const onMouseDown = (event: MouseEvent | TouchEvent) => {
        holding = true;
        animate = false;
        setTimeout(() => (animate = true));
        const bound = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
        const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
        size = `${Math.max(bound.width, bound.height) * 2}px`;
        mousePoint =
            clientX === 0 && clientY === 0
                ? `translate(${bound.width / 2}px, ${bound.height / 2}px)`
                : `translate(${clientX - bound.left}px, ${clientY - bound.top}px)`;
    };
</script>

<div
    bind:this={containerElement}
    class="ripple-container kicho-effect"
    class:disabled
    style:--mouse-point={mousePoint}
    style:--size={size}
    class:animate
    class:visible
    on:animationstart={() => (animatingVisibility = true)}
    on:animationend={() => (animatingVisibility = false)}
>
    <div class="ripple" />
</div>

<style>
    .ripple-container {
        --opacity: .25;
        transition: ease-in-out 0.2s;
        transition-property: opacity;
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
    }

    .ripple {
        width: var(--size);
        aspect-ratio: 1/1;
        background: currentColor;
        border-radius: 50%;
    }

    .ripple-container.visible {
        animation: appear forwards ease-in-out 0.5s;
        opacity: var(--opacity);
    }
    .ripple-container:not(.visible) {
        opacity: 0;
    }

    .animate > .ripple {
        animation: grow forwards ease-in-out 0.5s;
    }

    @keyframes appear {
        0% {
            opacity: 0;
        }
        100% {
            opacity: var(--opacity);
        }
    }

    @keyframes grow {
        0% {
            transform: translate(-50%, -50%) var(--mouse-point) scale(0);
        }
        100% {
            transform: translate(-50%, -50%) var(--mouse-point) scale(1);
        }
    }

    .disabled > .ripple {
        display: none;
    }
</style>
