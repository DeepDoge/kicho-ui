<script context="module" lang="ts">
    import { writable } from "svelte/store";
    import type { Writable } from "svelte/store";
    type Message = string;
    type Dialog = { type: "alert" | "prompt" | "confirm"; message: Message; resolve: (data: string | boolean | null) => void };
    type DialogManager = ReturnType<typeof createDialogManager>;

    function createDialogManager() {
        const dialogs: Writable<Record<string, Dialog>> = writable(null);
        const id = crypto.randomUUID();

        function add(alert: Dialog) {
            dialogs.update((data) => ({ ...data, alert }));
        }
        function remove() {
            dialogs.update((data) => {
                delete data[id];
                return data;
            });
        }

        return {
            dialogs,
            async alert(message: Message) {
                return await new Promise<void>((resolve) =>
                    add({
                        message,
                        type: "alert",
                        resolve: () => {
                            resolve();
                            remove();
                        },
                    })
                );
            },
            async prompt(message: Message) {
                return await new Promise<string | null>((resolve) =>
                    add({
                        message,
                        type: "prompt",
                        resolve: (data) => {
                            resolve(data?.toString() ?? null);
                            remove();
                        },
                    })
                );
            },
            async confirm(message: Message) {
                return await new Promise<boolean>((resolve) =>
                    add({
                        message,
                        type: "confirm",
                        resolve: (data) => {
                            resolve(!!data);
                            remove();
                        },
                    })
                );
            },
        };
    }
</script>

<script lang="ts">
    import KButton from "./KButton.svelte";
    import KModal from "./KModal.svelte";
    import KTextField from "./KTextField.svelte";

    export let dialogManager: DialogManager;
    $: dialogs = dialogManager.dialogs;
    $: currentDialog = $dialogs?.[0] ?? null;

    let value: string;
    let cancelled: boolean;
    let buttonText: string;
    $: currentDialog && (value = null);
    $: currentDialog && (cancelled = false);
    $: currentDialog &&
        (buttonText =
            currentDialog.type === "alert" ? "Ok" : currentDialog.type === "confirm" ? "Confirm" : currentDialog.type === "prompt" ? "Apply" : "Ok");

    function onSubmit() {
        if (currentDialog.type === "confirm") currentDialog.resolve(!cancelled);
        else currentDialog.resolve(cancelled ? null : value);
    }
</script>

<KModal active={!!currentDialog} on:close={() => currentDialog?.resolve(null)}>
    <form method="dialog" on:submit|preventDefault={onSubmit}>
        <div class="fields">
            <pre>{currentDialog.message}</pre>
            {#if currentDialog.type === "prompt"}
                <KTextField type="text" bind:value />
            {/if}
        </div>
        <div class="actions">
            <!-- This is here to capture, return key -->
            <button style="position:0;opacity:0;pointer-events:none" />
            {#if currentDialog.type !== "alert"}
                <KButton on:click={() => (cancelled = true)}>Cancel</KButton>
            {/if}
            <KButton>{buttonText}</KButton>
        </div>
    </form>
</KModal>
