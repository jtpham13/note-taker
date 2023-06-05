const express = require('express')
const app = express()
var fs = require('fs')

 /* this line tells Express to use the public folder as our static folder from which we can serve static files*/
app.use(express.static('public'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/notes', (req, res) => {
    res.sendFile('/Users/joeypham/Desktop/Challenges/note-taker/public/notes.html');

})

app.get('/api/notes', (req, res) => {;
    fs.readFile('/Users/joeypham/Desktop/Challenges/note-taker/db/db.json', "utf8", (err, data) => {
        console.log(data);
     })

 });

app.get('*', (req, res) => {
    res.sendFile('/Users/joeypham/Desktop/Challenges/note-taker/public/index.html');
  });


app.listen(3000, () => console.log('Example app is listening on port 3000.'));