import nodemailer from 'nodemailer'
import User from '../lib/modals/user';
import bcryptjs from 'bcryptjs'

export const sendEmail=async({email, emailType ,userId}:any)=>{
  try {
// configure mail for usage
const hashedToken= await bcryptjs.hash(userId.toString() , 10)

if(emailType==="VERIFY"){
  await User.findByIdAndUpdate(userId ,{
    $set:{
       verifyToken:hashedToken , verifyTokenExpiry:Date.now()+3600000
    }
  })
} else if(emailType==="RESET"){
  await User.findByIdAndUpdate(userId , {
    $set:{
     forgetPasswordToken:hashedToken , forgetPasswordTokenExpiry:Date.now()+3600000
    }
  })
}

// Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6649d0d8c7a2ce", // 🔥🔥
    pass: "1c98f8ed9c0b5a", // 🔥🔥
  }
});

 const mailOptions={
    from: 'adityasmjain@gmail.com',
    to: email,
    subject: emailType==="VERIFY" ? "Verify your email":"Reset your password",
    html: `<b>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a> to ${emailType ==="VERIFY"?"verify your email." :"reset your password."}</b>`, // HTML body
 }
 const mailResponse = await transport.sendMail(mailOptions)
 return mailResponse
  } catch (error:any) {
    throw new Error(error.message)
  }
}