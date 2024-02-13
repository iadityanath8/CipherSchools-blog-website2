import mongoose from "mongoose";
import { Schema } from "mongoose";

export const blogSchema = new Schema({
    title:{
        type:String,
        unique:true,
    },
    image:{
        type:String,
    },
    content:{
        type:String,
    },
    author:{
        type:String,
    },
    likes:{
        type:Number,
        default:0
    },
    likedBy:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    createdAt:{type:Date,default:Date.now}
});

export const Blog = mongoose.model('Blog',blogSchema)

export default Blog;