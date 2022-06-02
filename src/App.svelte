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

    :global(.transform-node) {
        width: 10px;
        height: 10px;
        background-color: white;
        position: absolute;
    }
    :global(.top-left), :global(.top-mid), :global(.top-right) {
        transform: translateY(-5px);
    }

    :global(.top-left) {
        left: 0;
        transform: translate(-5px, -5px);
    }
    :global(.top-mid) {
        left: 50%;
        transform: translate(-50%, -5px);
    }
    :global(.top-right) {
        right: 0;
        transform: translate(5px, -5px);
    }

    :global(.bottom-left) {
        left: 0;
        bottom: 0;
        transform: translate(-5px, 5px);
    }
    :global(.bottom-mid) {
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 5px);
    }
    :global(.bottom-right) {
        right: 0;
        bottom: 0;
        transform: translate(5px, 5px);
    }

    :global(.left-mid) {
        left: 0;
        top: 50%;
        transform: translate(-5px, -50%);
    }
    :global(.right-mid) {
        right: 0;
        top: 50%;
        transform: translate(5px, -50%);
    }
</style>