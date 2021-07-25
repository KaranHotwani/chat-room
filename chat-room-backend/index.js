import { request } from "http";
import { RoomSchemaModel,
    ChatSchemaModel} from "./mongoose/models/schema"
const app = require("express")();
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json());
require("./mongoose/connect_db/mongoose");
const httpServer = require("http").createServer(app);
const options = {
    cors:{
        origin:["http://localhost:3000"]
    }
};
const io = require("socket.io")(httpServer, options);

io.on("connection", socket => { 
    console.log(socket.id);
    socket.on("chat",(chat)=>{
        console.log("received chat",chat);
        socket.broadcast.emit("received-msg",chat);
    })
});

app.get("/",(request,response)=>{
    console.log("This is get");
    response.send("This is get");
})

app.post("/create-room",async(request,response)=>{
    const body = request.body;
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
        var room = new RoomSchemaModel({
            roomId:body.roomId.toString(),
            link:body.link,
            participants:[body.userName]
        });

        await room.save();
        response.send({roomCreated:true,error:null})


    }
    catch(e)
    {
        if(!response.headersSent)
        {
            response.send({roomCreated:false,error:e})
        }
    }
})
app.post("/join-room",async(request,response)=>{
    const body = request.body;
    try{
        if(!body.hasOwnProperty("roomId"))
        {
            throw Error("Missing roomId in body")
        }
        RoomSchemaModel.findById(body.roomId)
        var room = new RoomSchemaModel({
            roomId:body.roomId.toString(),
            link:body.link,
            participants:[body.userName]
        });

        await room.save();
        response.send({roomCreated:true,error:null})


    }
    catch(e)
    {
        if(!response.headersSent)
        {
            response.send({roomCreated:false,error:e})
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