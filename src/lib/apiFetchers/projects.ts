import { apiKey, apiUrl, username } from '$lib/stores/apiKey'
import type { ProjectCollection } from '$lib/types'
import { get } from 'svelte/store'

export const fetchProjects = async (customer?: number): Promise<ProjectCollection[]> => {
  let response = await fetch(`${get(apiUrl)}/projects${customer ? '?customer=' + customer : ''}`, {
    headers: {
      'X-AUTH-USER': get(username),
      'X-AUTH-TOKEN': get(apiKey),
    },
  })
  return response.json()
}
