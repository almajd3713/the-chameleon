// fix for __dirname
import { fileURLToPath } from "url"
import { dirname } from "path"
export const __dirname = dirname(fileURLToPath(import.meta.url))
// end of fix

import {require} from "./server/require.js"
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

io.on("connection", socket => {
  // console.log(`user ${socket.id} connected :D`)

  socket.on("disconnect", () => {
    // console.log(`user ${socket.id} disconnected :(`)
  })
})