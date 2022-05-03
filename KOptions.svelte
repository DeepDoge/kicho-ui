<script context="module" lang="ts">
    import "./root.css"
    export type KBoxTemplate = "outlined" | "filled" | "glow-only" | "text";
</script>

<script lang="ts">
    export let template: KBoxTemplate = "filled";
</script>

<div class="kicho-box-options {template}" />

<style>
    .kicho-box-options {
        display: contents;
    }
</style>
