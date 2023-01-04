<script>
  import Error from '$lib/components/Error.svelte'
  import Logout from '$lib/components/Logout.svelte'
  import { errorStore } from '$lib/stores/error'
  import '../app.css'
</script>

<main class="container">
  <Logout />
  <Error />
  <slot />
</main>
