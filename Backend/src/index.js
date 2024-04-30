import express from 'express'
import connectDB from './db/index.js';
import dotenv from "dotenv"
import app from '../src/app.js';

// const app = express();

dotenv.config({
    path : "./.env"
})
// console.log(app);


connectDB()
.then((res)=>{
    app.listen(8000,function (params) {
        console.log("App is listenting on port "+8000)
    })
})
.catch((err)=>{
    console.log("Error || ",err)
})


