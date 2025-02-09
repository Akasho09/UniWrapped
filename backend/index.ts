import express from 'express'

const app  = express()

app.get("/", (req,res)=>{
    res.send("Home Page")
})
app.get("/login", (req,res)=>{
    res.send("Login Page")
})

app.listen(3000, ()=>{
    console.log("Server started at 3000")
})
