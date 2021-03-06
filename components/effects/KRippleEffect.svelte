<script lang="ts">
    export let disabled: boolean = false;
    export let element: HTMLElement = null;
    let containerElement: HTMLDivElement;
    $: parent = element ?? containerElement?.parentElement;

    $: parent && parentChange();
    function parentChange() {
        parent.removeEventListener("mousedown", onMouseDown);
        parent.removeEventListener("touchstart", onMouseDown);

        parent.removeEventListener("mouseup", onMouseUp);
        parent.removeEventListener("mouseleave", onMouseUp);
        parent.removeEventListener("touchend", onMouseUp);
        parent.removeEventListener("blur", onMouseUp);

        parent.addEventListener("mousedown", onMouseDown);
        parent.addEventListener("touchstart", onMouseDown);

        parent.addEventListener("mouseup", onMouseUp);
        parent.addEventListener("mouseleave", onMouseUp);
        parent.addEventListener("touchend", onMouseUp);
        parent.addEventListener("blur", onMouseUp);
    }

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
                : bound.height + bound.height * (Math.abs(y - bound.height / 2) / (bound.height / 2));

        mousePoint = `translate(${x}px, ${y}px)`;
    };
</script>

<k--
    bind:this={containerElement}
    class="ripple-container"
    class:disabled
    style:--mouse-point={mousePoint}
    style:--size={size * 1.5}
    class:animate
    class:visible
>
    <k-- class="ripple" on:animationstart={() => (animating = true)} on:animationend={() => (animate = animating = false)} />
</k-->

<style>
    .ripple-container {
        --opacity: 0.2;
        --duration: 0.5s;
        --grow-start: translate(-50%, -50%) var(--mouse-point) scale(0);
        --grow-end: translate(-50%, -50%) var(--mouse-point) scale(1);
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        top: 0;
        left: 0;
        width: calc(1px * var(--size));
        aspect-ratio: 1/1;
        background-color: currentColor;
        border-radius: 10000vw;
        opacity: 0;
        transition: opacity ease-in-out calc(var(--duration) * 1);
        transform: var(--grow-end);
    }

    .visible .ripple {
        opacity: var(--opacity);
    }

    .animate .ripple {
        animation: grow forwards ease-in-out var(--duration);
    }

    @keyframes grow {
        0% {
            transform: var(--grow-start);
        }
        100% {
            transform: var(--grow-end);
        }
    }

    .disabled .ripple {
        display: none;
    }
</style>
