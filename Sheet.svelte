<script context="module" lang="ts">
    export type Colors = 'mono' | 'gradient' | 'master' | 'slave'
</script>

<script lang="ts">
    export let theme: string = null;
    export let child = false;

    export let border = false;
    export let glow = false;
    export let rounded = false;

    $: classes = [theme && `g-theme-${theme}`].filter((x) => x).join(" ");
    let className = null;
    export { className as class };
</script>

<div class="sheet {className ?? ''} {classes}" class:child class:rounded class:border class:glow>
    <div class="content">
        <slot />
    </div>
</div>

<style>
    .sheet,
    .content {
        width: 100%;
        height: 100%;
    }

    .sheet {
        position: relative;
    }

    .sheet {
        --background: var(--g-current-background);
        --color: var(--g-current-color);
        --border: var(--g-current-border-color);
        --glow: var(--g-current-glow-color);

        --child-color: var(--g-current-child-color);
        --child-background: var(--g-current-child-background);
        --child-border: var(--g-current-child-border-color);
        --child-glow: var(--g-current-child-glow-color);
    }

    .content {
        --g-current-color: var(--child-color);
        --g-current-background: var(--child-background);
        --g-current-border-color: var(--child-border);
        --g-current-glow-color: var(--child-glow);

        --g-current-child-background: var(--background);
        --g-current-child-color: var(--color);
        --g-current-child-border-color: var(--border);
        --g-current-child-glow-color: var(--glow);
    }

    .content {
        color: var(--color);
        background: var(--background);
    }

    .border.sheet {
        padding: var(--g-border-width);
        background: var(--border);
    }

    .border.glow::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--glow);
        z-index: -1;
        filter: blur(2.5em);
        transform: scale(.95);
    }

    .sheet.rounded.border,
    .sheet.rounded:not(.border) .content {
        border-radius: var(--g-border-radius);
    }
</style>
