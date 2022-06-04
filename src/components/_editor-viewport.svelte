<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";

    import { Trait } from "../../lib/Trait";

    import SceneComponent from "./_scene-component.svelte";

    export let sceneComponents = []
    let componentObjects = []
    let selectedComponent: SceneComponent

    let dispatch = createEventDispatcher()

    onMount(() => {
        document.addEventListener("keydown", (e) => {
            if(e.key == "Delete" && selectedComponent != undefined) {
                let idx = componentObjects.indexOf(selectedComponent)
                selectComponent(-1)
                sceneComponents.splice(idx, 1)
            }
        })
    })

    function selectComponent(component) {

        if(selectedComponent != undefined) {
            selectedComponent.base().dispatchEvent(new CustomEvent("component_deselected"))
        }

        if(component >= 0) {

            selectedComponent = componentObjects[component]
            selectedComponent.base().dispatchEvent(new CustomEvent("component_selected"))
            dispatch("component_selected", {
                component: selectedComponent
            })
            document.dispatchEvent(new CustomEvent("component_selected", {
                detail: {
                    component: componentObjects[component]
                }
            }))
        }
        else {
            selectedComponent = undefined
            dispatch("component_selected", {
                component: undefined
            })
            document.dispatchEvent(new CustomEvent("component_selected", {
                detail: {
                    component: undefined
                }
            }))
        }
        
    }
</script>
<div id="scene">
    <div id="editor_control">
        <button on:click={() => {
            sceneComponents = [(sceneComponents[0] || 0) + 1, ...sceneComponents] 
        }}>Create Component</button>
        <button on:click={() => {
            sceneComponents = []
            selectComponent(-1)
        }}>Clear Components</button>
    </div>
    <div id="editor_viewport" on:click={() => selectComponent(-1)}>
        <div id="component_scene">
            {#each sceneComponents as component, i (component)}
                <SceneComponent selected={selectedComponent == componentObjects[i] ? true : false} bind:this={componentObjects[i]} on:selected={() => selectComponent(i)}/>
            {/each}
        </div>    
    </div>
</div>

<style>
    #scene {
        position: relative;
    }
    #editor_viewport {
        width: 70%;
        background-color: blue;
        position: relative;
        left: 0;
        bottom: 0;
        z-index: 1;
        aspect-ratio: 16 / 9;
        border: rgb(36, 36, 36) 10px solid;
    }
    #component_scene {
        width: 100%;
        height: 100%;
        transform: scale(1);
    }
    #editor_control {
        position: absolute;
        text-align: left;
        z-index: 2;
        left: 15px;
        top: 15px;
        background-color: transparent;
        width: fit-content;
    }
    #editor_control > button {
        z-index: 99;
        height: 30px;
        font-size: large;
        border-radius: 5px;
        line-height: 15px;
    }
</style>