<script lang="ts">
    export let blur = false
</script>

<div class="kicho-effect kicho-background" class:blur />

<style>
    .kicho-background {
        position: absolute;
        inset: 0;
        background: var(--background);
        opacity: var(--background-opacity);
        overflow: hidden;
    }

    .blur {
        background: unset;
        backdrop-filter: blur(.25rem);
    }
    .blur::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--background);
        filter: opacity(.4);
    }
</style>