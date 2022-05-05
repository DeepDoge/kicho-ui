<script lang="ts">
    import KBackgroundEffect from "./KBackgroundEffect.svelte";
    import KBorderEffect from "./KBorderEffect.svelte";
    import KGlowEffect from "./KGlowEffect.svelte";
    import KRippleEffect from "./KRippleEffect.svelte";

    export let color: "master" | "slave" | "error" | "mode" | "gradient" = "mode";
    export let border: typeof color = 'gradient'
    export let rounded = false;
    export let ripple = false;
</script>

<div
    class="kicho-effect box-effect"
    style:--background="var(--k-color-{color})"
    style:--text-color="var(--k-color-{color}-contrast)"
    style:--border-width={border ? 'var(--k-border-width)' : '0'}
    style:--border-color="var(--k-color-{border}"
    style:--border-radius={rounded ? "var(--k-border-radius-rounded)" : "var(--k-border-radius)"}
>
    <KGlowEffect />
    <KBackgroundEffect />
    <KBorderEffect />
    {#if ripple}
        <KRippleEffect />
    {/if}
</div>

<style>
    .box-effect {
        display: contents;
    }

    .box-effect ~ :global(*)
    {
        color: var(--text-color)
    }
</style>
