const nodemailer=require('nodemailer');

let sendOTP=(otp, email)=>{
    console.log(otp, email);
    const output=`<h2>Password Recovery Mail</h2>
                    <p>Please use OTP to reset password</p>
                    <p>${otp}</p>`;

    let transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user:'rkm120562@gmail.com',
            pass:'rkm@100283'  
        },
        tls:{
            rejectUnauthorised:false
        }
    })

    let mailOptions={
        from:'rkm120562@gmail.com',
        to: email,
        subject:'Password Recovery Mail'  ,
        text:'Hello Sir/Madam'  ,
        html:output
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            return console.log(error);
        } 

        console.log('Preview URL: %s', getTestMessageUrl(info));
        res.render('contact', {msg:'Email has been sent'});
    })

}

module.exports={
    sendOTP:sendOTP
}