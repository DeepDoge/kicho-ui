<script lang="ts">
    export let minimumEmptySpace: string = '20rem';
    export let gap: string = 'var(--k-padding)';
</script>

<div class="fill-on-break" style:--break-at={minimumEmptySpace} style:--gap={gap}>
    <slot></slot>
</div>

<style>
    .fill-on-break {
        display: flex;
        flex-wrap: wrap;
        gap: var(--gap)
    }

    .fill-on-break > :global(*),
    .fill-on-break > :global(.kicho-box-root > *) {
        flex-grow: 1;
    }

    .fill-on-break::after {
        content: "";
        min-width: min(100%, var(--break-at));
        flex-grow: 1000000000000000;
    }
</style>