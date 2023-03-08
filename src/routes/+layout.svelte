<script>
    import Error from '$lib/components/Error.svelte'
    import Logout from '$lib/components/Logout.svelte'
    import PendingRequest from '$lib/components/PendingRequest.svelte'
    import UserInfo from '$lib/components/UserInfo.svelte'
    import '../app.css'
</script>

<main class="container">
    <div class="topbar">
        <Logout />
        <UserInfo />
        <Error />
        <PendingRequest />
    </div>
    <slot />
</main>

<style lang="scss">
    .topbar {
        display: grid;
        grid-template-columns: 8rem 8rem 1fr 1fr;
        height: 4rem;
        justify-items: end;
    }
</style>
