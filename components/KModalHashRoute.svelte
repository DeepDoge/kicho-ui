<script context="module" lang="ts">
    import { writable } from "svelte/store";
    let pageHash = writable(location.hash);
    window.addEventListener('hashchange', () => pageHash.set(location.hash))
</script>

<script lang="ts">
    import KModal from "./KModal.svelte";

    export let hash: string;
    $: active = hash === $pageHash
</script>

<KModal {active} preveventClose on:closeattempt={() => history.back()}>
    <slot />
</KModal>
