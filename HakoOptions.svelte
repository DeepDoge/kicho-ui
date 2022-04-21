<script lang="ts">
    interface BorderOptions {
        radius: string;
        width: string;
        background: string;
    }

    interface GlowOptions {
        blur: string;
        brightness: string;
        background: string;
    }

    interface BackgroundOptions {
        background: string;
        opacity: string;
    }

    export let borderOptions: Partial<BorderOptions> = null;
    export let glowOptions: Partial<GlowOptions> = null;
    export let backgroundOptions: Partial<BackgroundOptions> = null;

    function generateStyle(options: object, prefix: string) {
        return options
            ? Object.entries(options)
                  .filter(([key, value]) => value)
                  .map(([key, value]) => `--h-${prefix}-${key.toLowerCase()}:${value}`)
                  .join(";")
            : "";
    }

    $: style = [generateStyle(borderOptions, "border"), generateStyle(glowOptions, "glow"), generateStyle(backgroundOptions, "background")].join(";");
</script>

<div class="hako-custom-options" {style}>
    <slot />
</div>

<style>
    .hako-custom-options {
        display: contents;
    }

    .hako-custom-options {
        --h-border-radius: 0.5em;
        --h-border-width: 0px;
        --h-border-background: var(--h-color-gradient-1);
    }

    .hako-custom-options {
        --h-glow-blur: 0.1em;
        --h-glow-brightness: 1;
        --h-glow-background: var(--h-border-background);
    }

    .hako-custom-options {
        --h-background: var(--h-color-mode);
        --h-background-opacity: 0.95;
    }
</style>
