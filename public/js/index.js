
import {createNode} from "./util.js"

playerNameInput.children[0].focus()

for(let i = 0; i < 25; i++) {
  wordsTable.appendChild(createNode({
    className: "tableItem"
  }))
}

playerNameInput.addEventListener("submit", e => {
  e.preventDefault()
  let playerName = new FormData(playerNameInput).get("playerName")
  playerNameInput.children[0].disabled = true
  socket.emit("newPlayer", playerName)
})
socket.on("newPlayer", player => {
  let playerNode = createNode({
    className: "playerRow",
    subNodes: [
      { className: "playerName", textContent: player.name },
      { className: "playerHintRes" },
      { className: "playerVoteRes" }
    ]
  })
  player.box = playerNode
  currentPlayers.push(player)
  playersTable.appendChild(playerNode)
  if (socket.id === player.id) {
    clientPlayer = player
    popupContainer.style.transform = "scale(0)"
  }
})
