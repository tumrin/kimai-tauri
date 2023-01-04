import type { UserEntity } from '$lib/types'
import { writable, type Writable } from 'svelte/store'

export let userStore: Writable<UserEntity | null> = writable(null)
export let notificationPermissionStore = writable(false)
