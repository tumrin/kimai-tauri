<script lang="ts">
    import type { ActivityCollection, ProjectCollection } from '$lib/types'
    import { allActivitiesStore, allCustomersStore, allProjectsStore } from '$lib/stores/customers'
    import { initialInfoStore, timerStartedStore, timesheetEntityStore } from '$lib/stores/timesheet'
    import { ApiRequests, notificationPermissionStore, pendingRequestStore, userStore } from '$lib/stores/user'
    import { goto } from '$app/navigation'
    import { createTimesheet } from '$lib/apiFetchers/timesheets'
    import { sendNotification } from '@tauri-apps/api/notification'
    import { errorStore } from '$lib/stores/error'
    import Fa from 'svelte-fa'
    import { faPlay } from '@fortawesome/free-solid-svg-icons'
    import Select from 'svelte-select'

    interface SelectorItem {
        label: string
        value: number
    }

    let customersProjects: ProjectCollection[] = []
    let customersActivities: ActivityCollection[] = []
    let project: SelectorItem
    let customer: SelectorItem | null = null // Needs to be null so no customer is chosen by default
    let activity: SelectorItem
    let description: string

    const handleSubmit = (project: number, activity: number, description: string) => {
        if (!$userStore) {
            goto('/login')
            return
        }

        initialInfoStore.set({ project, activity, description })

        createTimesheet(project, activity, description, $userStore.id)
            .then((timesheet) => {
                $timesheetEntityStore = timesheet
                if ($notificationPermissionStore) {
                    sendNotification('Timer started')
                }
            })
            .catch((error) => errorStore.set(error))
            .finally(() => pendingRequestStore.set($pendingRequestStore.filter((request) => request !== ApiRequests.CreateTimer)))

        $timerStartedStore = true
    }
</script>

<div class="timeform selector">
    <form on:submit={() => handleSubmit(project.value, activity.value, description)}>
        <label>Customer</label>
        <Select
            bind:value={customer}
            on:change={async () => {
                customersProjects = $allProjectsStore.filter((project) => project.customer === customer?.value)
            }}
            items={$allCustomersStore.map((customer) => {
                return { label: customer.name, value: customer.id }
            })}
        />

        <label>Project</label>
        <Select
            bind:value={project}
            on:change={async () => {
                customersActivities = $allActivitiesStore.filter((activity) => !activity.project || activity.project === project.value)
            }}
            name="Project"
            items={customersProjects.map((project) => {
                return { label: project.name, value: project.id }
            })}
        />

        <label>Activites</label>
        <Select
            bind:value={activity}
            items={customersActivities.map((activity) => {
                return { label: activity.name, value: activity.id }
            })}
        />

        <label>Description</label>
        <input type="text" bind:value={description} />

        <button type="submit"
            >Start
            <Fa icon={faPlay} /></button
        >
    </form>
</div>

<style lang="scss">
    .selector {
        --item-color: black;
        --item-hover-bg: var(--main-hover-bt-color);
        --clear-icon-color: black;
        --input-color: black;
        --selected-item-color: black;
        --item-is-active-bg: var(--main-bt-color);
        --border-focused: var(main-bt-color);
        input {
            background-color: white;
            color: black;
            &:focus {
                box-shadow: 0 0 0 1px var(--main-bt-color);
            }
        }
    }
    button {
        background-color: var(--timer-bt-color);
        &:hover {
            background-color: var(--timer-hover-bt-color);
        }
    }
</style>
