<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import KBoxEffect from "./effects/KBoxEffect.svelte";

    export let active = false;
    let _delayedActiveTimeout = -1;
    let delayedActive = active;
    export let preventClose = false;

    const dispatch = createEventDispatcher();
    export let size = "30em";
    export let align: "center" | "end" | "start" | "stretch" = "center";
    export let justify: typeof align = "center";

    let dialogElement: HTMLElement;

    $: dialogElement && onActiveChange(active);
    function onActiveChange(value: typeof active) {
        if (_delayedActiveTimeout > 0) clearTimeout(_delayedActiveTimeout);
        if (!value) setTimeout(() => (delayedActive = active), 1000);
        else delayedActive = value;

        if (value && !dialogElement.hasAttribute('open')) dialogElement.setAttribute('open', '');
        if (!value && dialogElement.hasAttribute('open')) dialogElement.removeAttribute('open');
        return true;
    }
    function attemptClose(event: Event) {
        dispatch("closeattempt");
        if (preventClose) return event.preventDefault();
        active = false;
    }
</script>

<!-- not using dialog tag for now because it fucks up with z-index -->
<div
    aria-modal="true"
    class="dialog"
    bind:this={dialogElement}
    style:--ideal-size={size}
    style:justify-content={justify}
    style:align-content={align}
    on:click={(e) => e.target === dialogElement && attemptClose(e)}
    on:keydown={(e) => e.key.toLowerCase() === "escape" && attemptClose(e)}
    on:close={() => onActiveChange(active)}
    on:close
>
    {#if delayedActive}
        <div class="blur" />
        <div class="background" />
        <div class="background-dim" />
        <div class="modal">
            <KBoxEffect color="mode-body" glow="gradient" background blur radius="rounded">
                <div class="content">
                    <slot />
                </div>
            </KBoxEffect>
        </div>
    {/if}
    </div>

<style>
    .dialog {
        all: unset;
        position: fixed;
        inset: 0;

        display: grid;
        place-items: stretch;
        grid-template-columns: min(var(--ideal-size), 100%);

        padding: 6px;
        opacity: 1;

        transition: var(--k-transition);
        transition-property: opacity;
        z-index: var(--k-z-index-overlay);
    }

    .dialog:not([open]) {
        opacity: 0;
        pointer-events: none;
    }

    .modal {
        display: flex;
        max-height: 100%;
        overflow: visible;
    }

    .content {
        width: 100%;
        padding: calc(var(--k-padding) * 4);

        max-height: inherit;
        overflow-y: auto;
    }

    .dialog > *:not(.modal) {
        pointer-events: none;
    }

    .blur {
        position: absolute;
        inset: 0;
        backdrop-filter: blur(0.025rem);
    }

    .background {
        position: absolute;
        inset: 0;
        background-image: var(--k-color-gradient);
        opacity: 0.25;
    }
    .background-dim {
        position: absolute;
        inset: 0;
        background-color: var(--k-color-mode);
        opacity: 0.75;
    }

/*     dialog::backdrop {
        display: none;
    } */
</style>
