<script context="module" lang="ts">
    import { writable } from "svelte/store";
    import KModal from "./KModal.svelte";
    let pageHash = writable(location.hash);
    window.addEventListener("hashchange", () => pageHash.set(location.hash));
</script>

<script lang="ts">
    type KModalProps = KModal["$$prop_def"];
    interface $$Props extends KModalProps {
        hash: string;
    }

    export let hash: $$Props["hash"];
    $: active = hash === $pageHash;
</script>

<KModal {...$$props} {active} preveventClose on:closeattempt={() => history.back()}>
    <slot />
</KModal>
