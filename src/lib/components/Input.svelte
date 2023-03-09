<script lang="ts">
    export let value: string
    export let type: string

    const setType = (node: any) => {
        node.type = type
    }
</script>

<div class="input">
    <input use:setType bind:value />
</div>

<style lang="scss">
    .input {
        input {
            width: 100%;
            box-sizing: border-box;
            border-style: none;
            border-radius: 8px;
            color: black;
            padding: 0.6em 1.2em;
            font-size: 1em;
            font-weight: 500;
            font-family: inherit;
            outline: none;
            &:focus {
                box-shadow: 0 0 0 1px var(--main-bt-color);
            }
        }
    }
</style>
