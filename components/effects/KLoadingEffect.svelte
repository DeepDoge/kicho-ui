<script lang="ts">
    import type { Colors } from "../../types/style/colors";

    export let color: Colors = "mode-contrast";
</script>

<k-- class="loading" style:--color="var(--k-color-{color})" />

<style>
    .loading {
        position: absolute;
        inset: 0;
        overflow: hidden;
    }

    .loading::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: var(--color);
        background-image: var(--color);
        filter: opacity(var(--k-loading-effect-opacity-animated));
        backdrop-filter: blur(0.5rem);
    }

</style>
