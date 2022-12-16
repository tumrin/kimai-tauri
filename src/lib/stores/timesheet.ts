import type { TimesheetCollectionExpanded, TimesheetEntity } from '$lib/types'
import { writable, type Writable } from 'svelte/store'

export let timesheetStore: Writable<TimesheetCollectionExpanded> = writable({} as TimesheetCollectionExpanded)
export let timesheetEntityStore = writable({} as TimesheetEntity)
