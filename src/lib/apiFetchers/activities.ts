import { apiKey, username, apiUrl } from '$lib/stores/apiKey'
import { ApiRequests, pendingRequestStore } from '$lib/stores/user'
import type { ActivityCollection } from '$lib/types'
import { get } from 'svelte/store'

export const fetchActivities = async (project?: number): Promise<ActivityCollection[]> => {
  pendingRequestStore.set(get(pendingRequestStore)?.concat(ApiRequests.FetchActiveTimer) || [])
  let response = await fetch(`${get(apiUrl)}/activities${project ? '?project=' + project : ''}`, {
    headers: {
      'X-AUTH-USER': get(username),
      'X-AUTH-TOKEN': get(apiKey),
    },
  })
  return response.json()
}
