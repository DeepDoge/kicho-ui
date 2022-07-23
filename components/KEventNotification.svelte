<script context="module" lang="ts">
    import { writable, type Writable } from "svelte/store";
    import type { Colors } from "../types/style/colors";
    import KButton from "./KButton.svelte";

    type Message = string;
    type Notification = { message: Message; id: string; color: Colors; close: () => void };
    type EventNotificationManager = ReturnType<typeof createEventNotificationManager>;

    export const globalEventNotificationManager = createEventNotificationManager();

    export interface EventNotificationsLanguage {}

    export function createEventNotificationManager(language: EventNotificationsLanguage = {}) {
        const notifications: Writable<Record<string, Notification>> = writable({});

        function add(notification: Notification) {
            notifications.update((data) => ({ ...data, [notification.id]: notification }));
        }
        function remove(id: string) {
            notifications.update((data) => {
                delete data[id];
                return { ...data };
            });
        }

        return {
            notifications,
            language,
            async append(message: Message, color: Colors = "master") {
                const id = Math.random().toString();
                add({
                    id,
                    message,
                    color,
                    close() {
                        remove(id);
                    },
                });
                setTimeout(() => remove(id), 5000)
            },
        };
    }
</script>

<script lang="ts">
    export let eventNotificationManager: EventNotificationManager;
    $: notifications = eventNotificationManager.notifications;
    $: notificationsArray = Object.values($notifications);
</script>

<div class="notifications" class:empty={notificationsArray.length === 0}>
    <div class="list">
        {#each notificationsArray as notification, i (notification.id)}
            <div class="notification">
                <KButton color={notification.color} title={notification.message}>
                    <div class="notification-inner">
                        <div class="k-text-singleline">
                            <span>{notification.message}</span>
                        </div>
                        <div class="close" on:click={notification.close} />
                    </div>
                </KButton>
            </div>
        {/each}
    </div>
</div>

<style>
    .notifications {
        position: fixed;
        bottom: calc(var(--k-padding) * 2);
        right: calc(var(--k-padding) * 2);
        transform: translateX(0) translateY(0);

        transition: var(--k-transition);
        transition-property: transform, filter;
        filter: opacity(1);

        z-index: var(--k-z-index-overlay);
    }

    .empty {
        transform: translateX(0) translateY(150%);
        filter: opacity(0);
    }

    .list {
        width: 20em;
        display: grid;
        gap: calc(var(--k-padding) * 2);
        background-color: var(--k-color-mode);
        padding: calc(var(--k-padding) * 2);
        border-radius: var(--k-border-radius-rounded);
    }

    .notification {
        display: grid;
        gap: calc(var(--k-padding) * 2);
    }

    .notification-inner {
        width: 100%;
        font-size: var(--k-font-normal);
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        gap: 0.5ch;
    }

    .close {
        width: 1.5ch;
        aspect-ratio: 1/1;
    }

    .close::before,
    .close::after {
        content: "";
        position: absolute;
        width: 0;
        top: 0;
        left: 50%;
        bottom: 0;
        border-left: .2ch solid currentColor;
        transform: translateX(-50%) rotate(45deg);
    }

    .close::after {
        transform: translateX(-50%) rotate(-45deg);
    }
</style>
