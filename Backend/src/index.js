import express from 'express'
import connectDB from './db/index.js';
import dotenv from "dotenv"

dotenv.config({
    path : "./.env"
})
const app = express();

app.get("/",(req,res)=>{
    res.send("Test fnrom backend")
})

connectDB();


app.listen(8000,function (params) {
    console.log("App is listenting on port "+8000)
})