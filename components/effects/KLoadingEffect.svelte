<div class="loading-blur kicho-effect" />
<div class="loading kicho-effect" />

<style>
    .loading {
        position: absolute;
        inset: 0;
        overflow: hidden;
    }

    .loading::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image: linear-gradient(90deg, transparent, currentColor, transparent);
        opacity: 0.1;
        animation: loading infinite 1s linear;
        filter: blur(.5rem);
    }

    @keyframes loading {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(100%);
        }
    }

    .loading-blur {
        display: none;
        position: absolute;
        inset: 0;
        backdrop-filter: blur(.25rem);
    }
</style>
