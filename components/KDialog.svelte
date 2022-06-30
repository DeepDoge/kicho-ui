<script context="module" lang="ts">
    import type { Writable } from "svelte/store";
    import { writable } from "svelte/store";
    import type { Colors } from "../types/style/colors";
    import KButton from "./KButton.svelte";
    import KModal from "./KModal.svelte";
    import KTextField from "./KTextField.svelte";
    type Message = string;
    type Dialog = { type: "alert" | "prompt" | "confirm"; message: Message; resolve: (data: string | boolean | null) => void; color: Colors };
    type DialogManager = ReturnType<typeof createDialogManager>;

    export interface DialogLanguage {
        confirm: string;
        cancel: string;
        apply: string;
        ok: string;
    }

    export function createDialogManager(
        language: DialogLanguage = {
            apply: "Apply",
            cancel: "Cancel",
            confirm: "Confirm",
            ok: "Ok",
        }
    ) {
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
            language,
            async alert(message: Message, color: Colors = "mode-pop") {
                const id = Math.random().toString();
                return await new Promise<void>((resolve) =>
                    add(id, {
                        message,
                        type: "alert",
                        resolve: () => {
                            resolve();
                            remove(id);
                        },
                        color,
                    })
                );
            },
            async prompt(message: Message, color: Colors = "mode-pop") {
                const id = Math.random().toString();
                return await new Promise<string | null>((resolve) =>
                    add(id, {
                        message,
                        type: "prompt",
                        resolve: (data) => {
                            resolve(data?.toString() ?? null);
                            remove(id);
                        },
                        color,
                    })
                );
            },
            async confirm(message: Message, color: Colors = "mode-pop") {
                const id = Math.random().toString();
                return await new Promise<boolean>((resolve) =>
                    add(id, {
                        message,
                        type: "confirm",
                        resolve: (data) => {
                            resolve(!!data);
                            remove(id);
                        },
                        color,
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
            currentDialog.type === "alert"
                ? "Ok"
                : currentDialog.type === "confirm"
                ? dialogManager.language.confirm
                : currentDialog.type === "prompt"
                ? dialogManager.language.confirm
                : dialogManager.language.ok);

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
            <button style="position:absolute;opacity:0;pointer-events:none" />
            {#if dialogCache?.type !== "alert"}
                <KButton color="mode-pop" on:click={() => (cancelled = true)}>{dialogManager.language.cancel}</KButton>
            {/if}
            <KButton color={dialogCache?.type === 'confirm' ? 'master' : 'mode-pop'}>{buttonText}</KButton>
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
        gap: var(--k-padding);
        grid-auto-flow: column;
        justify-content: end;
        position: sticky;
        bottom: 0;
    }
</style>
