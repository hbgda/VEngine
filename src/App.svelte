<script lang="ts">
    import ComponentEditor from "./components/_component-editor.svelte";    
    import EditorViewport from "./components/_editor-viewport.svelte";
    import type SceneComponent from "./components/_scene-component.svelte";
    let selectedComponent: SceneComponent = undefined
</script>

<main>
    <EditorViewport on:component_selected={(e) => selectedComponent = e.detail.component}/>
    <ComponentEditor bind:selectedComponent/>
</main>

<style>
	main {
		text-align: center;
		max-width: 240px;
		margin: 0;
        width: 1920px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>