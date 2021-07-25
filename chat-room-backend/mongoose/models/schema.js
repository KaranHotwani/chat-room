const mongoose = require("mongoose");

import moongose from "mongoose";
//write your code for subjects collection here - model

var roomSchema = mongoose.Schema({
    roomId:{
        type:"String",
        required:true
    },
    link:{
        type:"String",
        required:true
    },
    participants:{
        type:"Array",
        required:true
    }
})

var chatSchema = mongoose.Schema({
    chatData:{
        type:"String",
        required:true
    },
    likedBy:{
        type:"Array",
        required:true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

var RoomSchemaModel = mongoose.model("room",roomSchema);
var ChatSchemaModel = mongoose.model("chat",chatSchema);
module.exports = {
    RoomSchemaModel,
    ChatSchemaModel
}