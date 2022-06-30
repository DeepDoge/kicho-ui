<script context="module" lang="ts">
    import { writable } from "svelte/store";
    export const theme = writable<"dark" | "light">("light");
    theme.subscribe((mode) => typeof window !== 'undefined' && document.body.setAttribute("data-theme", mode));
</script>

<script lang="ts">
    import "../root.css";
</script>

<slot />
