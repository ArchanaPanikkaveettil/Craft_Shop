const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({

    username:{type:String,required:true},
    password:{type:String,required:true},   
    role:{type:String,required:true},
   
    
})

const loginModel = mongoose.model('login_tb',loginSchema);
module.exports = loginModel;