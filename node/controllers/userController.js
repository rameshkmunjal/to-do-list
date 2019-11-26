const shortId=require('shortid');
const mongoose=require('mongoose');
const response=require('./../libs/responseLib');
const validateInput=require('./../libs/validationLib');
const check=require('./../libs/checkLib');
const passwordLib=require('./../libs/passwordLib');
const tokenLib=require('./../libs/tokenLib');
const emailLib=require('./../libs/emailLib');

require('./../models/user');
const UserModel=mongoose.model('User');
require('./../models/auth');
const AuthModel=mongoose.model('Auth');
require('./../models/otp');
const OTPModel=mongoose.model('otp');

//--------------------------------------Signup function--------------------------------------------------
function signupFunction(req, res){
    console.log("signup function started");

    let validateUserInput=()=>{
        console.log("validate user input function called");
        return new Promise((resolve, reject)=>{
            if(req.body.email){
                console.log(req.body.email);
            if(!validateInput.Email(req.body.email)){
                let apiResponse=response.generate(true, "Email address is not as per format", 400, null);
                reject(apiResponse);
            }else if(check.isEmpty(req.body.password)){
                let apiResponse=response.generate(true, "Password is not as per format", 400, null);
                reject(apiResponse);
            } else{
                console.log("validate user input function successful");
                resolve(req);
            }
        }
            else {
                let apiResponse=response.generate(true, "Email address field is blank", 400, null);
                res.send(apiResponse);
            }
        })
    }

    let createUser=()=>{
        console.log("create user function started")
        return new Promise((resolve, reject)=>{
            UserModel.findOne({email:req.body.email}).exec((err, result)=>{
                if(err){
                    console.log(err);
                    let apiResponse=response.generate(true, "Some error occurred", 500, null);
                    reject(apiResponse);
                } else if(check.isEmpty(result)){
                    let newUser=new UserModel({
                        userId:shortId.generate(),
                        firstName:req.body.firstName,
                        lastName:req.body.lastName,
                        email:req.body.email,
                        password:passwordLib.hashPassword(req.body.password),
                        mobile:req.body.mobile
                    })
    
                    newUser.save((err, result)=>{
                        console.log("result"+result);
                        if(err){ console.log(err); }
                        else {
                            let newUser=result.toObject();
                            console.log(newUser);
                            resolve(newUser);
                        }
                    })//save method ended
                    
                } else{
                    let apiResponse=response.generate(true, "User with this email already exists", 500, null);
                    reject(apiResponse);
                }
            })
        })

    }

    validateUserInput(req, res)
        .then(createUser)
        .then((resolve)=>{
            let apiResponse=response.generate(false, "User created successfully", 200, resolve);
            res.send(apiResponse);
        })
        .catch((err)=>{            
            res.send(err);
        })    
}

