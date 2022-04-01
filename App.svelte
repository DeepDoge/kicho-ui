<script lang="ts">
    import Sheet from "./Sheet.svelte";

    export let colorMode: "light" | "dark";
    export let theme: string;
</script>

<div id="g-app" class="g-color-mode-{colorMode}">
    <Sheet {theme}>
        <div id="g-app-content">
            <slot />
        </div>
    </Sheet>
</div>

<style>
    #g-app-content::before {
        content: "";
        position: fixed;
        inset: 0;
        background-color: var(--g-color-mode);
        opacity: .5;
        z-index: -1;
    }
</style>
