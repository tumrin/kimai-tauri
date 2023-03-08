<script lang="ts">
    import { Duration, DateTime } from 'luxon'
    import { initialInfoStore, timerStartedStore, timesheetEntityStore, timesheetStore } from '$lib/stores/timesheet'
    import { allActivitiesStore, allProjectsStore } from '$lib/stores/customers'
    import { stopTimer } from '$lib/apiFetchers/timesheets'
    import type { InitialTimerInfo, TimesheetCollectionExpanded, TimesheetEntity } from '$lib/types'
    import { errorStore } from '$lib/stores/error'
    import { ApiRequests, pendingRequestStore } from '$lib/stores/user'
    import Fa from 'svelte-fa'
    import { faStop } from '@fortawesome/free-solid-svg-icons'
    export let startTime: any

    let duration: Duration

    setInterval(() => {
        duration = Duration.fromMillis(DateTime.now().toMillis() - DateTime.fromISO(startTime).toMillis())
    }, 1000)

    const handleStop = () => {
        stopTimer($timesheetStore.id || $timesheetEntityStore.id)
            .then(() => {
                $initialInfoStore = {} as InitialTimerInfo
                $timesheetStore = {} as TimesheetCollectionExpanded
                $timesheetEntityStore = {} as TimesheetEntity
            })
            .catch((error) => {
                $errorStore = error
                $timerStartedStore = true
            })
            .finally(() => pendingRequestStore.set($pendingRequestStore.filter((request) => request !== ApiRequests.StopTimer)))
        $timerStartedStore = false
    }
</script>

<div class="timer">
    <h1>
        {$timesheetStore.project?.name ||
            $allProjectsStore.find((project) => project.id === $timesheetEntityStore.project || project.id === $initialInfoStore.project)?.name}
    </h1>
    <h2>
        {$timesheetStore.activity?.name ||
            $allActivitiesStore.find((activity) => activity.id === $timesheetEntityStore.activity || activity.id === $initialInfoStore.activity)?.name}
    </h2>
    <h3>{$timesheetStore.description || $timesheetEntityStore.description || $initialInfoStore.description}</h3>
    <h2>{duration?.toFormat('hh:mm:ss') ?? Duration.fromMillis(0).toFormat('hh:mm:ss')}</h2>
    <button on:click={handleStop}
        >Stop
        <Fa icon={faStop} />
    </button>
</div>

<style lang="scss">
    .timer {
        justify-content: flex-end;

        button {
            background-color: var(--timer-bt-color);
            &:hover {
                background-color: var(--timer-hover-bt-color);
            }
        }
    }
</style>
