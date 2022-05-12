<k-- class="loading" />

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
        opacity: 0.5;
        animation: loading infinite 1s linear;
        filter: blur(.5rem);
    }

    @keyframes loading {
        from {
            transform: translateX(-150%);
        }
        to {
            transform: translateX(150%);
        }
    }
</style>
