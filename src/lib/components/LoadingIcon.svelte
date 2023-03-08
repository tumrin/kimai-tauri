<script lang="ts">
    import Fa from 'svelte-fa'
    import { faCircleNotch, faSync } from '@fortawesome/free-solid-svg-icons'

    export let text: string
</script>

<div class="loading">
    <p>{text}</p>
    <div class="icon">
        <Fa icon={faCircleNotch} size="1.5x" spin />
    </div>
</div>

<style lang="scss">
    .loading {
        display: flex;
        align-items: center;
        p {
            margin: 0.25rem;
        }
        .icon {
            margin: 0.25rem;
            color: var(--main-bt-color);
        }
    }
</style>
