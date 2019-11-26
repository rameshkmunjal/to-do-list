const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let OTP=new Schema({
    otpId:{type:String, unique:true},
    userId:{type:String},
    otp:{type:Number},
    createdOn:{type:Date, default:Date.now()},
    email:{type:String, default:''}
})

module.exports=mongoose.model('otp', OTP);






