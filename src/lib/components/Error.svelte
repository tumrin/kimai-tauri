<script>
  import { errorStore } from '$lib/stores/error'
</script>

{#if $errorStore}
  <div class="error">
    <button on:click={() => errorStore.set('')}>Clear Error</button>
    <h2>{$errorStore}</h2>
  </div>
{/if}

<style lang="scss">
  .error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    button {
      padding: 1rem;
      max-width: 15vw;
    }
  }
</style>
