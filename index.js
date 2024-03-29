const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");
require('dotenv').config();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:process.env.ORIGIN, // here is the server where the data came from, we must put whit a enviroment variables
        methods:["GET","POST"]
    }
});

io.on("connection",(socket)=>{
    socket.on("join_room",(data)=>{
        socket.join(data);
    })
    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data)
    })
    socket.on("disconnect",()=>{
        console.log("User Disconnected",socket.id)
    })
})

server.listen(3001,()=>{
    console.log('SERVER RUNNIG');
})