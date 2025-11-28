const express= require('express')
const app= express()
const router= express.Router()
const User= require('../schemas/dbschema')


router.post('/', async (req, res, next)=>{
    const { email, password}= req.body;
    
    try{
     const exists= await User.findOne({email})
     if(exists){
        return res.status(400).json({errors:['Email already exists']})
     }

     const newUser= new User({email, password})
     await newUser.save()
     res.status(201).json({message:'user created successfully'})

    }catch(errors){
      // if(errors.name === 'ValidationError'){
      //   const message= Object.values(errors.errors).map((e)=>(e.message))

      //   return res.status(400).json({errors: message})
      // }else{
      //   console.log(errors)
      //    res.status(500).json({errors:['Something went wrong!Try again']})
      // }  
      next(errors)  
    }
    
})

module.exports= router