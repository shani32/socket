const express= require ('express')
const socket= require ('socket.io')
const cors= require('cors')
const app= express()


app.use(cors())
app.use(express.json())
// const port= process.env.PORT || 5000

const server=app.listen(3000, ()=>{
    console.log(`connect to port 3000`)
})

io=socket(server)
io.on('connection', (socket)=>{
    console.log(socket.id)

    socket.on('join_room', (data)=>{
        socket.join(data)
        console.log('User Joined Room' + data)
    })

    socket.on("send_message", (data)=>{
        console.log(data)
        socket.to(data.room).emit("receive_message", data.content)
    })


    socket.on("disconnect", ()=>{
        console.log("user disconnected")
    })
})