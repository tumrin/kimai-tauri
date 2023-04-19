<script lang="ts">
    import { goto } from '$app/navigation'
    import Input from '$lib/components/Input.svelte'
    import { invoke } from '@tauri-apps/api/tauri'

    let apiKey = ''
    let apiUrl = ''
    let kimaiUsername = ''
    const handleLogin = async () => {
        try {
            await invoke('login', { kimaiUsername, apiKey, apiUrl })
        } catch (error) {
            console.log('Tauri invokation error: ', error)
        }
        goto('/')
    }
</script>

<div>
    <form on:submit={handleLogin}>
        <label>API url</label>
        <Input bind:value={apiUrl} type="text" />
        <label>Username</label>
        <Input bind:value={kimaiUsername} type="text" />
        <label>API key</label>
        <Input bind:value={apiKey} type="password" />
        <button type="submit">Login</button>
    </form>
</div>
