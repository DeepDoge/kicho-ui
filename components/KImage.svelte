<script lang="ts">
    interface Source {
        src: string;
        media: {
            type: "bigger than" | "smaller than";
            size: number;
        };
    }

    export let src: string | Source[];
    export let alt: string;
    let eager = false;

    let sources: Source[];
    $: sources =
        typeof src === "string"
            ? [
                  {
                      src,
                      media: { type: "bigger than", size: 0 },
                  },
              ]
            : src;
</script>

<picture>
    {#each sources as source}
        <source media="({source.media.type === 'bigger than' ? 'min' : 'max'}-width:{source.media.size}px}" srcset={source.src} />
    {/each}
    <img {alt} loading={eager ? "eager" : "lazy"} on:loadstart on:loadeddata on:loadedmetadata on:load />
</picture>

<style>
    img {
        display: block;
        max-width: 100%;
        color: transparent;
        overflow: hidden;
    }
</style>
