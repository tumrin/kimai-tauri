<script lang="ts">
  import { pendingRequestStore } from '$lib/stores/user'
  import LoadingIcon from './LoadingIcon.svelte'
</script>

<div class="pending">
  {#if $pendingRequestStore}
    <LoadingIcon text={$pendingRequestStore} />
  {/if}
</div>

<style lang="scss">
  .pending {
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    max-height: 4rem;
  }
</style>
