<script>
  import Error from '$lib/components/Error.svelte'
  import Logout from '$lib/components/Logout.svelte'
  import PendingRequest from '$lib/components/PendingRequest.svelte'
  import '../app.css'
</script>

<main class="container">
  <div class="topbar">
    <Logout />
    <Error />
    <PendingRequest />
  </div>
  <slot />
</main>

<style lang="scss">
  .topbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow: hidden;
    height: 4rem;
  }
</style>