//--------------------------------------Login function--------------------------------------------------
function loginFunction(req, res){
    //find user
    let findUser=()=>{
        return new Promise((resolve, reject)=>{
            UserModel.findOne({email:req.body.email})
                .exec((err, userDetails)=>{
                    if(err){
                        console.log(err);
                        let apiResponse=response.generate(true, "Some error occurred", 500, null);
                        reject(apiResponse);
                    } else if(check.isEmpty(userDetails)){
                        console.log("No Data found");
                        let apiResponse=response.generate(true, "No Data found", 404, null);
                        reject(apiResponse);
                    }else {
                        console.log("user with this email found - proceed further");
                        resolve(userDetails);
                    }
                })
        })
    }
    //validate password
    let validatePassword=(userDetails)=>{
        //console.log("user details found");
        //console.log(userDetails);
        return new Promise((resolve, reject)=>{
            
            passwordLib.comparePassword(req.body.password, userDetails.password, (err, isMatch)=>{
                if(err){
                    console.log(err);
                    let apiResponse=response.generate(true, "Some error occurred", 500, null);
                    reject(apiResponse);
                } else if(isMatch){
                    console.log("password matched");
                    //console.log(userDetails);
                    let userDetailsObj=userDetails.toObject();
                    delete userDetailsObj.password;
                    delete userDetailsObj._id;
                    delete userDetailsObj.__v;
                    resolve(userDetailsObj);
                } else{
                    let apiResponse=response.generate(true, "Wrong Password : Login Failed", 400, null);
                    reject(apiResponse);
                }
            })
        })
    }
    //generate token
    let generateToken=(userDetails)=>{
        console.log("generateToken started");
       // console.log(userDetails);
        return new Promise((resolve, reject)=>{
            tokenLib.generateToken(userDetails, (err, tokenDetails)=>{
                if(err){
                    console.log(err);
                    let apiResponse=response.generate(true, "Failed to generate token", 500, null);
                    reject(apiResponse);
                } else{
                    tokenDetails.userId=userDetails.userId;
                    tokenDetails.userDetails=userDetails;
                    console.log("here is token details");
                    //console.log(tokenDetails);
                    resolve(tokenDetails);
                }
            })
        })
    }

    let saveToken=(tokenDetails)=>{
        return new Promise((resolve, reject)=>{
            AuthModel.findOne({userId:tokenDetails.userId}, (err, retrievedTokenDetails)=>{
                if(err){
                    console.log(err);
                    let apiResponse=response.generate(true, "Failed to generate token", 500, null);
                    reject(apiResponse);
                } else if(check.isEmpty(retrievedTokenDetails)){
                    console.log("No data found");
                    let newAuthToken=new AuthModel({
                        userId:tokenDetails.userId,
                        authToken:tokenDetails.token,
                        tokenSecret:tokenDetails.tokenSecret,
                        tokenGenerationTime:Date.now()
                    })
                    newAuthToken.save((err, newTokenDetails)=>{
                        if(err){
                            console.log(err);
                            let apiResponse=response.generate(true, "Failed to generate token", 500, null);
                            reject(apiResponse);
                        }else{
                            let responseBody={
                                authToken:newTokenDetails.authToken,
                                userDetails:tokenDetails.userDetails
                            }
                            resolve(responseBody);
                        }
                    })//save method ended
                } else {
                    console.log("Here is else block of save token");
                    retrievedTokenDetails.authToken=tokenDetails.token;
                    retrievedTokenDetails.tokenSecret=tokenDetails.tokenSecret;
                    retrievedTokenDetails.tokenGenerationTime=Date.now();
                    retrievedTokenDetails.save((err, newTokenDetails)=>{
                        if(err){
                            console.log(err);
                        } else {
                            let responseBody={
                                authToken:newTokenDetails.authToken,
                                userDetails:tokenDetails.userDetails
                            }
                            resolve(responseBody);
                        }
                    })
                }
            })
        })
    }

    //save token
    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve)=>{
            console.log(resolve);
            let apiResponse=response.generate(false, "Login Successful", 200, resolve);
            res.send(apiResponse);
        })   
        .catch((err)=>{
            res.send(err);
        })
}
//--------------------------------------DemandOTP function--------------------------------------------------
let demandOTP=(req, res)=>{
    
    let createOTP=()=>{
        return new Promise((resolve, reject)=>{
            console.log("Email : "+req.params.email);
                UserModel.findOne({email:req.params.email}).exec((err, userDetails)=>{
                    if(err){
                        console.log(err);
                        let apiResponse=response.generate(true, "Some error occurred", 500, null);
                        reject(apiResponse);
                    } else if(check.isEmpty(userDetails)){
                        console.log("No data found");
                        let apiResponse=response.generate(true, "Failed to access data ",404, null);
                        reject(apiResponse);
                    } else {
                        let otp=new OTPModel({
                            otpId:shortId.generate(),
                            userId:userDetails.userId,
                            otp:Math.floor(Math.random()*9000+1000),
                            createdOn:Date.now(),
                            email:userDetails.email
                        })

                        otp.save((err, otpDetails)=>{
                            if(err){
                                console.log(err);
                                let apiResponse=response.generate(true, "Failed to save OTP", 500, null);
                                reject(apiResponse);
                            } else{
                                //resolve(otpDetails);
                                emailLib.sendOTP(otpDetails.otp, otpDetails.email);
                                resolve(otpDetails);
                            }
                        })
                    }
            })            
        })
    }
    createOTP(req, res)
        .then((resolve)=>{
            console.log("Here send otp id");
            console.log(resolve);
            let apiResponse=response.generate(false, "otp id sent to client side", 200, resolve);
            res.send(apiResponse);
        })
        .catch((err)=>{
            console.log(err);
            res.send(err);
        })
    
}
//--------------------------------------reset password function--------------------------------------------------
let resetPassword=(req, res)=>{
    UserModel.findOne({userId:req.params.userId})
        .exec((err, userDetails)=>{
            if(err){
                console.log(err);
            } else if(check.isEmpty(userDetails)){
                console.log("no data found");
            } else {
                console.log("password sent in req body");
                console.log(req.body.password);
                userDetails.password=passwordLib.hashPassword(req.body.password);
                userDetails.save((err, user)=>{
                    if(err){
                        console.log(err);
                    } else{
                        console.log(user);
                        res.send(user);
                    }
                })
            }
        })
}



module.exports={
    signupFunction:signupFunction,
    loginFunction:loginFunction,
    demandOTP:demandOTP,
    resetPassword:resetPassword
}