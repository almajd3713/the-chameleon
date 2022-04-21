let table = document.querySelector("#tableItems")
for(let i = 0; i < 25; i++) {
  table.appendChild(createNode({
    className: "tableItem"
  }))
}