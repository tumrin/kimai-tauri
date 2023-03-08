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

    let customersProjects: ProjectCollection[] = []
    let customersActivities: ActivityCollection[] = []
    let project: any
    let customer: any = null // Needs to be null so no customer is chosen by default
    let activity: any
    let description: any

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

<div class="timeform">
    <form on:submit={() => handleSubmit(project, activity, description)}>
        <label>Customer</label>
        <select
            bind:value={customer}
            on:change={async () => {
                customersProjects = $allProjectsStore.filter((project) => project.customer === customer)
            }}
            name="Customer"
        >
            {#each $allCustomersStore as customer}
                <option value={customer.id}>{customer.name}</option>
            {/each}
        </select>

        <label>Project</label>
        <select
            bind:value={project}
            on:change={async () => {
                console.log($allActivitiesStore)
                customersActivities = $allActivitiesStore.filter((activity) => !activity.project || activity.project === project)
                console.log(customersActivities)
            }}
            name="Project"
        >
            {#each customersProjects as project}
                <option value={project.id}>{project.name}</option>
            {/each}
        </select>

        <label>Activites</label>
        <select bind:value={activity} name="Activity">
            {#each customersActivities as activity}
                <option value={activity.id}>{activity.name}</option>
            {/each}
        </select>

        <label>Description</label>
        <textarea bind:value={description} />
        <button type="submit"
            >Start
            <Fa icon={faPlay} /></button
        >
    </form>
</div>

<style lang="scss">
    button {
        background-color: var(--timer-bt-color);
        &:hover {
            background-color: var(--timer-hover-bt-color);
        }
    }
</style>
