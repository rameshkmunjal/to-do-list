const bcrypt=require('bcrypt');
const saltRounds=10;

let hashPassword=(myPlainTextPassword)=>{
    let salt=bcrypt.genSaltSync(saltRounds);
    let hash=bcrypt.hashSync(myPlainTextPassword, salt);
    return hash;
}



let comparePassword=(oldPassword, hashPassword, cb)=>{
    console.log("compare password");
    console.log(oldPassword);
    console.log(hashPassword);
    bcrypt.compare(oldPassword, hashPassword, (err, res)=>{
        if(err){
            console.log("ERROR IN PASSWORD COMPARISON");
            cb(err, null)
        } else{
            console.log("RESPONSE OF PASSWORD COMPARISON");
            console.log(res);
            cb(null, res)
        }
    })
}

module.exports={
    hashPassword:hashPassword,
    comparePassword:comparePassword
}