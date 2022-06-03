<script lang="ts">
    import { onMount } from "svelte";
import { TraitOptionType } from "../../../lib/types";

    export let name: string
    export let options: object
    let keys = undefined
    
    let parsedOptions = []

    onMount(() => {
        keys = Object.keys(options)
        console.log(keys)
        parsedOptions = keys.map(k => {
            console.log(options[k])
            return {
                key: k,
                type: options[k].type == TraitOptionType.Boolean ? "checkbox" : options[k].type == TraitOptionType.Float || options[k].type == TraitOptionType.Integer ? "number" : options[k].type == TraitOptionType.String ? "text" : "",
                value: options[k].value
            }
        })
    })
</script>

<div>
    <label for={name}>{name.charAt(0).toUpperCase() + name.substring(1)}</label>
    <div {name}>
        {#each parsedOptions as option (option["key"])}
            <label for={option["key"]}>{option["key"].charAt(0).toUpperCase() + option["key"].substring(1)}</label>
            <input type={option["type"]} value={option["value"]}/>
        {/each}
    </div>
</div>

<style>
    
</style>