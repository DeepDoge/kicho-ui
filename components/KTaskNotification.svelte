<script context="module" lang="ts">
    import { writable, type Writable } from "svelte/store";
    import KButton from "./KButton.svelte";
    type Message = string;
    type Task = { message: Message; id: string; state: State };
    type TaskNotificationManager = ReturnType<typeof createTaskNotificationManager>;
    type State = "loading" | "done" | "failed";

    export const globalTaskNotificationManager = createTaskNotificationManager();

    export interface DialogLanguage {
        pending: string;
    }

    export function createTaskNotificationManager(
        language: DialogLanguage = {
            pending: "Pending",
        }
    ) {
        const tasks: Writable<Record<string, Task>> = writable({});

        function add(task: Task) {
            tasks.update((data) => ({ ...data, [task.id]: task }));
        }
        function remove(id: string) {
            tasks.update((data) => {
                delete data[id];
                return { ...data };
            });
        }

        return {
            tasks,
            language,
            async append<T>(promise: Promise<T>, message: Message) {
                const id = Math.random().toString();
                return await new Promise<T>(async (resolve, reject) => {
                    add({ id, message, state: "loading" });
                    try {
                        await promise;
                        tasks.update((tasks) => {
                            tasks[id].state = "done";
                            return { ...tasks };
                        });
                        resolve(await promise);
                    } catch (error) {
                        tasks.update((tasks) => {
                            tasks[id].state = "failed";
                            return { ...tasks };
                        });
                        reject(error);
                    }
                    setTimeout(() => remove(id), 1500);
                });
            },
        };
    }
</script>

<script lang="ts">
    import KHoverMenu from "./KHoverMenu.svelte";
    import KSpinner from "./KSpinner.svelte";

    export let taskNotificationManager: TaskNotificationManager;
    $: tasks = taskNotificationManager.tasks;
    $: tasksArray = Object.values($tasks);
</script>

<div class="tasks" class:empty={tasksArray.length === 0}>
    <KButton color="mode-pop" glow="gradient" radius="fab">
        <div class="counter">
            <KSpinner /> Pending: {tasksArray.length}
        </div>
    </KButton>
    <KHoverMenu>
        <div class="menu">
            {#each tasksArray as task, i (task.id)}
                <div class="task">
                    <KSpinner />
                    <KButton color="mode-pop" title={task.message}>
                        <div class="task-inner">
                            #{i}:
                            <i class="k-text-singleline">
                                <span>{task.message}</span>
                            </i>
                        </div>
                    </KButton>
                </div>
            {/each}
        </div>
    </KHoverMenu>
</div>

<style>
    .tasks {
        position: fixed;
        top: calc(var(--k-padding) * 2);
        left: 50%;
        transform: translateX(-50%) translateY(0);

        transition: var(--k-transition);
        transition-property: transform, filter;
        filter: opacity(1);

        z-index: 1;
    }

    .empty {
        transform: translateX(-50%) translateY(-150%);
        filter: opacity(0);
    }

    .counter {
        display: grid;
        align-items: center;
        grid-auto-flow: column;
        gap: calc(var(--k-padding) * 2);
    }

    .menu {
        width: 30em;
        display: grid;
        gap: calc(var(--k-padding) * 2);
        background-color: var(--k-color-mode);
        padding: calc(var(--k-padding) * 2);
        border-radius: var(--k-border-radius-rounded);
    }

    .task {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: calc(var(--k-padding) * 2);
    }

    .task-inner {
        width: 100%;
        font-size: var(--k-font-larger);
        display: grid;
        grid-template-columns: auto auto 1fr;
        justify-content: start;
        gap: 0.5ch;
    }
</style>
