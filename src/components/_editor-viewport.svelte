<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { Trait } from "../../lib/Trait";

    import SceneComponent from "./_scene-component.svelte";

    export let sceneComponents = []
    let componentObjects = []
    let selectedComponent: SceneComponent

    let dispatch = createEventDispatcher()

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
<div>
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
            {#each sceneComponents as component, i}
                <SceneComponent selected={selectedComponent == componentObjects[i] ? true : false} bind:this={componentObjects[i]} on:selected={() => selectComponent(i)}/>
            {/each}
        </div>    
    </div>
</div>

<style>
    #editor_viewport {
        width: 1334px;
        background-color: blue;
        position: relative;
        top: 44px;
        left: 0;
        bottom: 0;
        z-index: 1;
        aspect-ratio: 16 / 9;
    }
    #component_scene {
        width: 100%;
        height: 100%;
        transform: scale(1);
    }
    #editor_control {
        position: absolute;
        text-align: left;
        z-index: 99;
        left: 0%;
        background-color: rgb(46, 46, 46);
        width: 1334px;
    }
</style>