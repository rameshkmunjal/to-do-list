const express=require('express');
const app=express();
const userController=require('./../controllers/userController');
const appConfig=require('./../config/appConfig');

let setRouter=(app)=>{
    let baseUrl=appConfig.apiVersion+"/todolist";
    //post request handling routes
    app.post(baseUrl+'/sign-up', userController.signupFunction);
    app.post(baseUrl+'/login', userController.loginFunction);
    app.post(baseUrl+'/resetPassword/:userId', userController.resetPassword);
    //get request handling routes
    app.get(baseUrl+'/demandOTP/:email', userController.demandOTP);
}

module.exports={
    setRouter:setRouter
}
