<script lang="ts">
    import "../root.css";

    export let type: "filled" | "outlined" | "borderless" | "normal" = "normal";

    export let hoverable = false;
</script>

<div class="kicho-box" class:hoverable {type}>
    <div class="glow" />
    <div class="box">
        <div class="background" />
        <div class="border" />
    </div>
    <div class="content">
        <slot />
    </div>
</div>

<style>
    .kicho-box {
        display: contents;
    }
    .kicho-box {
        --background: var(--k-color-mode);
        --text-color: var(--k-color-mode-inverse);
        --border-color: var(--k-color-gradient);
        --border-width: var(--k-padding);
    }
    .content {
        color: var(--text-color);
        padding: var(--border-width);
    }
    .content > :global(*) {
        --background: unset;
        --border-color: unset;
        --border-width: unset;
    }


    .kicho-box,
    .kicho-box > .glow,
    .kicho-box > .glow::before,
    .kicho-box > .box,
    .kicho-box > .content {
        border-radius: inherit;
    }

    .kicho-box > *:not(.content) {
        position: absolute;
        inset: 0;
        transition: var(--k-transition);
        transition-property: filter, opacity, padding, border-radius;
    }
    .glow {
        filter: blur(0.25em);
    }
    .glow::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: var(--border-color);
        background-image: var(--border-color);
        border-radius: inherit;
    }
    .box {
        overflow: hidden;
    }
    .box > * {
        position: absolute;
        inset: 0;
    }
    .box > .background {
        background-color: var(--background);
        background-image: var(--background);
    }

    .box > .border {
        background-color: var(--border-color);
        background-image: var(--border-color);
    }
    .kicho-box:not([type="filled"]):not([type="borderless"]) .box > .border,
    .kicho-box:not([type="filled"]):not([type="borderless"]) .glow::before {
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        padding: var(--border-width);
    }

    [type="borderless"] {
        --border-width: 0;
    }
    [type="borderless"] .border {
        opacity: 0;
    }

    [type="filled"] {
        --border-width: 0;
        --background: var(--k-color-gradient);
        --text-color: var(--k-color-gradient-contrast);
    }
    [type="filled"] .border {
        opacity: 0;
    }

    [type="outlined"] {
        --text-color: inherit;
    }
    [type="outlined"] .background {
        opacity: 0;
    }

    .kicho-box.hoverable:hover .box {
        filter: brightness(1.1);
    }
    .kicho-box.hoverable:hover .glow {
        filter: blur(0.3em);
    }
</style>
