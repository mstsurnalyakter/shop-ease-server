const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("Welcome to Shop Ease");
})

app.listen(port,()=>{
    console.log(`ShopEase is running at: http://localhost:${port}`);
})