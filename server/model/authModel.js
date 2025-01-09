import mongoose from "mongoose";


const authSchema = new mongoose.Schema({
    // name:{
    //     type: String,
    //     required: true,
    // },
    email:{
        type: String,
        required: true,
    },
    // profilePic:{
    //     type: String,
    //     required: true,
    // },
    // password:{
    //     type: String,
    //     required: true,
    // },
    // role:{
    //     type: String,
    //     default: "user"
    // },
},{timestamps: true})

export const User = mongoose.model("User", authSchema)