<script lang="ts">
  import { invoke } from '@tauri-apps/api/tauri'
  import { onMount } from 'svelte'
  import { apiKey, username, apiUrl } from '$lib/stores/apiKey'
  import { userStore } from '$lib/stores/user'
  import { recentTimesheetStore, timesheetEntityStore, timesheetStore } from '$lib/stores/timesheet'
  import { goto } from '$app/navigation'
  import { createTimesheet, fetchActiveTimers, fetchRecentTimers, restartTimer, stopTimer } from '../lib/apiFetchers/timesheets'
  import { fetchCurrentUser } from '../lib/apiFetchers/users'
  import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification'
  import { allActivitiesStore, allCustomersStore, allProjectsStore } from '$lib/stores/customers'
  import { fetchCustomers } from '$lib/apiFetchers/customers'
  import { fetchProjects } from '$lib/apiFetchers/projects'
  import { fetchActivities } from '$lib/apiFetchers/activities'
  import type { TimesheetCollectionExpanded, TimesheetEntity } from '$lib/types'
  import Logout from '$lib/components/Logout.svelte'
  import TimerForm from '$lib/components/TimerForm.svelte'
  import Timer from '$lib/components/Timer.svelte'
  import RecentTimers from '$lib/components/RecentTimers.svelte'

  let notificationPermissions = false

  let started = false
  let loadingText = ''

  const handleSubmit = async (project: number, activity: number, description: string) => {
    loadingText = 'Starting timer'
    let timesheet = await createTimesheet(project, activity, description, $userStore.id)
    $timesheetEntityStore = timesheet
    loadingText = ''
    started = true
    if (notificationPermissions) {
      sendNotification('Timer started')
    }
  }
  const handleStop = async () => {
    loadingText = 'Stopping timer'
    await stopTimer($timesheetStore.id || $timesheetEntityStore.id)
    timesheetStore.set({} as TimesheetCollectionExpanded)
    timesheetEntityStore.set({} as TimesheetEntity)
    loadingText = ''
    started = false
  }
  const handleRestart = async (id?: number) => {
    if (id) {
      loadingText = 'Restarting timer'
      let timer = await restartTimer(id)
      $timesheetEntityStore = timer as TimesheetEntity
      loadingText = ''
      started = true
    }
  }

  onMount(async () => {
    notificationPermissions = await isPermissionGranted()
    if (!notificationPermissions) {
      const permission = await requestPermission()
      notificationPermissions = permission === 'granted'
    }
    try {
      ;[$username, $apiKey, $apiUrl] = await invoke('get_api_key')
    } catch (err) {
      console.log('Tauri invokation error: ', err)
    }
    if (!$apiKey) {
      goto('/login')
    } else if (!started) {
      loadingText = 'Checking active timers'
      let ongoingTimers = await fetchActiveTimers()
      if (ongoingTimers.length > 0) {
        started = true
        let timer = ongoingTimers[0]
        $timesheetStore = timer
      } else {
        loadingText = 'Fetching data'
        ;[$userStore, $allCustomersStore, $allProjectsStore, $allActivitiesStore, $recentTimesheetStore] = await Promise.all([
          fetchCurrentUser(),
          fetchCustomers(),
          fetchProjects(),
          fetchActivities(),
          fetchRecentTimers(),
        ])
      }
      loadingText = ''
    }
  })
</script>

<Logout />
{#if loadingText}
  <h2>{loadingText}</h2>
{:else if $apiKey && $apiUrl}
  {#if started}
    <Timer startTime={$timesheetStore.begin || $timesheetEntityStore.begin} {handleStop} />
  {:else}
    <TimerForm {handleSubmit} />
    <RecentTimers {handleRestart} />
  {/if}
{/if}
