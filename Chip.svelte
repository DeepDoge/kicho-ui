<script lang="ts">
    import Hako from "./Hako.svelte";
</script>

<span class="chip">
    <Hako />
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
