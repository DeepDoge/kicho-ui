<script lang="ts">
    export let id: string = Math.random().toString();;
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

    .field {
        display: grid;
        gap: var(--k-padding)
    }
</style>
