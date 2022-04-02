<script lang="ts">
    import "./style.css";
    export let colorMode: "light" | "dark";
    export let colors: {
        master: string;
        slave: string;
        dark: string;
        light: string;
    };
    export let theme: string;
</script>

<div
    id="g-app"
    class="g-color-mode-{colorMode} g-theme-{theme}"
    style={Object.entries(colors)
        .map(([key, value]) => `--g-color-${key}:${value}`)
        .join(";")}
>
    <div id="g-app-content">
        <slot />
    </div>
</div>

<style>
    #g-app-content {
        isolation: isolate;
        background-color: var(--g-color-mode);
        color: var(--g-color-mode-inverse);
    }

    #g-app-content::before {
        content: "";
        position: fixed;
        inset: 0;
        background: var(--g-current-background);
        opacity: 0.3;
        z-index: -1;
        filter: blur(5em);
        transform: scale(1.2);
    }

    :global(#g-app) {
        font-size: max(1rem, min(1vw, 2vh));
        font-family: Arial, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;

        --g-transition: linear 0.2s;
        --g-border-width: 0.2em;
        --g-border-radius: 0.25em;
        --g-color-wild: linear-gradient(120deg, var(--g-color-master), var(--g-color-slave));
    }
</style>
