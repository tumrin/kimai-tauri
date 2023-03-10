import { apiKey, apiUrl, username } from '$lib/stores/apiKey'
import { ApiRequests, pendingRequestStore } from '$lib/stores/user'
import type { TimesheetCollectionExpanded, TimesheetEditForm } from '$lib/types'
import { get } from 'svelte/store'

export const createTimesheet = async (project: number, activity: number, description: string, user: number) => {
    pendingRequestStore.set(get(pendingRequestStore)?.concat(ApiRequests.CreateTimer) || [])
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
    return await response.json()
}

export const stopTimer = async (id?: number) => {
    pendingRequestStore.set(get(pendingRequestStore)?.concat(ApiRequests.StopTimer) || [])
    let response = await fetch(`${get(apiUrl)}/timesheets/${id}/stop`, {
        headers: {
            'X-AUTH-USER': get(username),
            'X-AUTH-TOKEN': get(apiKey),
            'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({ id }),
    })
    if (!response.ok) {
        throw Error('Could not stop timer')
    }
}

export const restartTimer = async (id?: number) => {
    pendingRequestStore.set(get(pendingRequestStore)?.concat(ApiRequests.RestartTimer) || [])
    let response = await fetch(`${get(apiUrl)}/timesheets/${id}/restart`, {
        headers: {
            'X-AUTH-USER': get(username),
            'X-AUTH-TOKEN': get(apiKey),
            'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({ id, copy: 'description' }),
    })
    return await response.json()
}

export const fetchActiveTimers = async (): Promise<TimesheetCollectionExpanded[]> => {
    pendingRequestStore.set(get(pendingRequestStore)?.concat(ApiRequests.FetchActiveTimer) || [])
    let response = await fetch(`${get(apiUrl)}/timesheets/active`, {
        headers: {
            'X-AUTH-USER': get(username),
            'X-AUTH-TOKEN': get(apiKey),
        },
        method: 'GET',
    })
    return await response.json()
}

export const fetchRecentTimers = async (): Promise<TimesheetCollectionExpanded[]> => {
    pendingRequestStore.set(get(pendingRequestStore)?.concat(ApiRequests.FetchRecentTimers) || [])
    let response = await fetch(`${get(apiUrl)}/timesheets/recent`, {
        headers: {
            'X-AUTH-USER': get(username),
            'X-AUTH-TOKEN': get(apiKey),
        },
        method: 'GET',
    })
    return await response.json()
}
