<script lang="ts">
  import { recentTimesheetStore } from '$lib/stores/timesheet'
  export let handleRestart: any
</script>

<div class="recent-timesheet-container">
  {#each $recentTimesheetStore as timesheet}
    <div class="recent-timesheet">
      <h3>{timesheet.project.name || ''}</h3>
      <h4>{timesheet.activity.name || ''}</h4>
      <p>{timesheet.description || ''}</p>
      <button on:click={() => handleRestart(timesheet.id)}>Restart</button>
    </div>
  {/each}
</div>

<style lang="scss">
  .recent-timesheet-container {
    width: 100%;
    margin-top: 3vh;
  }
  .recent-timesheet {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    border-style: solid;
    text-align: center;
    border-radius: 8px;
    border: 1px solid;
    margin-top: 1vh;
    margin-bottom: 1vh;
    h3,
    p,
    h4 {
      display: inline-flex;
      flex-direction: column;
      align-self: center;
    }
  }
</style>
