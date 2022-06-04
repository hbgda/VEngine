<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { TraitOptionType } from "../../../lib/types";

    export let name: string
    export let value
    export let type: TraitOptionType
    export let editable: boolean = false
    let dispatch = createEventDispatcher()
    let inputType = type == TraitOptionType.Boolean ? "checkbox" : type == TraitOptionType.Float || type == TraitOptionType.Integer ? "number" : type == TraitOptionType.String ? "text" : ""
</script>

<div>
    <label for={name}>{name.charAt(0).toUpperCase() + name.substring(1)}</label>
    <input disabled={!editable} name={name} type={inputType} {value} on:input={(e) => {
        dispatch("value_changed", {
            value: e.target?.["value"]
        })
    }}/>
</div>

<style>
    input {
        margin-left: 26px;
        margin-top: 10px;
    }
</style>