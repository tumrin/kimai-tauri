import type { InitialTimerInfo, TimesheetCollectionExpanded, TimesheetEntity } from '$lib/types'
import { writable } from 'svelte/store'

export let initialInfoStore = writable({} as InitialTimerInfo)
export let timesheetStore = writable({} as TimesheetCollectionExpanded)
export let timesheetEntityStore = writable({} as TimesheetEntity)
export let recentTimesheetStore = writable({} as TimesheetCollectionExpanded[])
export let timerStartedStore = writable(false)
