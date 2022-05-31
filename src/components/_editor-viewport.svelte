<script lang="ts">
    import { Trait } from "../../lib/Trait";

    import SceneComponent from "./_scene-component.svelte";

    document.addEventListener("keydown", e => {
        if (e.key == "t") {
            c.implementTrait(Trait.Draggable)
        }
    })
    let c: SceneComponent

</script>

<div id="editor_viewport">
    <div id="editor_control">
        <button>Create Component</button>
    </div>
    <div id="component_scene">
        <SceneComponent bind:this={c}/>
    </div>    
</div>

<style>
    #editor_viewport {
        width: 70%;
        height: 100vh;
        background-color: blue;
        position: relative;
        left: 0;
        bottom: 0;
    }
</style>