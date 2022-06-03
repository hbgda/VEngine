<script lang="ts">
    import { onMount } from "svelte";

    import { Trait } from "../../lib/Trait";
    import NestedOptionEditor from "./EditorComponents/_nested-option-editor.svelte";
    import OptionEditor from "./EditorComponents/_option-editor.svelte";
    import type SceneComponent from "./_scene-component.svelte";

    export let selectedComponent: SceneComponent = undefined
    let base

    onMount(() => {
        document.addEventListener("component_selected", (e) => {
            if(selectedComponent == e?.["detail"].component) return
            selectedComponent = e?.["detail"].component
            trait_options = []
            base = selectedComponent != undefined ? selectedComponent.base() : undefined

            if(selectedComponent != undefined) 
                trait_options = Object.keys(base["trait_options"])
                
        })
        document.addEventListener("component_trait_changed", (e) => {
            base = e?.["detail"].component
        })
    })

    let trait_options = []

</script>

<div id="component_editor">
    <div>
        {#each trait_options as trait (trait)}
            <details open>
                <summary>{trait.charAt(0).toUpperCase() + trait.substring(1)}</summary>
                {#each Object.keys(base["trait_options"][trait.toLowerCase()]) as option (option)}
                    {#if base["trait_options"][trait.toLowerCase()][option]["value"] != undefined}
                        <OptionEditor on:value_changed={(e) => {
                            base["trait_options"][trait.toLowerCase()][option]["value"] = e.detail.value
                        }} name={option} editable={base["trait_options"][trait.toLowerCase()][option]["editable"] == true} bind:value={base["trait_options"][trait.toLowerCase()][option]["value"]} type={base["trait_options"][trait.toLowerCase()]["type"]}/>
                    {:else}
                        <NestedOptionEditor name={option} bind:options={base["trait_options"][trait.toLowerCase()][option]}/>
                    {/if}
                {/each}
            </details>
        {:else}
            <h>Select a component.</h>
        {/each}
    </div>
</div>

<style>
    #component_editor {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 30%;
        text-align: left;
        background-color: rgb(46, 46, 46);
        color: white;
        padding-left: 10px;
    }
    #component_editor > :global(details) {
        text-align: left;
    }
</style>