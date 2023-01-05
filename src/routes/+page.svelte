<script lang="ts">
  import { invoke } from '@tauri-apps/api/tauri'
  import { onMount } from 'svelte'
  import { apiKey, username, apiUrl } from '$lib/stores/apiKey'
  import { notificationPermissionStore, pendingRequestStore, userStore } from '$lib/stores/user'
  import { recentTimesheetStore, timerStartedStore, timesheetEntityStore, timesheetStore } from '$lib/stores/timesheet'
  import { goto } from '$app/navigation'
  import { fetchActiveTimers, fetchRecentTimers } from '../lib/apiFetchers/timesheets'
  import { fetchCurrentUser } from '../lib/apiFetchers/users'
  import { isPermissionGranted, requestPermission } from '@tauri-apps/api/notification'
  import { allActivitiesStore, allCustomersStore, allProjectsStore } from '$lib/stores/customers'
  import { fetchCustomers } from '$lib/apiFetchers/customers'
  import { fetchProjects } from '$lib/apiFetchers/projects'
  import { fetchActivities } from '$lib/apiFetchers/activities'
  import TimerForm from '$lib/components/TimerForm.svelte'
  import Timer from '$lib/components/Timer.svelte'
  import RecentTimers from '$lib/components/RecentTimers.svelte'
  import { errorStore } from '$lib/stores/error'
  import { DateTime } from 'luxon'

  onMount(async () => {
    $notificationPermissionStore = await isPermissionGranted()
    if (!$notificationPermissionStore) {
      $notificationPermissionStore = (await requestPermission()) === 'granted'
    }
    try {
      ;[$username, $apiKey, $apiUrl] = await invoke('get_api_key')
    } catch (error) {
      errorStore.set('Could not get api information')
    }
    if (!$apiKey) {
      goto('/login')
    }
    // If timer has not started and we are missing some infromation from Kimai, update all stores
    else if (!$timerStartedStore && (!$userStore || !$allCustomersStore || !$allProjectsStore || !$allActivitiesStore || !$recentTimesheetStore)) {
      Promise.all([fetchCurrentUser(), fetchCustomers(), fetchProjects(), fetchActivities(), fetchRecentTimers(), fetchActiveTimers()])
        .then((data) => {
          let ongoingTimers = []
          ;[$userStore, $allCustomersStore, $allProjectsStore, $allActivitiesStore, $recentTimesheetStore, ongoingTimers] = data
          if (ongoingTimers.length > 0) {
            $timerStartedStore = true
            $timesheetStore = ongoingTimers[0]
          }
        })
        .finally(() => pendingRequestStore.set([]))
    }
  })
</script>

<div>
  {#if $apiKey && $apiUrl}
    {#if $timerStartedStore}
      <Timer startTime={$timesheetStore.begin || $timesheetEntityStore.begin || DateTime.now()} />
    {:else}
      <TimerForm />
      <RecentTimers />
    {/if}
  {/if}
</div>

<style lang="scss">
  .loading-screen {
    display: flex;
    justify-content: center;
  }
</style>
