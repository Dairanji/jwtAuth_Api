const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    password: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        default: true
    }
})

const AuthModel = mongoose.model("student_register", AuthSchema);

module.exports = AuthModel;