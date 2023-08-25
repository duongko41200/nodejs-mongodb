const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

try {
    const connect = mongoose.connect('mongodb://localhost:27017/newdate')
    console.log("kết nối db thành công")

} catch (error) {

    console.log("lỗi:", error)

}

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    age: Number

})
const UserModel = mongoose.model("book", UserSchema)

// const user = new UserModel({name:'duong',age:'10'})
// user.save().then(function(user){
//     console.log("user là : ",user)
// }).catch(function(err){
//     console.log({err})
// })


app.get("/getuser", async (req, res) => {


    try {

        const user = await UserModel.find({})
        console.log("user dsfsdfsdfsdf: ", user)
        return res.status(200).json({
            mess: "success",
            data: user

        })

    } catch (error) {

        console.log("lỗi:", error)

    }

})

app.post("/createUser", async (req, res) => {
    const name = req.body.name
    const age = req.body.age

    try {
        const createUser = await UserModel.create({ name: name, age: age });
        return res.status(200).json({
            mess: "success",
            data: {
                name: createUser.name,
                age: createUser.age
            }
        })


    } catch (error) {
        console.log("lỗi:", error)
    }
})
app.delete("/deleteUser/:id", async (req, res) => {

    const id = req.params.id
    console.log("id là:", id)
    try {
        const deleteUser = await UserModel.findByIdAndDelete(id)
        console.log("res là:", deleteUser)
        return deleteUser.status(200).json({
            mess: "success",
        })


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            mess: "error",
            data: []
        })
    }




})

app.put("/updateUser/:id", async (req, res) => {

    const id = req.params.id
    console.log("id là:", id)
    try {
        const updateUser = await UserModel.findByIdAndUpdate(id,{
            name:req.body.name,
            age:req.body.age
        })

        return res.status(200).json({
            mess: "success",
            data:{
                name:req.body.name,
                age:req.body.age
            }
            
        })


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            mess: "error",
            data: []
        })
    }

})




app.listen(8000, () => {


    console.log("server start")
})