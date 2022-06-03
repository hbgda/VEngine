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
            selectedComponent = e?.["detail"].component
            base = selectedComponent != undefined ? selectedComponent.base() : undefined
        })
    })
</script>

<div id="component_editor">
    <div>
        {#if selectedComponent != undefined}
            {#each base["traits"] as trait}
                <details>
                    <summary>{trait}</summary>
                    {#each Object.keys(base["trait_options"][trait.toLowerCase()]) as option}
                        {#if base["trait_options"][trait.toLowerCase()][option]["value"] != undefined}
                            <OptionEditor name={option} value={base["trait_options"][trait.toLowerCase()][option]["value"]} type={base["trait_options"][trait.toLowerCase()]["type"]}/>
                        {:else}
                            <NestedOptionEditor name={option} options={base["trait_options"][trait.toLowerCase()][option]}/>
                        {/if}
                    {/each}
                </details>
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
        text-align: left;
    }
    #component_editor > :global(details) {
        text-align: left;
    }
</style>