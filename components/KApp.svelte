<script context="module" lang="ts">
    import { writable } from "svelte/store";
    export const theme = writable<"dark" | "light">(
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    );
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
        theme.set(event.matches ? "dark" : "light");
    });
    theme.subscribe((mode) => typeof window !== "undefined" && document.body.setAttribute("data-theme", mode));
</script>

<script lang="ts">
    import "../root.css";
</script>

<slot />
