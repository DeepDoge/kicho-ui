<script context="module" lang="ts">
    import { page } from "$app/stores";
    import KModal from "./KModal.svelte";
</script>

<script lang="ts">
import { goto } from "$app/navigation";

    
    type KModalProps = KModal["$$prop_def"];
    interface $$Props extends KModalProps {
        hash: string;
    }

    export let hash: $$Props["hash"];
    $: active = hash === $page.url.hash;
</script>

<KModal {...$$props} {active} preventClose on:closeattempt={() => history.length > 1 ? history.back() : goto($page.url.pathname, { replaceState: true })}>
    <slot />
</KModal>
