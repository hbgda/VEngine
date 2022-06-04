<script lang="ts">
    import ProjectAssetView from "./components/ProjectAssetView/_project-asset-view.svelte";
    import ComponentEditor from "./components/_component-editor.svelte";    
    import EditorViewport from "./components/_editor-viewport.svelte";
    import type SceneComponent from "./components/_scene-component.svelte";
    let selectedComponent: SceneComponent = undefined
</script>

<main>
    <EditorViewport/>
    <ComponentEditor/>
    <ProjectAssetView/>
</main>

<style>
	main {
		text-align: center;
		max-width: 240px;
		margin: 0;
        width: 1920px;
        background-color: rgb(46, 46, 46);
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

    :global(.transform-node) {
        width: 10px;
        height: 10px;
        background-color: white;
        position: absolute;
        -webkit-user-drag: none;
        border: black 1px solid;
    }
    :global(.top-left) {
        left: 0;
        transform: translate(-7px, -7px);
    }
    :global(.top-mid) {
        left: 50%;
        transform: translate(-7px, -7px);
    }
    :global(.top-right) {
        right: 0;
        transform: translate(7px, -7px);
    }

    :global(.bottom-left) {
        left: 0;
        bottom: 0;
        transform: translate(-7px, 7px);
    }
    :global(.bottom-mid) {
        left: 50%;
        bottom: 0;
        transform: translate(-7px, 7px);
    }
    :global(.bottom-right) {
        right: 0;
        bottom: 0;
        transform: translate(7px, 7px);
    }

    :global(.left-mid) {
        left: 0;
        top: 50%;
        transform: translate(-7px, -7px);
    }
    :global(.right-mid) {
        right: 0;
        top: 50%;
        transform: translate(7px, -7px);
    }
</style>