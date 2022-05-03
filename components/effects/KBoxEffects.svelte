<div class="kicho-effect glow" />
<div class="kicho-effect background" />
<div class="kicho-effect border" />

<style>
    .kicho-effect {
        animation: var(--k-gradient-animation);
    }

    .kicho-effect,
    .kicho-effect::before {
        position: absolute;
        box-sizing: content-box;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: solid 0 transparent;
        border-width: inherit;
        border-radius: inherit;
        background-origin: border-box;
    }

    .glow {
        filter: blur(0.25em);
    }
    .glow::before {
        content: "";
    }

    .border,
    .glow::before {
        background-image: var(--border-color);
        background-color: var(--border-color);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        transform: translate(-50%, -50%) scale(1.01);
    }

    .background {
        background: inherit;
    }
</style>
