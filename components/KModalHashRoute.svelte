<script context="module" lang="ts">
    import { page } from "$app/stores";
    import KModal from "./KModal.svelte";
</script>

<script lang="ts">
    
    type KModalProps = KModal["$$prop_def"];
    interface $$Props extends KModalProps {
        hash: string;
    }

    export let hash: $$Props["hash"];
    $: active = hash === $page.url.hash;
</script>

<KModal {...$$props} {active} preventClose on:closeattempt={() => history.back()}>
    <slot />
</KModal>
