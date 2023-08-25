const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/duong')

const UserSchema = new mongoose.Schema({

        name:String,
        age:Number

})
const UserModel = mongoose.model("user",UserSchema)

// const user = new UserModel({name:'duong',age:'10'})

app.get("/getuser", async(req,res)=>{

    const user = await UserModel.find({})
    console.log("user: ", user)

    // console.log("body ", res)

    // UserModel.find({}).then(function(user){

    //     res.json(user)
    //     console.log("user laf ;",user)
    // }).catch(function(err){
    //     console.log({err})
    // })
})


app.listen(8000,()=>{


    console.log("server start")
})