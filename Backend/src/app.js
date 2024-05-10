import cookieParse from 'cookie-parser';
import cors from 'cors'

import express from 'express'

const app = express();

app.use(cors())

app.use(cookieParse());

app.use(express.json({limit:'16kb'}))

app.use(express.urlencoded({extended:true,limit:'16kb'}))

app.use(express.static("public"));
console.log("app");


import userRoute from './routes/user.routes.js';
app.use("/api/v1/user",userRoute);

export default app;
