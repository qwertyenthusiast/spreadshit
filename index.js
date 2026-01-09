import { renderTable } from "./render.js"

const tbl = renderTable(undefined, data)
document.querySelector("#tbl-container").append(tbl)