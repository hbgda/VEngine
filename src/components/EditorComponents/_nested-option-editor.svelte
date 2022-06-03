<script lang="ts">
    import { onMount } from "svelte";
import { TraitOptionType } from "../../../lib/types";

    export let name: string
    export let options: object
    let keys = undefined
    
    $: parsedOptions = Object.keys(options).map(k => {
        //console.log(options[k])
            return {
                key: k,
                type: options[k].type == TraitOptionType.Boolean ? "checkbox" : options[k].type == TraitOptionType.Float || options[k].type == TraitOptionType.Integer ? "number" : options[k].type == TraitOptionType.String ? "text" : "",
                value: options[k].value,
                editable: options[k].editable ? true : false
            }
    })
</script>

<div>
    <label for={name}>{name.charAt(0).toUpperCase() + name.substring(1)}</label>
    <div {name}>
        {#each parsedOptions as option (option["key"])}
            <label for={option["key"]}>{option["key"].charAt(0).toUpperCase() + option["key"].substring(1)}</label>
            <input disabled={!option["editable"]} type={option["type"]} value={option["value"]}/>
        {/each}
    </div>
</div>

<style>
    div > div > input  {
        margin: 10px;
        margin-right: 20px;
        display: inline-block;
    }
    div > div > label {
        display: initial;
        width: fit-content;
        margin: 0;
        padding: 0;
    }
</style>