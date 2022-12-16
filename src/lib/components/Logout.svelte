<script lang="ts">
  import { goto } from '$app/navigation'
  import { apiKey, apiUrl, username } from '$lib/stores/apiKey'
  import { allActivitiesStore, allCustomersStore, allProjectsStore } from '$lib/stores/customers'
  import { timesheetEntityStore, timesheetStore } from '$lib/stores/timesheet'
  import { userStore } from '$lib/stores/user'
  import type { ActivityCollection, CustomerCollection, ProjectCollection, TimesheetCollectionExpanded, TimesheetEntity, UserEntity } from '$lib/types'
  import { invoke } from '@tauri-apps/api/tauri'

  const logout = async () => {
    apiKey.set('')
    apiUrl.set('')
    username.set('')
    userStore.set({} as UserEntity)
    allActivitiesStore.set([] as ActivityCollection[])
    allCustomersStore.set([] as CustomerCollection[])
    allProjectsStore.set([] as ProjectCollection[])
    timesheetEntityStore.set({} as TimesheetEntity)
    timesheetStore.set({} as TimesheetCollectionExpanded)
    try {
      await invoke('logout')
    } catch (error) {
      console.log('Tauri invokation error: ', error)
    }
    goto('/login')
  }
</script>

<button on:click={logout}>Logout</button>
