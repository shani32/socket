const express= require ('express')
const socket= require ('socket.io')
const cors= require('cors')
const app= express()


app.use(cors())
app.use(express.json())
// const port= process.env.PORT || 5000

const server=app.listen(3004, ()=>{
    console.log(`connect to port 3004`)
})

io=socket(server)
io.on('connection', (socket)=>{
    console.log(socket.id)

    socket.on('join_room', (data)=>{
        socket.join(data)
        console.log('User Joined Room' + data)
    })
    socket.on("disconnect", ()=>{
        console.log("user disconnected")
    })
})