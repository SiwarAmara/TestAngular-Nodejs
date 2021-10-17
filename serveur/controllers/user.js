const User = require("../models/user")
const {validationResult} = require('express-validator')
const user = require("../models/user")
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
const crypto = require("crypto");
var expressJwt = require('express-jwt')

//mail sender details 
var transporter = nodemailer.createTransport({
service:'gmail',
auth:{
  user:'shorturltest1996@gmail.com',
  pass:'siwar1996'
},
tls:{
  rejectUnauthorized:false
}

})



exports.signup = (req, res) => {
 
  const errors = validationResult(req)
 
   if(!errors.isEmpty()) {
     return res.status(400).json({
       error: errors.array()[0].msg
     })
   }
   
   
  const user = new User(req.body);
  user.emailToken=crypto.randomBytes(64).toString('hex');
   user.save((err, user) => {
     if(err) {
       console.log(err);
       return res.status(400).json({
         error: "Unable to add user"
       })
     }
    var mailOptions={
      from:'"Verify your email" <shorturltest1996@gmail.com>',
      to: user.email,
      subject:'Verfiy your email',
      html:`<h2> ${user.name}! Thanks for registering on our site </h2> <h4> Please verify your email to continue ...</h4><a href="http://localhost:8000/api/verify-email?token=${user.emailToken}">verfiy Your Email </a>`
    }

  //sending mail
  transporter.sendMail(mailOptions,function(error,info){
      if(error){
        console.log(error)
      }
      else{
          console.log('Verification email is sent to your gmail account')
        }
        })
     return res.json({
       message: "Success",
       user
     })
   })
   
 }
 
exports.signin = (req, res) => {
  const {email, password} = req.body

  User.findOne({email}, (err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "Email was not found"
      })
    }

  

    // Authenticate user
    if(!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match"
      })
    }

    // Verify Email

    if(!user.validationEmail){
      return res.status(400).json({
        error: "Email not verifed"
      })
    }

    // Create token
    const token = jwt.sign({_id: user._id}, process.env.SECRET)

    // Put token in cookie
    res.cookie('token', token, {expire: new Date() + 1})

    // Send response
    const {_id, name, email,validationEmail} = user
    return res.json({
      token,
      user: {
        _id,
        name,
        email,
        validationEmail
      }
    })
    
  })
}

exports.verify = async (req, res) => {
  const emailToken = req.query.token

  User.findOne({emailToken:emailToken}, (err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "Email was not found"
      })
    }


    if(user){
      user.validationEmail = true;
      user.save()
    }
    res.redirect('http://localhost:4200/Verify-email');
    
  })
}

exports.signout = (req, res) => {
  res.clearCookie("token")
  return res.json({
    message: "User siginout successful"
  })
}