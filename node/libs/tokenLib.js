const jwt=require('jsonwebtoken');
const shortId=require('shortid');
const secretKey="Aquickbrownfoxjumpsoverthelazylittledog";

let generateToken=(data, cb)=>{
    try{
        let claims={
            jwtid:shortId.generate(),
            iat:Date.now(),
            exp:new Date("Dec 31, 2019").getTime()/1000,
            sub:'authToken',
            iss:'todolist',
            data:data
        }
        let tokenDetails={
            token:jwt.sign(claims, secretKey),
            tokenSecret:secretKey
        }
        cb(null, tokenDetails);
    }
    catch(err){
        cb(err, null);
    }
}//generateToken function ended

let verifyClaims=(token, secretKey, cb)=>{
    jwt.verify(token, secretKey, (err, decoded)=>{
        if(err){
            cb(err, null);
        } else{
            cb(null, decoded)
        }
    })
}

let verifyClaimsWithoutSecret=(token, cb)=>{
    jwt.verify(token, secretkey, (err, decoded)=>{
        if(err){
            cb(err, null);
        } else{
            cb(null, decoded);
        }
    })
}




module.exports={
    generateToken:generateToken,
    verifyClaims:verifyClaims,
    verifyClaimsWithoutSecret:verifyClaimsWithoutSecret
}