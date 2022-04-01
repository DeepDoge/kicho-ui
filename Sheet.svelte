<script lang="ts">
    export let theme: string = null;
    export let child = false;

    export let border = false;
    export let glow = false;
    export let rounded = false;
    export let invert = false

    $: classes = [theme && `g-theme-${theme}`].filter((x) => x).join(" ");
    let className = null;
    export { className as class };
</script>

<div class="sheet {className ?? ''} {classes}" class:invert class:child class:rounded class:border class:glow>
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
        --background: var(--g-current-background);
        --color: var(--g-current-color);
        --border: var(--g-current-border-color);
        --glow: var(--g-current-glow-color);

        --child-color: var(--g-current-child-color);
        --child-background: var(--g-current-child-background);
        --child-border: var(--g-current-child-border-color);
        --child-glow: var(--g-current-child-glow-color);
    }

    .sheet.invert {
        --background: var(--g-current-child-background);
        --color: var(--g-current-child-color);
        --border: var(--g-current-child-border-color);
        --glow: var(--g-current-child-glow-color);

        --child-color: var(--g-current-color);
        --child-background: var(--g-current-background);
        --child-border: var(--g-current-border-color);
        --child-glow: var(--g-current-glow-color);
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

    .sheet, .content, .content > :global(*) {
        position: relative;
    }

    .content {
        color: var(--color);
    }
    .content::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--background);
    }

    .border.sheet {
        padding: var(--g-border-width);
        background: var(--border);
    }

    .rounded.border,
    .rounded:not(.border) > .content::before{
        border-radius: var(--g-border-radius);
    }

    .glow.sheet::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--glow);
        filter: blur(1em);
    }
</style>
