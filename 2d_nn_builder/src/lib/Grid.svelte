<script>
    import Cell from "./Cell.svelte";

    export let p_rowNum = 20;
    export let p_colNum = 20;
    export let p_gridId = "grid" 
    export let p_cellClassName = "Cell"



    //         this.cells = this.cells = new Array(p_rowNum).fill(new Array(p_colNum)); //2D array of nodes
    //         for (let i = 0; i < p_rowNum; i++) {
    //             for (let j = 0; j < p_colNum; j++) {
    //                 const cell = document.createElement("div");
    //                 cell.className = p_cellClassName; //styles in css
    //                 cell.id = i + ',' + j;
    //                 this.cells[i][j] = cell;
    //                 this.DOMRepresentation.appendChild(cell);
    //             }
    //             const linebreak = document.createElement("br");
    //             this.DOMRepresentation.appendChild(linebreak);
    //         }
    //         document.body.appendChild(this.DOMRepresentation);
    //     }
    
    //     //methods
    //     getNodeAtCell(x, y) {
    //         return this.cells[x][y].firstChild;
    //     }
    //     setNodeAtCell(x, y, node) {
    //         this.cells[x][y].appendChild(node);
    //     }
    // }
    </script>

    <div id={p_gridId}>
        {#each {length: p_rowNum} as _,i}
            {#each {length: p_colNum} as _,j}
                <Cell p_className={p_cellClassName} p_id={i + ',' + j} />
            {/each}
            <br />
        {/each}
    </div>

<style>
    #grid {
    font-size: 0;
    }
</style>