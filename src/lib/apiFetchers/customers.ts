import { apiKey, apiUrl, username } from '$lib/stores/apiKey'
import { ApiRequests, pendingRequestStore } from '$lib/stores/user'
import type { CustomerCollection } from '$lib/types'
import { get } from 'svelte/store'

export const fetchCustomers = async (): Promise<CustomerCollection[]> => {
    pendingRequestStore.set(get(pendingRequestStore)?.concat(ApiRequests.FetchCustomers) || [])
    let response = await fetch(`${get(apiUrl)}/customers`, {
        headers: {
            'X-AUTH-USER': get(username),
            'X-AUTH-TOKEN': get(apiKey),
        },
    })
    return response.json()
}
