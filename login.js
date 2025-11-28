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
[32m+[m[32m    "node_modules/cors": {[m
[32m+[m[32m      "version": "2.8.5",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/cors/-/cors-2.8.5.tgz",[m
[32m+[m[32m      "integrity": "sha512-KIHbLJqu73RGr/hnbrO9uBeixNGuvSQjul/jdFvS/KFSIH1hWVd1ng7zOHx+YrEfInLG7q4n6GHQ9cDtxv/P6g==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "object-assign": "^4",[m
[32m+[m[32m        "vary": "^1"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.10"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/debug": {[m
       "version": "4.4.3",[m
       "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",[m
[36m@@ -183,6 +213,18 @@[m
         "node": ">= 0.8"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/dotenv": {[m
[32m+[m[32m      "version": "17.2.3",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/dotenv/-/dotenv-17.2.3.tgz",[m
[32m+[m[32m      "integrity": "sha512-JVUnt+DUIzu87TABbhPmNfVdBDt18BLOWjMUFJMSi/Qqg7NTYtabbvSNJGOJ7afbRuv9D/lngizHtP7QyLQ+9w==",[m
[32m+[m[32m      "license": "BSD-2-Clause",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=12"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://dotenvx.com"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/dunder-proto": {[m
       "version": "1.0.1",[m
       "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",[m
[36m@@ -652,6 +694,35 @@[m
         "node": ">= 0.6"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/node-addon-api": {[m
[32m+[m[32m      "version": "8.5.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/node-addon-api/-/node-addon-api-8.5.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-/bRZty2mXUIFY/xU5HLvveNHlswNJej+RnxBjOMkidWfwZzgTbPG1E3K5TOxRLOR+5hX7bSofy8yf1hZevMS8A==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": "^18 || ^20 || >= 21"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/node-gyp-build": {[m
[32m+[m[32m      "version": "4.8.4",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/node-gyp-build/-/node-gyp-build-4.8.4.tgz",[m
[32m+[m[32m      "integrity": "sha512-LA4ZjwlnUblHVgq0oBF3Jl/6h/Nvs5fzBLwdEF4nuxnFdsfajde4WfxtJr3CaiH+F6ewcIB/q4jQ4UzPyid+CQ==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "bin": {[m
[32m+[m[32m        "node-gyp-build": "bin.js",[m
[32m+[m[32m        "node-gyp-build-optional": "optional.js",[m
[32m+[m[32m        "node-gyp-build-test": "build-test.js"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/object-assign": {[m
[32m+[m[32m      "version": "4.1.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/object-inspect": {[m
       "version": "1.13.4",[m
       "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.13.4.tgz",[m
[1mdiff --git a/backend/package.json b/backend/package.json[m
[1mindex 3332b9c..ead3696 100644[m
[1m--- a/backend/package.json[m
[1m+++ b/backend/package.json[m
[36m@@ -4,13 +4,16 @@[m
   "description": "",[m
   "main": "index.js",[m
   "scripts": {[m
[31m-    "test": "echo \"Error: no test specified\" && exit 1"[m
[32m+[m[32m    "test": "npm start"[m
   },[m
   "keywords": [],[m
   "author": "",[m
   "license": "ISC",[m
   "type": "commonjs",[m
   "dependencies": {[m
[32m+[m[32m    "bcrypt": "^6.0.0",[m
[32m+[m[32m    "cors": "^2.8.5",[m
[32m+[m[32m    "dotenv": "^17.2.3",[m
     "express": "^5.1.0",[m
     "mongoose": "^9.0.0"[m
   }[m
[1mdiff --git a/backend/schemas/dbschema.js b/backend/schemas/dbschema.js[m
[1mindex 69c556d..120b7b0 100644[m
[1m--- a/backend/schemas/dbschema.js[m
[1m+++ b/backend/schemas/dbschema.js[m
[36m@@ -1,2 +1,32 @@[m
[31m-const mongoose= require('mongoose')[m
[31m-require('dotenv').config()[m
[32m+[m[32mconst mongoose= require('mongoose');[m
[32m+[m[32mconst bcrypt = require('bcrypt');[m
[32m+[m
[32m+[m[32mconst userSchema= new mongoose.Schema({[m
[32m+[m[32m     email:{[m[41m [m
[32m+[m[32m      type: String,[m[41m [m
[32m+[m[32m      required: [true, 'Email is required'],[m
[32m+[m[32m      unique: [true, 'Email already exists'],[m
[32m+[m[32m      validate: {[m
[32m+[m[32m        validator : function(value){[m
[32m+[m[32m          return /^[a-zA-Z0-9._+%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)[m
[32m+[m[32m        },[m[41m [m
[32m+[m[32m        message: 'Enter Valid email!'[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m     password:{[m
[32m+[m[32m      type: String,[m
[32m+[m[32m      minlength: [6, 'password must be more than 6 characters'][m
[32m+[m[32m    },[m
[32m+[m[32m     createdAt:{type: Date,Date: Date.now() }[m
[32m+[m[32m}, { collection: 'people' })[m
[32m+[m
[32m+[m[32muserSchema.pre('save', async function() {[m
[32m+[m[32m  if (!this.isModified('password')) return;[m
[32m+[m[32m    const salt = 10;[m
[32m+[m[32m    this.password = await bcrypt.hash(this.password, salt);[m
[32m+[m[32m    // continue saving[m
[32m+[m[32m});[m
[32m+[m
[32m+[m
[32m+[m[32mconst User= mongoose.model('person',userSchema)[m
[32m+[m[32mmodule.exports= User[m
\ No newline at end of file[m
[1mdiff --git a/backend/server.js b/backend/server.js[m
[1mindex 34422fd..7cbd4cc 100644[m
[1m--- a/backend/server.js[m
[1m+++ b/backend/server.js[m
[36m@@ -1,10 +1,28 @@[m
 const express = require('express');[m
 const app= express()[m
[32m+[m[32mconst cors= require('cors')[m[41m[m
 PORT= 5000[m
[32m+[m[32mconst conn= require('../backend/dbconn')[m[41m[m
[32m+[m[32mconst register= require('./Routes/signin')[m[41m[m
[32m+[m[32mconst login= require('./Routes/login')[m[41m[m
[32m+[m[32mconst loginErrorHandler= require('./middleware/error-handler')[m[41m[m
 [m
[31m-app.get('/', (req, res)=>{[m
[31m-   res.send('Hello Express')[m
[31m-})[m
[32m+[m[32mconst corsOptions={[m[41m[m
[32m+[m[32m    origin: 'http://localhost:5173', // no trailing slash[m[41m[m
[32m+[m[32m  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],[m[41m[m
[32m+[m[32m  credentials: true[m[41m[m
[32m+[m[32m}[m[41m[m
[32m+[m[32mapp.use(express.json())[m[41m[m
[32m+[m[32mapp.use(express.urlencoded({ extended:true }))[m[41m[m
[32m+[m[32mapp.use(cors(corsOptions));[m[41m[m
[32m+[m[41m[m
[32m+[m[32mconn()[m[41m[m
[32m+[m[41m[m
[32m+[m[32mapp.use('/register', register);[m[41m[m
[32m+[m[32mapp.use('/login', login);[m[41m[m
[32m+[m[41m[m
[32m+[m[41m[m
[32m+[m[32mapp.use(loginErrorHandler)[m[41m[m
 [m
 app.get('/hello', (req,res, next)=>{[m
     console.log('first')[m
[1mdiff --git a/frontend/package-lock.json b/frontend/package-lock.json[m
[1mindex 47dc93e..73f2ae2 100644[m
[1m--- a/frontend/package-lock.json[m
[1m+++ b/frontend/package-lock.json[m
[36m@@ -8,6 +8,7 @@[m
       "name": "frontend",[m
       "version": "0.0.0",[m
       "dependencies": {[m
[32m+[m[32m        "axios": "^1.13.2",[m
         "react": "^19.2.0",[m
         "react-dom": "^19.2.0",[m
         "react-router-dom": "^7.9.6"[m
[36m@@ -1149,6 +1150,12 @@[m
       "dev": true,[m
       "license": "Python-2.0"[m
     },[m
[32m+[m[32m    "node_modules/asynckit": {[m
[32m+[m[32m      "version": "0.4.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-Oei9OH4tRh0YqU3GxhX79dM/mwVgvbZJaSNaRk+bshkj0S5cfHcgYakreBjrHwatXKbz+IoIdYLxrKim2MjW0Q==",[m
[32m+[m[32m      "license": "MIT"[m
[32m+[m[32m    },[m
     "node_modules/autoprefixer": {[m
       "version": "10.4.22",[m
       "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.4.22.tgz",[m
[36m@@ -1187,6 +1194,17 @@[m
         "postcss": "^8.1.0"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/axios": {[m
[32m+[m[32m      "version": "1.13.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/axios/-/axios-1.13.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-VPk9ebNqPcy5lRGuSlKx752IlDatOjT9paPlm8A7yOuW2Fbvp4X3JznJtT4f0GzGLLiWE9W8onz51SqLYwzGaA==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "follow-redirects": "^1.15.6",[m
[32m+[m[32m        "form-data": "^4.0.4",[m
[32m+[m[32m        "proxy-from-env": "^1.1.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/balanced-match": {[m
       "version": "1.0.2",[m
       "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",[m
[36m@@ -1276,6 +1294,19 @@[m
         "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/call-bind-apply-helpers": {[m
[32m+[m[32m      "version": "1.0.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "es-errors": "^1.3.0",[m
[32m+[m[32m        "function-bind": "^1.1.2"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.4"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/callsites": {[m
       "version": "3.1.0",[m
       "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",[m
[36m@@ -1392,6 +1423,18 @@[m
       "dev": true,[m
       "license": "MIT"[m
     },[m
[32m+[m[32m    "node_modules/combined-stream": {[m
[32m+[m[32m      "version": "1.0.8",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.8.tgz",[m
[32m+[m[32m      "integrity": "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "delayed-stream": "~1.0.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.8"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/commander": {[m
       "version": "4.1.1",[m
       "resolved": "https://registry.npmjs.org/commander/-/commander-4.1.1.tgz",[m
[36m@@ -1485,6 +1528,15 @@[m
       "dev": true,[m
       "license": "MIT"[m
     },[m
[32m+[m[32m    "node_modules/delayed-stream": {[m
[32m+[m[32m      "version": "1.0.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/delayed-stream/-/delayed-stream-1.0.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-ZySD7Nf91aLB0RxL4KGrKHBXl7Eds1DAmEdcoVawXnLD7SDhpNgtuII2aAkg7a7QS41jxPSZ17p4VdGnMHk3MQ==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.4.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/detect-libc": {[m
       "version": "2.1.2",[m
       "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",[m
[36m@@ -1509,6 +1561,20 @@[m
       "dev": true,[m
       "license": "MIT"[m
     },[m
[32m+[m[32m    "node_modules/dunder-proto": {[m
[32m+[m[32m      "version": "1.0.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "call-bind-apply-helpers": "^1.0.1",[m
[32m+[m[32m        "es-errors": "^1.3.0",[m
[32m+[m[32m        "gopd": "^1.2.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.4"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/electron-to-chromium": {[m
       "version": "1.5.259",[m
       "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.259.tgz",[m
[36m@@ -1516,6 +1582,51 @@[m
       "dev": true,[m
       "license": "ISC"[m
     },[m
[32m+[m[32m    "node_modules/es-define-property": {[m
[32m+[m[32m      "version": "1.0.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.4"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/es-errors": {[m
[32m+[m[32m      "version": "1.3.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.4"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/es-object-atoms": {[m
[32m+[m[32m      "version": "1.1.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "es-errors": "^1.3.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.4"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/es-set-tostringtag": {[m
[32m+[m[32m      "version": "2.1.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/es-set-tostringtag/-/es-set-tostringtag-2.1.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-j6vWzfrGVfyXxge+O0x5sh6cvxAog0a/4Rdd2K36zCMV5eJ+/+tOAngRO8cODMNWbVRdVlmGZQL2YS3yR8bIUA==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "es-errors": "^1.3.0",[m
[32m+[m[32m        "get-intrinsic": "^1.2.6",[m
[32m+[m[32m        "has-tostringtag": "^1.0.2",[m
[32m+[m[32m        "hasown": "^2.0.2"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.4"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/escalade": {[m
       "version": "3.2.0",[m
       "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",[m
[36m@@ -1867,6 +1978,42 @@[m
       "dev": true,[m
       "license": "ISC"[m
     },[m
[32m+[m[32m    "node_modules/follow-redirects": {[m
[32m+[m[32m      "version": "1.15.11",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.15.11.tgz",[m
[32m+[m[32m      "integrity": "sha512-deG2P0JfjrTxl50XGCDyfI97ZGVCxIpfKYmfyrQ54n5FO/0gfIES8C/Psl6kWVDolizcaaxZJnTS0QSMxvnsBQ==",[m
[32m+[m[32m      "funding": [[m
[32m+[m[32m        {[m
[32m+[m[32m          "type": "individual",[m
[32m+[m[32m          "url": "https://github.com/sponsors/RubenVerborgh"[m
[32m+[m[32m        }[m
[32m+[m[32m      ],[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=4.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependenciesMeta": {[m
[32m+[m[32m        "debug": {[m
[32m+[m[32m          "optional": true[m
[32m+[m[32m        }[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/form-data": {[m
[32m+[m[32m      "version": "4.0.5",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/form-data/-/form-data-4.0.5.tgz",[m
[32m+[m[32m      "integrity": "sha512-8RipRLol37bNs2bhoV67fiTEvdTrbMUYcFTiy3+wuuOnUog2QBHCZWXDRijWQfAkhBj2Uf5UnVaiWwA5vdd82w==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "asynckit": "^0.4.0",[m
[32m+[m[32m        "combined-stream": "^1.0.8",[m
[32m+[m[32m        "es-set-tostringtag": "^2.1.0",[m
[32m+[m[32m        "hasown": "^2.0.2",[m
[32m+[m[32m        "mime-types": "^2.1.12"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 6"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/fraction.js": {[m
       "version": "5.3.4",[m
       "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-5.3.4.tgz",[m
[36m@@ -1900,7 +2047,6 @@[m
       "version": "1.1.2",[m
       "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",[m
       "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",[m
[31m-      "dev": true,[m
       "license": "MIT",[m
       "funding": {[m
         "url": "https://github.com/sponsors/ljharb"[m
[36m@@ -1916,6 +2062,43 @@[m
         "node": ">=6.9.0"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/get-intrinsic": {[m
[32m+[m[32m      "version": "1.3.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "call-bind-apply-helpers": "^1.0.2",[m
[32m+[m[32m        "es-define-property": "^1.0.1",[m
[32m+[m[32m        "es-errors": "^1.3.0",[m
[32m+[m[32m        "es-object-atoms": "^1.1.1",[m
[32m+[m[32m        "function-bind": "^1.1.2",[m
[32m+[m[32m        "get-proto": "^1.0.1",[m
[32m+[m[32m        "gopd": "^1.2.0",[m
[32m+[m[32m        "has-symbols": "^1.1.0",[m
[32m+[m[32m        "hasown": "^2.0.2",[m
[32m+[m[32m        "math-intrinsics": "^1.1.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.4"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/ljharb"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/get-proto": {[m
[32m+[m[32m      "version": "1.0.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "dunder-proto": "^1.0.1",[m
[32m+[m[32m        "es-object-atoms": "^1.0.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.4"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/glob-parent": {[m
       "version": "6.0.2",[m
       "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",[m
[36m@@ -1942,6 +2125,18 @@[m
         "url": "https://github.com/sponsors/sindresorhus"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/gopd": {[m
[32m+[m[32m      "version": "1.2.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/gopd/-/