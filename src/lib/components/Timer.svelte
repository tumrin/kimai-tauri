<script lang="ts">
  import { Duration, DateTime } from 'luxon'
  import { timesheetEntityStore, timesheetStore } from '$lib/stores/timesheet'
  import { allActivitiesStore, allProjectsStore } from '$lib/stores/customers'
  export let startTime: any
  export let handleStop: any
  let duration: Duration

  let projectName = $timesheetStore.project?.name || $allProjectsStore.find((project) => project.id === $timesheetEntityStore.project)?.name
  let activityname = $timesheetStore.activity?.name || $allActivitiesStore.find((activity) => activity.id === $timesheetEntityStore.activity)?.name
  setInterval(() => {
    duration = Duration.fromMillis(DateTime.now().toMillis() - DateTime.fromISO(startTime).toMillis())
  }, 1000)
</script>

<div class="timer">
  <h1>{projectName}</h1>
  <h2>{activityname}</h2>
  <h3>{$timesheetStore.description || $timesheetEntityStore.description}</h3>
  <h2>
    {duration?.toFormat('hh:mm:ss') ?? Duration.fromMillis(0).toFormat('hh:mm:ss')}
  </h2>
  <button on:click={handleStop}>Stop</button>
</div>
