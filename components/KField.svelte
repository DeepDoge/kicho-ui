<script lang="ts">
    import crypto from "crypto";

    export let id: string = (typeof window !== "undefined" ? window.crypto : crypto as any).randomUUID();
    export let label: string = null;
</script>

<div class="field">
    {#if label}
        <label for={id}>{label}</label>
    {/if}
    <slot {id} {label} />
</div>

<style>
    label {
        font-size: var(--k-font-smaller);
    }
</style>
