<script lang="ts">
  import type { ActivityCollection, CustomerCollection, ProjectCollection } from '$lib/types'
  import { allActivitiesStore, allCustomersStore, allProjectsStore } from '$lib/stores/customers'

  export let handleSubmit: any
  let customersProjects: ProjectCollection[] = []
  let customersActivities: ActivityCollection[] = []
  let project: any
  let customer: any = null // Needs to be null so no customer is chosen by default
  let activity: any
  let description: any
</script>

<div class="timeform">
  <form on:submit={() => handleSubmit(project, activity, description)}>
    <label>Customer</label>
    <select
      bind:value={customer}
      on:change={async () => {
        customersProjects = $allProjectsStore.filter((project) => project.customer === customer)
      }}
      name="Customer"
    >
      {#each $allCustomersStore as customer}
        <option value={customer.id}>{customer.name}</option>
      {/each}
    </select>

    <label>Project</label>
    <select
      bind:value={project}
      on:change={async () => {
        console.log($allActivitiesStore)
        customersActivities = $allActivitiesStore.filter((activity) => !activity.project || activity.project === project)
        console.log(customersActivities)
      }}
      name="Project"
    >
      {#each customersProjects as project}
        <option value={project.id}>{project.name}</option>
      {/each}
    </select>

    <label>Activites</label>
    <select bind:value={activity} name="Activity">
      {#each customersActivities as activity}
        <option value={activity.id}>{activity.name}</option>
      {/each}
    </select>

    <label>Description</label>
    <textarea bind:value={description} />
    <button type="submit">Start</button>
  </form>
</div>
