const jwt = require('jsonwebtoken')
const{JWT_SECRET} = require('../key')
const mongoose = require('mongoose')
const User = mongoose.model("user")


module.exports=(req,res,next)=>{
    const {authorization} = req.headers
    //authorization =  bearer ibufbcjbgdke
    if(!authorization){
       res.status(401).json({error:"you must be logged in"})
    }


const token = authorization.replace("Bearer ","")
jwt.verify(token,JWT_SECRET,(err,payload)=>{
    if(err){
      return  res.status(401).json({error:"you must be logged in"})
  
    }

    const {_id} = payload
    User.findById(_id).then(userdata=>{
        req.user = userdata
        next()

    })
})
}