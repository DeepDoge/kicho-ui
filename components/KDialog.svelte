<script context="module" lang="ts">
    import type { Writable } from "svelte/store";
    import { writable } from "svelte/store";
    import KButton from "./KButton.svelte";
    import KModal from "./KModal.svelte";
    import KTextField from "./KTextField.svelte";
    type Message = string;
    type Dialog = { type: "alert" | "prompt" | "confirm"; message: Message; resolve: (data: string | boolean | null) => void };
    type DialogManager = ReturnType<typeof createDialogManager>;

    export function createDialogManager() {
        const dialogs: Writable<Record<string, Dialog>> = writable({});

        function add(id: string, alert: Dialog) {
            dialogs.update((data) => ({ ...data, [id]: alert }));
        }
        function remove(id: string) {
            dialogs.update((data) => {
                delete data[id];
                return { ...data };
            });
        }

        return {
            dialogs,
            async alert(message: Message) {
                const id = crypto.randomUUID();
                return await new Promise<void>((resolve) =>
                    add(id, {
                        message,
                        type: "alert",
                        resolve: () => {
                            resolve();
                            remove(id);
                        },
                    })
                );
            },
            async prompt(message: Message) {
                const id = crypto.randomUUID();
                return await new Promise<string | null>((resolve) =>
                    add(id, {
                        message,
                        type: "prompt",
                        resolve: (data) => {
                            resolve(data?.toString() ?? null);
                            remove(id);
                        },
                    })
                );
            },
            async confirm(message: Message) {
                const id = crypto.randomUUID();
                return await new Promise<boolean>((resolve) =>
                    add(id, {
                        message,
                        type: "confirm",
                        resolve: (data) => {
                            resolve(!!data);
                            remove(id);
                        },
                    })
                );
            },
        };
    }
</script>

<script lang="ts">
    export let dialogManager: DialogManager;
    $: dialogs = dialogManager.dialogs;
    $: currentDialog = Object.values($dialogs)?.[0] ?? null;
    let dialogCache: typeof currentDialog;
    $: currentDialog && (dialogCache = currentDialog);

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

<KModal align="end" active={!!currentDialog} on:close={() => currentDialog?.resolve(null)}>
    <form method="dialog" on:submit|preventDefault={onSubmit}>
        <div class="fields">
            <pre class="k-text-multiline">{dialogCache?.message}</pre>
            {#if dialogCache?.type === "prompt"}
                <KTextField type="text" bind:value />
            {/if}
        </div>
        <div class="actions">
            <!-- This is here to capture, return key -->
            <button style="position:0;opacity:0;pointer-events:none" />
            {#if dialogCache?.type !== "alert"}
                <KButton on:click={() => (cancelled = true)}>Cancel</KButton>
            {/if}
            <KButton>{buttonText}</KButton>
        </div>
    </form>
</KModal>

<style>
    form {
        display: grid;
        gap: var(--k-padding);
    }

    pre {
        white-space: pre-wrap;
    }
    .actions {
        display: grid;
        grid-auto-flow: row;
        position: sticky;
        bottom: 0;
    }
</style>
