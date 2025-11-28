const express = require('express');
const app= express()
const cors= require('cors')
PORT= 5000
const conn= require('../backend/dbconn')
const register= require('./Routes/signin')
const login= require('./Routes/login')
const loginErrorHandler= require('./middleware/error-handler')

const corsOptions={
    origin: 'http://localhost:5173', // no trailing slash
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cors(corsOptions));

conn()

app.use('/register', register);
app.use('/login', login);


app.use(loginErrorHandler)

app.get('/hello', (req,res, next)=>{
    console.log('first')
    next();
},
  (req, res)=> {res.send('second handler')

  })
  app.get('/users/:userId/books/:bookId', (req, res) => {
     res.send(`User ID: ${req.params.userId}, Book ID: ${req.params.bookId}`);
});

app.get('/search', (req, res) => {
    const { category } = req.query;
    res.send(`here is the req.query: ${category}`);
});
app.use((req,res, next)=>{
    res.status(404).send('404-Page Not Found')
})
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

