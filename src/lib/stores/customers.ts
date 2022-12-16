import type { ActivityCollection, CustomerCollection, ProjectCollection } from '$lib/types'
import { writable } from 'svelte/store'

// Cache everything since api is so slow
export const allCustomersStore = writable([] as CustomerCollection[])
export const allProjectsStore = writable([] as ProjectCollection[])
export const allActivitiesStore = writable([] as ActivityCollection[])
