<script lang="ts">
    export let border = false
</script>

<div class="kicho-effect kicho-glow" class:around-border={border} />

<style>
    .kicho-glow {
        position: absolute;
        inset: 0;
        filter: blur(calc(var(--glow) * .25rem)) opacity(.75);
        /* transform: scale(.95); */
        opacity: var(--glow-opacity);

        transition: var(--k-transition);
        transition-property: color, opacity, filter, transform;
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
        box-shadow: var(--k-box-shadow);
    }

    .kicho-glow.around-border::before {
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        padding: var(--border-width);
    }
</style>