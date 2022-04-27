<script lang="ts">
    import HakoEffects from "./HakoEffects.svelte";
</script>

<span class="chip">
    <HakoEffects />
    <span>
        <slot />
    </span>
</span>

<style>
    .chip {
        display: inline-block;
        padding: calc(var(--h-padding) * .25) calc(var(--h-padding) * .5);
    }
</style>
