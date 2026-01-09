import { range, numberToLetter } from "./utils.js";
import { selectCell, clearSelection, Cell } from "./logic.js";

const REM = parseFloat(getComputedStyle(document.documentElement).fontSize)

const DATA_MIN_HEIGHT = 30
const DATA_MAX_HEIGHT = 256
const DATA_MIN_WIDTH  = 26
const DATA_MAX_WIDTH  = 50

var dataOffset = 0
var dataWidth = DATA_MIN_WIDTH
var dataHeight = DATA_MIN_HEIGHT

var mainTbl = undefined

// call this sparingly, creates an entire table with row/col guides
function makeTable() {
    const tbl = document.createElement("table");
    tbl.id = "main-tbl"

    const colGuideData = range(0, dataWidth - 1).map((x) => numberToLetter(x))

    const colGuideEl = document.createElement("thead")
    colGuideEl.id = "col-helper"

    // there needs to be a dummy cell to align the column helper with the row
    // helper
    const dummyCell = document.createElement("td")
    dummyCell.id = "dummy-cell"
    colGuideEl.appendChild(dummyCell)

    for (const col of colGuideData) {
        const td = document.createElement("th")
        td.textContent = col
        colGuideEl.appendChild(td)
    }

    tbl.appendChild(colGuideEl)
    
    for (var i = 1; i <= dataHeight; i++) {
        const tr = document.createElement("tr")
        const rowGuideEl = document.createElement("th")
        rowGuideEl.textContent = i
        tr.appendChild(rowGuideEl)

        for (var j = 0; j < dataWidth; j++) {
            const td = document.createElement("td")
            {
                const [x, y] = [j+1, i]
                td.addEventListener("mousedown", (event) => onMouseDown(event, new Cell(x, y)))
                td.addEventListener("mouseup", (event) => onMouseUp(event, new Cell(x, y)))
            }
            tr.appendChild(td)
        }

        tbl.appendChild(tr)
    }
    
    mainTbl = tbl
    return tbl
}

function addLengthTable(value) {
    /*dataLength = Math.max(DATA_MIN_LENGTH, 
        Math.min(DATA_MAX_LENGTH, dataLength + value))*/
}

function dataToTable(tbl, data) {
    const tblRows = tbl.childNodes;

    for (var i = 1; i <= Math.min(dataHeight, data.length); i++) {
        const row = tblRows[i].childNodes

        for (var j = 1; j <= dataWidth; j++) {
            const cellData = data[i-1][j-1]
            if (cellData === undefined)
                break
            
            console.log(cellData)
            row[j].textContent = cellData
        }
    }

    return tbl
}

/*
@param {HTMLTableElement} tbl
@param {Array} data
*/
export function renderTable(tbl, data) {
    if (!tbl) {
        tbl = makeTable()
        if (data) {
            dataToTable(tbl, data)
        }
    }

    return tbl
}

export function indexCell(cell) {
    return mainTbl.childNodes[cell.y].childNodes[cell.x]
}

var mouseDownPos = undefined
function onMouseDown(event, cell) {
    const selection = getSelection()
    
    // if the selection is just one cell and the user is clicking on it again
    if (selection.start != undefined && selection.start.equals(selection.end) && cell.equals(selection.start)) {
        console.log("Turn into input text!")
    }

    clearSelection()
    mouseDownPos = cell
    event.target.className = "select-start"
}

function onMouseUp(event, cell) {
    if (!mouseDownPos) {
        return
    }

    if (!cell.equals(mouseDownPos)) {
        event.target.className = "select-end"
    }

    selectCell(mouseDownPos, cell)
    mouseDownPos = undefined
}