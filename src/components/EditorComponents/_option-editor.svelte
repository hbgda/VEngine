<script lang="ts">
    import { TraitOptionType } from "../../../lib/types";

    export let name: string
    export let value
    export let type: TraitOptionType
    let inputType = type == TraitOptionType.Boolean ? "checkbox" : type == TraitOptionType.Float || type == TraitOptionType.Integer ? "number" : type == TraitOptionType.String ? "text" : ""
</script>

<div>
    <label for={name}>{name.charAt(0) + name.substring(1)}</label>
    <input name={name} type={inputType} {value}/>
</div>

<style>
    
</style>