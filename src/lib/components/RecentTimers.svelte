<script lang="ts">
    import { restartTimer } from '$lib/apiFetchers/timesheets'
    import { errorStore } from '$lib/stores/error'
    import { initialInfoStore, recentTimesheetStore, timerStartedStore, timesheetEntityStore } from '$lib/stores/timesheet'
    import { ApiRequests, pendingRequestStore } from '$lib/stores/user'
    import type { InitialTimerInfo } from '$lib/types'
    import { faUndo } from '@fortawesome/free-solid-svg-icons'
    import Fa from 'svelte-fa'
    import { fly } from 'svelte/transition'

    const handleRestart = (id?: number) => {
        if (id) {
            let recent = $recentTimesheetStore.find((timesheet) => timesheet.id === id)
            $initialInfoStore = ({
                project: recent?.project.id,
                activity: recent?.activity.id,
                description: recent?.description,
            } || {}) as InitialTimerInfo
            restartTimer(id)
                .then((timer) => {
                    $timesheetEntityStore = timer
                })
                .catch((error) => errorStore.set(error))
                .finally(() => pendingRequestStore.set($pendingRequestStore.filter((request) => request !== ApiRequests.RestartTimer)))
            $timerStartedStore = true
        }
    }
</script>

{#if $recentTimesheetStore.length > 0}
    <div class="recent-timesheet-container" in:fly={{ y: 100, duration: 500 }}>
        <h1>Recent timers</h1>
        {#each $recentTimesheetStore as timesheet}
            <div class="recent-timesheet">
                <h3>{timesheet.project.name || ''}</h3>
                <h4>{timesheet.activity.name || ''}</h4>
                <p>{timesheet.description || ''}</p>
                <button on:click={() => handleRestart(timesheet.id)}><Fa icon={faUndo} size="2x" /></button>
            </div>
        {/each}
    </div>
{/if}

<style lang="scss">
    .recent-timesheet-container {
        width: 100%;
        margin-top: 3vh;
    }
    .recent-timesheet {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 0.25fr;
        border-style: solid;
        text-align: center;
        border-radius: 8px;
        border: 1px solid;
        margin-top: 1vh;
        margin-bottom: 1vh;
        h3,
        p,
        h4 {
            display: inline-flex;
            flex-direction: column;
            align-self: center;
        }
    }
</style>
