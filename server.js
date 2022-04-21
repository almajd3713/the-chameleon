// fix for __dirname
import { fileURLToPath } from "url"
import { dirname } from "path"
export const __dirname = dirname(fileURLToPath(import.meta.url))
// end of fix
import {require} from "./server/require.js"
import {Player} from "./server/classes.js"
import subjects from "./server/subjects.js"
import {shuffleArray} from "./server/util.js"
let express   = require("express"),
    app       = express(),
    port      = process.env.PORT || 3000
let {Server} = require("socket.io")

app.use(express.static(`${__dirname}/public`))

app.get("/", (req,res) => {
  res.sendFile()
})

let server = app.listen(port, () => console.log("server has started !"))

let io = new Server(server)

let currentPlayers = []
let currentSubject = {}
io.on("connection", socket => {
  if(currentPlayers.length) currentPlayers.forEach(player => socket.emit("newPlayer", player))
  
  socket.on("newPlayer", name => {
    let player = new Player(name, socket.id)
    currentPlayers.push(player)
    io.emit("newPlayer", player)
    if(Object.keys(currentSubject) > 0) socket.emit("adminSubjectChange", currentSubject)
  })



  socket.on("adminSubjectChange", newSubject => {
    currentSubject = subjects.find(subject => {
      if(newSubject && newSubject === "random") return subject.id === Math.ceil(Math.random() * (subjects.length - 1))
      else if(newSubject) return subject.name === newSubject
    })
    if(!currentSubject) socket.emit("adminSubjectChange", subjects)
    else {
      currentSubject.data = shuffleArray(currentSubject.data)
      io.emit("adminSubjectChange", currentSubject)
    }
  })
  socket.on("disconnect", () => {
    // console.log(`user ${socket.id} disconnected :(`)
  })
})