
const errorHandler= (err, req, res, next)=>{
    if(err.name === 'ValidationError'){
        const messages = Object.values(err.errors).map((e)=>(e.message))

        return res.status(400).json({errors: messages})
    }else{
        console.log(err)
         res.status(500).json({errors:['Something went wrong!Try again']})
      }    
}

module.exports= errorHandler

