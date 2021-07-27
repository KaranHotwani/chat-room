const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
const { db } = require("./firebase_config");
const httpServer = require("http").createServer(app);
const admin = require("firebase-admin");
const options = {
    cors:{
        origin:["http://localhost:3000"]
    }
};
const io = require("socket.io")(httpServer, options);

io.on("connection", socket => { 
    console.log(socket.id);
    socket.on("chat",(chat,room)=>{
        console.log("received chat ",chat," room ",room);
        socket.to(room).emit("received-msg",chat);
    })
    socket.on("join-room",(roomId)=>{
        console.log("join room request on socket",roomId);
        socket.join(roomId);
    })
});

app.get("/",(request,response)=>{
    console.log("This is get");
    response.send("This is get");
})

app.post("/create-room",async(request,response)=>{
    const body = request.body;
    console.log(body);
    try{
        if(!body.hasOwnProperty("roomId"))
        {
            throw Error("Missing roomId in body")
        }
        if(!body.hasOwnProperty("link"))
        {
            throw Error("Missing link in body")
        }
        if(!body.hasOwnProperty("userName"))
        {
            throw Error("Missing userName in body")
        }
        const data = {
            roomId:body.roomId,
            link:body.link,
            userName:body.userName,
            participants:[body.userName],
        }
        await db.collection("rooms").doc(data.roomId).set(data);
        response.send({roomCreated:true,error:null});

    }
    catch(e)
    {
        console.error(e);
        if(!response.headersSent)
        {
            response.send({roomCreated:false,error:e})
        }
    }
})
app.post("/join-room",async(request,response)=>{
    const body = request.body;
    console.log(body);
    try{
        if(!body.hasOwnProperty("roomId"))
        {
            throw Error("Missing roomId in body")
        }
        if(!body.hasOwnProperty("userName"))
        {
            throw Error("Missing userName in body")
        }
        await db.collection("rooms").doc(body.roomId).update({
            participants: admin.firestore.FieldValue.arrayUnion(body.userName)
        });
        response.send({roomJoined:true,error:null})
        

    }
    catch(e)
    {
        if(!response.headersSent)
        {
            response.send({roomJoined:false,error:e})
        }
    }
})

httpServer.listen(3001,()=>console.log("Listening on port 3001"));

// const io = require("socket.io")(3001,{
//     cors:{
//         origin:["http://localhost:3000"]
//     }
// });

// io.on("connection",socket=>{
//     console.log(socket.id);
//     socket.on("chat",(chat)=>{
//         console.log("received chat",chat);
//         socket.broadcast.emit("received-msg",chat);
//     })
// })