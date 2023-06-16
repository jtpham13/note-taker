const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT ||3000
const routes = require('./routes/api');


app.use(express.json())
app.use(express.urlencoded({extended:true}))
 /* this line tells Express to use the public folder as our static folder from which we can serve static files*/
app.use(express.static('public'));
  app.use('/api', routes)

// respond with "hello world" when a GET request is made to the homepage
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));

});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });


  
app.listen(PORT, () => console.log('Example app is listening on port 3000.'));