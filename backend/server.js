require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const authRoutes=require('./routes/auth');
const notesRoutes=require('./routes/notes');

const app=express();
app.use(cors());
app.use(express.json());

app.use('/auth',authRoutes);
app.use('/notes',notesRoutes);


const PORT=process.env.PORT || 5000;
const MONGO=process.env.MONGO_URL || 'mongodb://localhost:27017/notes_app_test';

mongoose.connect(MONGO).then(()=>{
    console.log('connected to mongo db');
    app.listen(PORT,()=>{
        console.log("server is running",PORT);
    })
}).catch(err=>console.log('mongoDB connection error',err));