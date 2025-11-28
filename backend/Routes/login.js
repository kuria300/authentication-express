const express= require('express')
const app= express()
const router= express.Router()
const User= require('../schemas/dbschema')
const bcrypt = require('bcrypt');




router.post('/', async (req, res, next)=>{
    const { email, password}= req.body

    try{

    if(!isValidEmail(email)){
      return res.status(400).json({errors:['Enter valid Email!']})
    }
    const emailDb= await User.findOne({email})

    
    if(!emailDb){
        return res.status(401).json({errors:['user not found']})
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ errors: ['Password must be at least 6 characters'] });
     }    
    
    const passCheck= bcrypt.compareSync(password, emailDb.password)
 
    if(!passCheck){
      return res.status(401).json({ errors: ['Incorrect password'] });
    }
    
    res.json({ message: 'Login successful'})
    }catch(err){
       next(err)
    }
    
})

function isValidEmail(value){
    return /^[a-zA-Z0-9._+%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
}

module.exports= router