import { apiKey, apiUrl, username } from '$lib/stores/apiKey'
import { ApiRequests, pendingRequestStore } from '$lib/stores/user'
import type { UserEntity } from '$lib/types'
import { get } from 'svelte/store'

export const fetchCurrentUser = async (): Promise<UserEntity> => {
    pendingRequestStore.set(get(pendingRequestStore)?.concat(ApiRequests.FetchCurrentUser) || [])
    let response = await fetch(`${get(apiUrl)}/users/me`, {
        headers: {
            'X-AUTH-USER': get(username),
            'X-AUTH-TOKEN': get(apiKey),
        },
    })
    return response.json()
}
