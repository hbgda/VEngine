<script lang="ts">
    import { onMount } from "svelte";

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

    function OptionValueChanged(e, trait, option) {
        base["trait_options"][trait.toLowerCase()][option]["value"] = e.detail.value
        base.dispatchEvent(new CustomEvent("component_trait_changed", {
            detail: {
                key: option,
                value: e.detail.value
            }
        }))
    }

</script>

<div id="component_editor">
    <div>
        {#each trait_options as trait (trait)}
            <details open>
                <summary>
                    {trait.charAt(0).toUpperCase() + trait.substring(1)}
                    {#if !(base?.["required_traits"] || []).includes(trait)}
                        <button>Remove</button>
                        <button>Disable</button>
                    {/if}
                </summary>
                {#each Object.keys(base["trait_options"][trait.toLowerCase()]) as option (option)}
                    {#if base["trait_options"][trait.toLowerCase()][option]["value"] != undefined}
                        <OptionEditor on:value_changed={(e) => {
                            OptionValueChanged(e, trait, option)
                        }} name={option} editable={base["trait_options"][trait.toLowerCase()][option]["editable"] == true} bind:value={base["trait_options"][trait.toLowerCase()][option]["value"]} type={base["trait_options"][trait.toLowerCase()]["type"]}/>
                    {:else}
                        <NestedOptionEditor name={option} bind:options={base["trait_options"][trait.toLowerCase()][option]}/>
                    {/if}
                {/each}
            </details>
        {:else}
            <h>Select a component.</h>
        {/each}
        {#if selectedComponent != undefined}
            <button id="add_trait">Add Trait</button>
        {/if}
    </div>
</div>

<style>
    #component_editor {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: calc(30% - 20px);
        text-align: center;
        background-color: rgb(36, 36, 36);
        color: white;
        padding-left: 10px;
    }
    #component_editor > div > details {
        text-align: left;
        padding: 10px;
        border-bottom: white 2px solid;;
        border-radius: 0 0 5px 5px;
    }
    #component_editor > div > details > summary > button {
        float: right;
        height: 20px;
        padding: 5px;
        line-height: 10px;
    }
    #component_editor > div > h {
        font-size: large;
        margin: auto;
    }
    #add_trait {
        margin: 10px;
        height: 20px;
        width: 70%;
        padding: 5px;
        line-height: 10px;
    }
</style>