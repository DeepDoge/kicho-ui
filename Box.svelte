<script lang="ts">
    export let theme: string = null;
    export let child = false;

    export let border = false;
    export let glow = false;
    export let rounded = false;
    export let invert = false;
    export let fit = false;

    $: classes = [theme && `g-theme-${theme}`].filter((x) => x).join(" ");
    let className = null;
    export { className as class };
</script>

<div class="box {className ?? ''} {classes}" class:invert class:child class:rounded class:border class:glow class:fit>
    <div class="content">
        <slot />
    </div>
</div>

<style>
    .box,
    .box > .content {
        width: 100%;
        height: 100%;
    }

    .fit.box,
    .fit.box > .content {
        width: auto;
        width: fit-content;
    }

    .box {
        --background: var(--g-current-background);
        --color: var(--g-current-color);
        --border: var(--g-current-border-color);
        --glow: var(--g-current-glow-color);

        --child-color: var(--g-current-child-color);
        --child-background: var(--g-current-child-background);
        --child-border: var(--g-current-child-border-color);
        --child-glow: var(--g-current-child-glow-color);
    }

    .box.invert {
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

    .box,
    .content,
    .content > :global(*) {
        position: relative;
    }

    .content {
        width: 100%;
        height: 100%;
        color: var(--color);

        overflow: hidden;
    }
    .content::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--background);
        opacity: 0.8;
    }

    .border.box {
        padding: var(--g-border-width);
        background: var(--border);
        opacity: 0.8;
    }

    .rounded.border,
    .rounded:not(.border) > .content::before,
    .rounded .content {
        border-radius: var(--g-border-radius);
    }

    .glow.box::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--glow);
        filter: blur(1em);
    }
</style>
