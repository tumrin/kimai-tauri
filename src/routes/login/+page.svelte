<script lang="ts">
  import { goto } from '$app/navigation'
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
    <input bind:value={apiUrl} type="text" />
    <label>Username</label>
    <input bind:value={kimaiUsername} type="text" />
    <label>API key</label>
    <input bind:value={apiKey} type="password" />
    <button type="submit">Login</button>
  </form>
</div>
