<script lang="ts">
    import { Trait } from "../../lib/Trait";
    import type SceneComponent from "./_scene-component.svelte";
    export let selectedComponent: SceneComponent = undefined
</script>

<div id="component_editor">
    <div>
        {#if selectedComponent != undefined}
            {#each selectedComponent.getBase()["traits"] as trait}
                <label for={trait}>{trait}</label>
                <input name={trait} type="checkbox"/>
            {/each}
        {:else}
            <h>Select a component.</h>
        {/if}
    </div>
</div>

<style>
    #component_editor {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 30%;
    }
</style>