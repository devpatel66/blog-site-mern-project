import cookieParse from 'cookie-parser';
// import cros from 'cros'

import express from 'express'

const app = express();

// app.use(cros({
//     origin: '*',
//   }))

app.use(cookieParse());

app.use(express.json({limit:'16kb'}))

app.use(express.urlencoded({extended:true,limit:'16kb'}))

app.use(express.static("public"));
console.log("app");


import userRoute from './routes/user.routes.js';
app.use("/api/v1/user",userRoute);

export default app;
