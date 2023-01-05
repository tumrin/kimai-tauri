<script lang="ts">
  import { pendingRequestStore } from '$lib/stores/user'
  import { beforeUpdate } from 'svelte'
  import LoadingIcon from './LoadingIcon.svelte'

  let displayRequest = 1
  beforeUpdate(() => {
    displayRequest = displayRequest > $pendingRequestStore.length ? 1 : displayRequest
  })
</script>

<div class="pending">
  {#if $pendingRequestStore.length > 0}
    <h2>{`${displayRequest}/${$pendingRequestStore.length}`}</h2>
    <button on:click={() => (displayRequest = displayRequest - 1 >= 1 ? displayRequest - 1 : $pendingRequestStore.length)}>{'<'}</button>
    <LoadingIcon text={$pendingRequestStore[displayRequest - 1]} />
    <button on:click={() => (displayRequest = displayRequest + 1 <= $pendingRequestStore.length ? displayRequest + 1 : 1)}>{'>'}</button>
  {/if}
</div>

<style lang="scss">
  .pending {
    display: flex;
    align-self: flex-end;
    max-height: 4rem;
    overflow-y: scroll;
    button {
      padding: 0.25rem;
      height: 50%;
      align-self: center;
    }
  }
</style>
