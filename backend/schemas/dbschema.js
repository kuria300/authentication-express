const mongoose= require('mongoose');
const bcrypt = require('bcrypt');

const userSchema= new mongoose.Schema({
     email:{ 
      type: String, 
      required: [true, 'Email is required'],
      unique: [true, 'Email already exists'],
      validate: {
        validator : function(value){
          return /^[a-zA-Z0-9._+%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
        }, 
        message: 'Enter Valid email!'
      }
    },
     password:{
      type: String,
      minlength: [6, 'password must be more than 6 characters']
    },
     createdAt:{type: Date,Date: Date.now() }
}, { collection: 'people' })

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
    const salt = 10;
    this.password = await bcrypt.hash(this.password, salt);
    // continue saving
});


const User= mongoose.model('person',userSchema)
module.exports= User