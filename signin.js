[1mdiff --git a/backend/Routes/signin.js b/backend/Routes/signin.js[m
[1mindex e69de29..7ef0a95 100644[m
[1m--- a/backend/Routes/signin.js[m
[1m+++ b/backend/Routes/signin.js[m
[36m@@ -0,0 +1,34 @@[m
[32m+[m[32mconst express= require('express')[m
[32m+[m[32mconst app= express()[m
[32m+[m[32mconst router= express.Router()[m
[32m+[m[32mconst User= require('../schemas/dbschema')[m
[32m+[m
[32m+[m
[32m+[m[32mrouter.post('/', async (req, res, next)=>{[m
[32m+[m[32m    const { email, password}= req.body;[m
[32m+[m[41m    [m
[32m+[m[32m    try{[m
[32m+[m[32m     const exists= await User.findOne({email})[m
[32m+[m[32m     if(exists){[m
[32m+[m[32m        return res.status(400).json({errors:['Email already exists']})[m
[32m+[m[32m     }[m
[32m+[m
[32m+[m[32m     const newUser= new User({email, password})[m
[32m+[m[32m     await newUser.save()[m
[32m+[m[32m     res.status(201).json({message:'user created successfully'})[m
[32m+[m
[32m+[m[32m    }catch(errors){[m
[32m+[m[32m      // if(errors.name === 'ValidationError'){[m
[32m+[m[32m      //   const message= Object.values(errors.errors).map((e)=>(e.message))[m
[32m+[m
[32m+[m[32m      //   return res.status(400).json({errors: message})[m
[32m+[m[32m      // }else{[m
[32m+[m[32m      //   console.log(errors)[m
[32m+[m[32m      //    res.status(500).json({errors:['Something went wrong!Try again']})[m
[32m+[m[32m      // }[m[41m  [m
[32m+[m[32m      next(errors)[m[41m  [m
[32m+[m[32m    }[m
[32m+[m[41m    [m
[32m+[m[32m})[m
[32m+[m
[32m+[m[32mmodule.exports= router[m
\ No newline at end of file[m
[1mdiff --git a/backend/dbconn.js b/backend/dbconn.js[m
[1mindex e69de29..d10c640 100644[m
[1m--- a/backend/dbconn.js[m
[1m+++ b/backend/dbconn.js[m
[36m@@ -0,0 +1,17 @@[m
[32m+[m[32mconst mongoose= require('mongoose')[m
[32m+[m[32mrequire('dotenv').config()[m
[32m+[m
[32m+[m[32mconst Uri= process.env.MONGODB_URI[m
[32m+[m
[32m+[m[32mconst connectDB=async ()=>{[m
[32m+[m[32m    try{[m
[32m+[m[32m      const conn= await mongoose.connect(Uri)[m
[32m+[m[32m      if(conn.ok){[m
[32m+[m[32m        console.log(`connected successfully: ${conn.status}`)[m
[32m+[m[32m      }[m
[32m+[m[32m    }catch(err){[m
[32m+[m[32m       console.error(err,'error')[m
[32m+[m[32m    }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mmodule.exports= connectDB[m
\ No newline at end of file[m
[1mdiff --git a/backend/package-lock.json b/backend/package-lock.json[m
[1mindex c40080f..e119646 100644[m
[1m--- a/backend/package-lock.json[m
[1m+++ b/backend/package-lock.json[m
[36m@@ -9,6 +9,9 @@[m
       "version": "1.0.0",[m
       "license": "ISC",[m
       "dependencies": {[m
[32m+[m[32m        "bcrypt": "^6.0.0",[m
[32m+[m[32m        "cors": "^2.8.5",[m
[32m+[m[32m        "dotenv": "^17.2.3",[m
         "express": "^5.1.0",[m
         "mongoose": "^9.0.0"[m
       }[m
[36m@@ -50,6 +53,20 @@[m
         "node": ">= 0.6"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/bcrypt": {[m
[32m+[m[32m      "version": "6.0.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/bcrypt/-/bcrypt-6.0.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-cU8v/EGSrnH+HnxV2z0J7/blxH8gq7Xh2JFT6Aroax7UohdmiJJlxApMxtKfuI7z68NvvVcmR78k2LbT6efhRg==",[m
[32m+[m[32m      "hasInstallScript": true,[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "node-addon-api": "^8.3.0",[m
[32m+[m[32m        "node-gyp-build": "^4.8.4"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 18"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/body-parser": {[m
       "version": "2.2.0",[m
       "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-2.2.0.tgz",[m
[36m@@ -157,6 +174,19 @@[m
         "node": ">=6.6.0"[m
       }[m
     },[m
[32m+[m[32m    "node_module