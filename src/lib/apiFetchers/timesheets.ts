import { apiKey, apiUrl, username } from '$lib/stores/apiKey'
import { timesheetEntityStore } from '$lib/stores/timesheet'
import type { TimesheetCollectionExpanded, TimesheetEditForm, TimesheetEntity } from '$lib/types'
import { get } from 'svelte/store'

export const createTimesheet = async (project: number, activity: number, description: string, user: number) => {
  let body: TimesheetEditForm = {
    project,
    activity,
    begin: new Date().toISOString(),
    description,
  }
  let response = await fetch(`${get(apiUrl)}/timesheets`, {
    headers: {
      'X-AUTH-USER': get(username),
      'X-AUTH-TOKEN': get(apiKey),
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  })
  let timesheet: TimesheetEntity = await response.json()
  timesheetEntityStore.set(timesheet)
}

export const stopTimer = async (id?: number) => {
  let response = await fetch(`${get(apiUrl)}/timesheets/${id}/stop`, {
    headers: {
      'X-AUTH-USER': get(username),
      'X-AUTH-TOKEN': get(apiKey),
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({ id }),
  })
}

export const getActiveTimers = async (): Promise<TimesheetCollectionExpanded[]> => {
  let response = await fetch(`${get(apiUrl)}/timesheets/active`, {
    headers: {
      'X-AUTH-USER': get(username),
      'X-AUTH-TOKEN': get(apiKey),
    },
    method: 'GET',
  })
  return await response.json()
}
