<script>
  import { errorStore } from '$lib/stores/error'
</script>

{#if $errorStore}
  <div class="error">
    <h2>{$errorStore}</h2>
    <button>Clear</button>
  </div>
{/if}

<style lang="scss">
  .error {
    display: flex;
    flex-direction: row;
  }
</style>
