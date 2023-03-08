<script lang="ts">
    import { userStore } from '$lib/stores/user'
</script>

<div class="userInfo">
    {#if $userStore}
        <p>Logged in as: {$userStore?.alias}</p>
    {/if}
</div>

<style lang="scss">
    .userInfo {
        justify-self: start;
    }
</style>
