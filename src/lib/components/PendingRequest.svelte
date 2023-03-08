<script lang="ts">
    import { pendingRequestStore } from '$lib/stores/user'
    import { beforeUpdate } from 'svelte'
    import LoadingIcon from './LoadingIcon.svelte'
    import Fa from 'svelte-fa'
    import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

    let displayRequest = 1
    beforeUpdate(() => {
        displayRequest = displayRequest > $pendingRequestStore.length ? 1 : displayRequest
    })
</script>

<div class="pending">
    {#if $pendingRequestStore.length > 0}
        <h2>{`${displayRequest}/${$pendingRequestStore.length}`}</h2>
        <button on:click={() => (displayRequest = displayRequest - 1 >= 1 ? displayRequest - 1 : $pendingRequestStore.length)}><Fa icon={faArrowLeft} /></button
        >
        <LoadingIcon text={$pendingRequestStore[displayRequest - 1]} />
        <button on:click={() => (displayRequest = displayRequest + 1 <= $pendingRequestStore.length ? displayRequest + 1 : 1)}
            ><Fa icon={faArrowRight} /></button
        >
    {/if}
</div>

<style lang="scss">
    .pending {
        display: flex;
        max-height: 4rem;
        overflow-y: scroll;
        button {
            align-self: center;
            padding: 0.5rem;
        }
    }
</style>
