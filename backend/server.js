const express = require('express');
const app= express()
PORT= 5000

app.get('/', (req, res)=>{
   res.send('Hello Express')
})

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

