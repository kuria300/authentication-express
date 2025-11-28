const mongoose= require('mongoose')
require('dotenv').config()

const Uri= process.env.MONGODB_URI

const connectDB=async ()=>{
    try{
      const conn= await mongoose.connect(Uri)
      if(conn.ok){
        console.log(`connected successfully: ${conn.status}`)
      }
    }catch(err){
       console.error(err,'error')
    }
}

module.exports= connectDB