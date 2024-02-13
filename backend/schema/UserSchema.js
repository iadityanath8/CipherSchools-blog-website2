import mongoose from "mongoose";
import { Schema } from "mongoose";

import Blog from "./BlogSchema.js";

const userScheme = new Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    articles:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    }]
})

export const User = mongoose.model('User',userScheme);
export default User;
