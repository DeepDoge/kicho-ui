<script context="module" lang="ts">
    import { writable } from "svelte/store";
    import KModal from "./KModal.svelte";

    const currentHash = writable("");
    if (typeof window !== "undefined") {
        currentHash.set(location.hash)
        window.addEventListener("hashchange", () => currentHash.set(location.hash));
    }
</script>

<script lang="ts">
    type KModalProps = KModal["$$prop_def"];
    interface $$Props extends KModalProps {
        hash: string;
    }

    export let hash: $$Props["hash"];
    $: active = hash === $currentHash;
</script>

<KModal {...$$props} {active} preventClose on:closeattempt={() => history.back()}>
    <slot />
</KModal>
