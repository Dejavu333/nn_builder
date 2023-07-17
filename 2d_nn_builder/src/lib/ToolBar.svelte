<script>
    import MoveTool from "./MoveTool.svelte";
    import RemoveTool from "./RemoveTool.svelte";
    import SpawnTool from "./SpawnTool.svelte";
    import CutTool from "./CutTool.svelte";
    import ConnectTool from "./ConnectTool.svelte";
</script>

<div id="toolBar">
    <MoveTool />
    <SpawnTool />
    <RemoveTool />
    <ConnectTool />
    <CutTool />
</div>

<style>
    #toolBar {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        height: 100%;

    }
</style>
