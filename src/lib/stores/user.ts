import type { UserEntity } from '$lib/types'
import { writable } from 'svelte/store'

export let userStore = writable({} as UserEntity)
