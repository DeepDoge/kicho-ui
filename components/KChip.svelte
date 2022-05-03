<script lang="ts">
    import KBoxEffects from "./effects/KBoxEffects.svelte";
</script>

<span class="chip">
    <KBoxEffects />
    <span>
        <slot />
    </span>
</span>

<style>
    .chip {
        display: inline-block;
        padding: calc(var(--k-padding) * .25) calc(var(--k-padding) * .5);
    }
</style>
