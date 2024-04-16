import express from 'express'

const app = express();

app.get("/",(req,res)=>{
    res.send("Test fnrom backend")
})


app.listen(8000,function (params) {
    console.log("App is listenting on port "+8000)
})