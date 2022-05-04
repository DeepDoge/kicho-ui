<script lang="ts">
    export let border = false
</script>

<div class="kicho-effect kicho-glow" class:around-border={border} />

<style>
    .kicho-glow {
        position: absolute;
        inset: 0;
        filter: blur(0.25rem);
    }
    .kicho-glow::before {
        content: "";
    }
    .kicho-glow::before {
        position: absolute;
        inset: 0;
        background-color: var(--glow-color);
        background-image: var(--glow-color);
        border-radius: var(--border-radius);
    }

    .kicho-glow.around-border::before {
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        padding: var(--border-width);
    }
</style>