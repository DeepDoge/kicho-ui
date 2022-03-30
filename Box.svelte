<script lang="ts">
    export let type: "border" | "tag" = "border";
    let className: string = null;
    export { className as class };
</script>

<div class="box type-{type} {className}">
    <slot />
</div>

<style>
    .box {
        --border-size: 0.2em;
        --border-radius: var(--g-border-radius);
        position: relative;
        padding: var(--border-size);
    }

    .box:hover {
        filter: brightness(1.1);
    }

    .box:active {
        filter: brightness(1.5);
    }

    .type-tag.box {
        --border-size: 0.2em;
        --border-radius: 0;
    }

    .type-tag.box::before,
    .type-tag.box::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: var(--border-radius);
        background: var(--g-border-background);
        clip-path: polygon(
            0 0,
            50% 0,
            50% var(--border-size),
            var(--border-size) var(--border-size),
            var(--border-size) 50%,
            0 50%,
            0 0,
            50% 100%,
            100% 100%,
            100% 50%,
            calc(100% - var(--border-size)) 50%,
            calc(100% - var(--border-size)) calc(100% - var(--border-size)),
            50% calc(100% - var(--border-size)),
            50% 100%
        );
        z-index: -1;
    }

    .type-tag.box::after {
        inset: calc(var(--border-size) / 3);
        opacity: .5;
        transition: var(--g-transition);
        transition-property: inset;
    }
    .type-tag.box:hover::after
    {
        inset: calc(var(--border-size) * 1.5);
    }

    .type-border.box::after {
        content: "";
        position: absolute;
        inset: var(--border-size);
        border-radius: var(--border-radius);
        background: var(--g-background);
        z-index: -1;
    }

    .type-border.box::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: var(--border-radius);
        background: var(--g-border-background);
        z-index: -1;
    }
</style>
