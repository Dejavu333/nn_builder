<script>
    import Node from './Node.svelte';
    export let p_className;
    export let p_id;
    export let occupiedBy = null;

    let type = "input"
</script>

<div class={p_className} id={p_id}>
    {#if occupiedBy}
        {@html "<" + occupiedBy + " />"}
    {/if}
</div>

<style>
    .Cell {
    font-size: 16px;
    width: 40px;
    height: 40px;
    border: 1px solid black;
    display: inline-block;
    }
</style>