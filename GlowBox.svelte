<script lang="ts">
    import Sheet from "./Sheet.svelte";

    export let colorMode: "dark" | "light" = null;
    export let noSheet = false;
    export let noBackground = false;
</script>

<div class="g-box g-color-mode-{colorMode}" class:no-background={noBackground}>
    {#if noSheet}
        <slot />
    {:else}
        <Sheet>
            <slot />
        </Sheet>
    {/if}
</div>