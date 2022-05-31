<script lang="ts">
    import ComponentEditor from "./components/_component-editor.svelte";    
    import EditorViewport from "./components/_editor-viewport.svelte";
</script>

<main>
    <EditorViewport/>
    <ComponentEditor/>
</main>

<style>
	main {
		text-align: center;
		max-width: 240px;
		margin: 0;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>