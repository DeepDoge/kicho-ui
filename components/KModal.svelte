<script lang="ts">
    
    export let active = false;

    interface HTMLDialogElement extends HTMLElement {
        open: boolean;
        showModal(): void;
        close(): void;
    }

    let _dialogElement: HTMLElement;
    $: dialogElement = _dialogElement as HTMLDialogElement;

    $: dialogElement && onActiveChange() && active;
    function onActiveChange() {
        if (active && !dialogElement.open) dialogElement.showModal();
        if (!active && dialogElement.open) dialogElement.close();
        return true;
    }
</script>

<dialog bind:this={_dialogElement} on:close={() => (active = false)} on:close>
    <slot />
</dialog>

<style>
    dialog {
        border: none;
        background-color: transparent;
        overflow: visible;
    }
</style>
