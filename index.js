import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';

const app=express();
dotenv.config();


app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded(({limit:"30mb",extended:true})));

app.use(cors({origin:"*"}));


app.use('/posts',postRoutes);
app.use('/user',userRoutes);

app.get('/',(req,res)=>{
    res.send("App is Running");
})



const CONNECTION_URL="mongodb+srv://Deebika:Karthish_06@cluster0.pfqdk.mongodb.net/?retryWrites=true&w=majority";
const PORT=process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true})
.then(()=>app.listen(PORT, ()=> console.log(`server running on a port : ${PORT}`)))
.catch((error)=>console.log(error.message));

// mongoose.set('useFindAndModify',false);