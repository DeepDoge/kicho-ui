<script lang="ts">
    type Component = any;

    interface Parameters {
        key: string;
        component: Component;
        props: Record<string, any>;
    }

    export let value: Parameters;
    let cache: Record<string, Parameters>;

    $: value && onChange();
    function onChange() {
        if (!value.key) return
        cache = { ...cache, [value.key]: value };
        console.log(cache)
    }

    $: keys = cache ? Object.keys(cache) : [];
</script>

{#each keys as key (key)}
    <div style:display={value.key === key ? "block" : "none"}>
        <svelte:component this={cache[key].component} {...cache[key].props} />
    </div>
{/each}
