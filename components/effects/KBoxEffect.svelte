<script lang="ts">
    import KBackgroundEffect from "./KBackgroundEffect.svelte";
    import KBorderEffect from "./KBorderEffect.svelte";
    import KGlowEffect from "./KGlowEffect.svelte";
    import KRippleEffect from "./KRippleEffect.svelte";

    export let type: "outlined" | "filled" | "text" | "normal" = "normal";
    export let size: "normal" | "larger" | "x-larger" = "normal";
    export let glow: number = 1;
    export let color: "master" | "slave" | "error" | "mode" | "gradient" = "mode";
    export let radius: "rounded" | "tile" | "normal" = "normal";
    export let ripple = false;

    $: fontSize = size === "larger" ? "1.5em" : size === "x-larger" ? "2em" : null;
    $: borderRadius = radius === "normal" ? "var(--k-border-radius)" : radius === "rounded" ? "var(--k-border-radius-rounded)" : "0";
</script>

<div class="kicho-effect box-effect {type}" style:font-size={fontSize}>
    {#if type === "outlined"}
        <div
            style:--border-width={"var(--k-border-width)"}
            style:--border-color={`var(--k-color-${color})`}
            style:--border-radius={borderRadius}
            style:--glow={glow}
        >
            <KGlowEffect border />
            <KBorderEffect>
                <KRippleEffect disabled={!ripple} />
            </KBorderEffect>
        </div>
        <div class="content">
            <slot />
        </div>
    {:else if type === "filled"}
        <div
            style:--background="var(--k-color-{color})"
            style:--border-width={"0"}
            style:--border-color={`transparent`}
            style:--border-radius={borderRadius}
            style:--glow={glow}
        >
            <KGlowEffect />
            <KBorderEffect>
                <KBackgroundEffect />
                <KRippleEffect disabled={!ripple} />
            </KBorderEffect>
        </div>
        <div class="content" style:color="var(--k-color-{color}-contrast)">
            <slot />
        </div>
    {:else if type === "text"}
        <KRippleEffect disabled={!ripple} />
        <div class="content">
            <slot />
        </div>
    {:else if type === "normal"}
        <div
            style:--background="var(--k-color-mode)"
            style:--border-width={"var(--k-border-width)"}
            style:--border-color={`var(--k-color-${color})`}
            style:--border-radius={borderRadius}
            style:--glow={glow}
        >
            <KGlowEffect />
            <KBorderEffect>
                <KBackgroundEffect />
                <KRippleEffect disabled={!ripple} />
            </KBorderEffect>
        </div>
        <div class="content" style:color="var(--k-color-mode-contrast)">
            <slot />
        </div>
    {/if}
</div>

<style>
    .box-effect,
    .box-effect > *,
    .content {
        display: contents;
    }
</style>
