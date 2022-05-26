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
        background-color: var(--k-color-mode-contrast);
        animation: loading infinite 1s ease-in-out alternate;
        backdrop-filter: blur(0.5rem);
    }

    @keyframes loading {
        from {
            filter: opacity(0);
        }
        to {
            filter: opacity(0.25);
        }
    }
</style>
