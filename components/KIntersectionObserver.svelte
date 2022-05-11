<script lang="ts">
    import { createEventDispatcher, onDestroy, onMount } from "svelte";

    export let once = false;
    export let rootMargin: IntersectionObserver["rootMargin"] = "0px 0px 0px 0px";

    export let intersecting = false;
    let parent: HTMLDivElement = null;
    $: element = parent?.children[0] ?? null;
    let elementCache: typeof element = element 

    const dispatch = createEventDispatcher()
    $: dispatch('change', intersecting)

    let observer: IntersectionObserver = null

    
    $: onElement(element)
    async function onElement(value: typeof element)
    {
        if (elementCache) observer?.unobserve(elementCache)
        if (!element) return
        observer = new IntersectionObserver((entries) => (intersecting = entries[0].isIntersecting) && once && observer.unobserve(element), {
            rootMargin,
        });
        observer.observe(element);
        elementCache = element
    }

    onDestroy(() => {
        if (elementCache) observer?.unobserve(elementCache)
    })
    
</script>

<div class="intersection-observer" bind:this={parent}>
    <slot {intersecting}></slot>
</div>

<style>
    .intersection-observer {
        display: contents;
    }
</style>
