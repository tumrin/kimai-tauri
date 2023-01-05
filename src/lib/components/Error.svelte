<script>
  import { errorStore } from '$lib/stores/error'
</script>

<div class="error">
  {#if $errorStore}
    <h2>{$errorStore}</h2>
    <button on:click={() => errorStore.set('')}>X</button>
  {/if}
</div>

<style lang="scss">
  .error {
    display: flex;
    align-items: center;
  }
</style>
