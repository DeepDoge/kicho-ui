<script lang="ts">
    import "../root.css";

    export let type: "filled" | "outlined" | "borderless" = "filled";

    export let hoverable = false;
</script>

<div class="kicho-box" class:hoverable {type} />
<div class="kicho-box-effect glow" />
<div class="kicho-box-effect background" />
<div class="kicho-box-effect border" />
<div class="content">
    <slot />
</div>

<style>
    .kicho-box ~ * {
        --border-color: var(--k-color-gradient);
        --border-width: var(--k-padding);
    }
    .kicho-box[type="borderless"] ~ * {
        --border-color: transparent;
        --border-width: 0
    }
    .content {
        border: solid var(--border-width) transparent;
        border-radius: inherit;
    }

    .kicho-box-effect,
    .kicho-box-effect::before {
        position: absolute;
        inset: 0;
        border: solid var(--border-width) transparent;
        border-radius: inherit;
        background-origin: border-box !important;

        transition: var(--k-transition);
        transition-property: filter, opacity;
    }

    .glow {
        --blur: 0.25em;
        filter: blur(var(--blur));
    }

    .border,
    .glow {
        background-image: var(--border-color);
        background-color: var(--border-color);
    }

    .background {
        background: inherit;
    }

    .kicho-box[type="filled"] ~ .glow::before,
    .kicho-box[type="borderless"] ~ .glow {
        background: inherit;
    }

    .kicho-box[type="outlined"] ~ .border,
    .kicho-box[type="outlined"] ~ .glow {
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
    }

    .kicho-box[type="borderless"] ~ .border {
        opacity: 0;
    }

    .kicho-box.hoverable:hover {
        filter: brightness(1.1);
    }
    .kicho-box.hoverable:hover ~ .glow {
        --blur: 0.3em;
    }
</style>
