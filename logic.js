import { NotImplementedError } from "./utils.js"
import { indexCell } from "./render.js"
import { numberToLetter } from "./utils.js"

export class Cell {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    equals(other) {
        return this.x === other.x && this.y === other.y
    }

    toString() {
        return `${numberToLetter(this.x-1)}${this.y}`
    }
}

/**
 * Range of cells.
 * The start is guaranteed to come before the end,
 * so if end = (x = 5, y = 4), then start = (x <= 5, y <= 4)
 */
export class Range {
    constructor(start, end) {
        if (start.x > end.x) 
            [start.x, end.x] = [end.x, start.x];

        if (start.y > end.y)
            [start.y, end.y] = [end.y, start.y];

        this.start = start
        this.end = end
    }

    toString() {
        return `${this.start.toString()}:${this.end.toString()}`
    }
}

/**
 * Current selection on spreadsheet.
 * Can be either `Cell`, `Range` or null. Check at runtime.
 */
var selection = null
function getSelection() {
    return selection
}

export function clearSelection() {
    selection = null
    $(".select-start").removeClass("select-start")
    $(".select-end").removeClass("select-end")
}

export function selectCell(start, end) {
    selection = start.equals(end) ? start : new Range(start, end)

    console.log(selection.toString())
}

$(document).on("keydown", (event) => {
    if (event.key == "Escape") {
        clearSelection()
    }
})

