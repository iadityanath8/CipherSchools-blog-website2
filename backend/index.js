import express from 'express';
import mongoose from 'mongoose';
import Blog from './schema/BlogSchema.js';
import bcrypt, { compareSync } from 'bcrypt';
import User from './schema/UserSchema.js';
import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
import CircularJSON  from 'circular-json'
import authenticate_token from './middleware/authenticator.js';
import cors from 'cors';

config()

const URI = process.env.URI;
const PORT = 3001;
const app = express()
const secret_key = process.env.secret_key

app.use(express.json())
app.use(cors())

async function connectToMongoDB() {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB is connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();  

app.post('/api/blogs/create',authenticate_token,async (req,res) => {
    const {title,image,content,author} = req.body;

    const user = await User.findById(req.user.id,'username');
  

    if(!user){
      res.status(500).send({message:"User not found preety sure website hacked"})
      return;
    }
    console.log(req.user)
    try {       
      const blog = new Blog({
        title,
        image,
        content,
        author:user.username
      });
      
      await blog.save();

      console.log(blog)
      await User.updateOne(
        {_id:req.user.id},
        {$push:{articles:blog._id}}
      )

      res.status(201).send({message:"Blog uploaded successfully"});

    } catch (error) {
      res.status(404).send({message:"Blog creation failed"});
    }
  }
)

app.post('/api/register',async (req,res) => {
  try {
    const hashed_pass = await bcrypt.hash(req.body.password,10);
    const {username, email} = req.body;

    const user = new User({
      username,
      email,
      password:hashed_pass
    });

    await user.save();
    res.status(201).send({message:"User created successfully"});

  } catch (error) {
    res.status(500).send(error.message);
  }
})

app.post('/api/login',async (req,res) => {
  try {
    const user = await User.findOne({username:req.body.username})
    
    if(!user){
      return res.status(404).send({message:"User Not found"});
    }

    const cpass = await bcrypt.compare(req.body.password,user.password);
    if(!cpass){
      return res.status(404).send({message:"Password incorrect"});
    }

    const token = jwt.sign({id:user._id},secret_key,{expiresIn:'1h'});
    res.status(200).send({token});
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.get('/api/blogs',authenticate_token,async (req,res) => {
  try {
    const blogs = await Blog.find();

    res.status(201).send(blogs)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.get('/api/blogs/:id',authenticate_token,async (req,res) => {
  try {
    const id = req.params.id;
    const article = await Blog.findById(id);
    res.status(201).json(article)
  } catch (error) {
    res.status(404).send({message:"Could not find articles"})
  }
})

app.post('/api/blogs/:id/like',authenticate_token,async (req,res) => {
  try {
    const id = req.params.id;

    await Blog.updateOne(
      {_id:id},
      {$push:{likedBy:req.user.id}}
    )
    await Blog.updateOne(
      {_id:id},
      {$inc:{likes:1}}
    )

    res.status(201).send({message:"Post liked successfully"})
  } catch (err) {
    res.status(404).send({message:"failed to like the Post"})
  }
})

app.get('/api/blogs/search/:username',authenticate_token,async(req,res) => {
  try {
    const username = req.params.username;
    const articles = await User.find({username},'articles')
    const appender = []

    for(const i of articles[0].articles){
      const farticles = await Blog.findById(i);
      appender.push(farticles)
    }

    res.status(201).json(appender)
  } catch (err) {
    res.status(404).send({message:"Could not find articles"})
  }
})


app.listen(PORT,() => {
    console.log(`server is listenong in port ${PORT}`)
})