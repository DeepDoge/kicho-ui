<script lang="ts">
    export let blur = false;
</script>

<div class="kicho-effect kicho-background" class:blur />
{#if blur}
    <div class="kicho-effect blur-color" class:blur />
{/if}

<style>
    .kicho-background {
        position: absolute;
        inset: 0;
        background: var(--background);
        opacity: var(--background-opacity);
        overflow: hidden;
    }

    .blur {
        background: transparent;
        backdrop-filter: blur(0.3rem);
    }
    .blur-color {
        position: absolute;
        inset: 0;
        background: var(--background);
        opacity: var(--background-opacity);
        filter: opacity(0.85)
    }
</style>
