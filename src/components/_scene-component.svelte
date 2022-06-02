<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    import { Trait, ImplTrait } from '../../lib/Trait';
    
    let base: HTMLDivElement
    export function getBase() {
        return base
    }
    export let selected: boolean = false
    
    export function implementTrait(trait: Trait): boolean {
        if(base["traits"].includes(trait)) {
            console.log("Component already implements [".concat(trait, "]"))
            return true
        }

        let implement = ImplTrait[trait]
        if(implement) {
            let info = implement(base)
            
            for(const event of info.events) {
                base.addEventListener(event.listener, () => {
                    if(selected == false && event.ignoreSelection !== true) return
                    event.event()
                })
            }
            
            base["trait_options"][trait.toLowerCase()] = info.options
            base["traits"] = [trait, ...base["traits"]]
            console.log("Implemented " + trait)
            return true
        }
        else {
            console.error("Failed to find or implement specified trait.")
            return false
        }
    }

    onMount(() => {
        base["trait_options"] = {}
        base["traits"] = []
        implementTrait(Trait.Transform)
    })


    const dispatch = createEventDispatcher()

    export function select(e: MouseEvent) {
        e.stopPropagation()
        dispatch("selected")
    }
</script>

<div style="left: 50%; top: 50%;" bind:this={base} class={"scene-component" + (selected == true ? " selected" : "")} data={(base ? base["traits"] : []).join(" ")} on:click={select}>

</div>

<style>
    .scene-component {
        width: 100px;
        height: 100px;
        background-color: black;
        position: absolute;
        z-index: 2;
    }
    .selected {
        outline: white 2px solid;
        z-index: 3 !important;
    }
</style>