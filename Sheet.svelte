<script lang="ts">
    export let theme: string = null;
    export let child = false;

    export let color: string = null
    export let background: string = null

    $: style = [
        color && `--color:${color}`,
        background && `--background:${background}`
    ].filter((x) => x).join(";");

    $: classes = [theme && `g-theme-${theme}`].filter((x) => x).join(" ");
    let className = null;
    export { className as class };
</script>

<div class="sheet {className ?? ''} {classes}" class:child {style}>
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

    .sheet:not(.child) {
        --background: var(--g-current-background);
        --color: var(--g-current-color);
        --child-color: var(--g-current-child-color);
        --child-background: var(--g-current-child-background);
    }
    .sheet.child {
        --background: var(--g-current-child-background);
        --color: var(--g-current-child-color);
        --child-color: var(--g-current-color);
        --child-background: var(--g-current-background);
    }

    .sheet {
        position: relative;
        isolation: isolate;
    }

    .sheet::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--background);
        z-index: -1;

        opacity: 0.95;
    }

    .content {
        --g-current-color: var(--child-color);
        --g-current-background: var(--child-background);
        --g-current-child-background: var(--background);
        --g-current-child-color: var(--color);

        color: transparent;
        background: var(--color);
        background-clip: text;
        -webkit-background-clip: text;
    }
</style>
