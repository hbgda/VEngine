<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    import { Trait, ImplTrait } from '../../lib/Trait';
    
    let _base: HTMLDivElement
    export function base() {
        return _base
    }
    export let selected: boolean = false
    
    export function implementTrait(trait: Trait): boolean {
        if(_base["traits"].includes(trait)) {
            console.log("Component already implements [".concat(trait, "]"))
            return true
        }

        let implement = ImplTrait[trait]
        if(implement) {
            let info = implement(_base)
            
            for(const event of info.events || []) {
                _base.addEventListener(event.listener, (e) => {
                    if(selected == false && event.ignoreSelection !== true) return
                    event.event(e)
                })
            }
            
            _base["trait_options"][trait.toLowerCase()] = info.options
            _base["traits"] = [trait, ..._base["traits"]]
            if(info?.["required"] == true) {
                _base["required_traits"] = [trait.toLowerCase(), ..._base["required_traits"] || []]
            }
            console.log("Implemented " + trait)
            return true
        }
        else {
            console.error("Failed to find or implement specified trait.")
            return false
        }
    }

    onMount(() => {
        _base["trait_options"] = {}
        _base["traits"] = []
        implementTrait(Trait.Transform)
    })


    const dispatch = createEventDispatcher()

    export function select(e: MouseEvent) {
        e.stopPropagation()
        dispatch("selected")
    }

    let viewport = document.getElementById("editor_viewport")
</script>

<div style={`left: ${viewport.offsetWidth / 2 - 50}px; top: ${viewport.offsetHeight / 2 - 50}px; right: unset; bottom: unset;`} bind:this={_base} class={"scene-component" + (selected == true ? " selected" : "")} data={(_base ? _base["traits"] : []).join(" ")} on:click={select}>

</div>

<style>
    .scene-component {
        width: 100px;
        height: 100px;
        background-color: black;
        position: absolute;
        z-index: 2;
        -webkit-user-drag: none;
        min-height: 30px;
        min-width: 30px;
        max-width: 100%;
        max-height: 100%;
    }
    .selected {
        outline: white 2px solid;
        /* z-index: 3 !important; */
    }
</style>