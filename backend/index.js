const port = 3000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect("mongodb+srv://surepararasa:SUREKA2828@cluster0.lmxtbby.mongodb.net/e-commerce");

//API Creation
app.get("/upload",(req,res)=>{
    res.send("Express App is Running")
})

//Image storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)

    }
})

const upload = multer({storage:storage})


//Create upload Endpoint for images

app.use('/images',express.static('upload/images'))


app.post("/upload",upload.single('product'),(req,res)=>{
    if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
    }
    res.json({
       "success":1,
       "Image_url":`http://localhost:${port}/images/${req.file.filename}`
    })
})

 app.listen(port,(error)=>{
    if(!error) {
        console.log("Server Running on Port"+port)
    }
    else
    {
        console.log("Error : "+error)
    }
})