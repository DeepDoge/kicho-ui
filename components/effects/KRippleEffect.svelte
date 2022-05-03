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
    let animate = false;
    let animating = false;
    $: visible = animating || holding;
    let mousePoint = "translate(0px, 0px)";
    let size = 0;

    const onMouseUp = () => (holding = false);
    const onMouseDown = (event: MouseEvent | TouchEvent) => {
        holding = true;

        // Trigger animation
        animate = false;
        setTimeout(() => (animate = true));

        const bound = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
        const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
        const x = clientX === 0 ? bound.left / 2 : clientX - bound.left;
        const y = clientY === 0 ? bound.top / 2 : clientY - bound.top;

        size =
            bound.width > bound.height
                ? bound.width + bound.width * (Math.abs(x - bound.width / 2) / (bound.width / 2))
                : bound.height + bound.height * (Math.abs(y - bound.height / 2) / (bound.height / 2))

        mousePoint = `translate(${x}px, ${y}px)`;
    };
</script>

<div
    bind:this={containerElement}
    class="kicho-effect ripple-container"
    class:disabled
    style:--mouse-point={mousePoint}
    style:--size={size}
    class:animate
    class:visible
>
    <div class="ripple" on:animationstart={() => (animating = true)} on:animationend={() => (animate = animating = false)} />
</div>

<style>
    .ripple-container {
        --opacity: 0.2;
        --duration: 0.25s;
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
        border-radius: var(--k-box-border-radius);
    }

    .ripple {
        position: absolute;
        top: 0;
        left: 0;
        width: calc(1px * var(--size));
        aspect-ratio: 1/1;
        background: currentColor;
        border-radius: 10000vw;
        opacity: 0;
        transition: opacity ease-in-out calc(var(--duration) * 1);
    }

    .visible .ripple {
        opacity: var(--opacity);
    }

    .animate > .ripple {
        animation: grow forwards ease-in-out var(--duration);
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
