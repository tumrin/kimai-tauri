import type { UserEntity } from '$lib/types'
import { writable, type Writable } from 'svelte/store'

export let userStore: Writable<UserEntity | null> = writable(null)
export let notificationPermissionStore = writable(false)
export let pendingRequestStore: Writable<ApiRequests | null> = writable(null)

export enum ApiRequests {
  FetchActivities = 'Fetching activities',
  FetchCustomers = 'Fetching Customers',
  FetchProjects = 'Fetching projects',
  CreateTimer = 'Creating timer',
  StopTimer = 'Stopping timer',
  RestartTimer = 'Restarting timer',
  FetchActiveTimer = 'Fetching active timers',
  FetchRecentTimers = 'Fetching recent timers',
  FetchCurrentUser = 'Fetching current user info',
}
