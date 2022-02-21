const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email:{
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

const AdminModel = mongoose.model("admin", AdminSchema);

module.exports = AdminModel;