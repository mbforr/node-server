const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  //this creates a log file to get the attributes listed in log
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append server.log.')
    }
  })
  next();
})

// app.use((req, res, next) =>{
//   var now = new Date().toString();
//   var log = `${now}: ${req.method} ${req.url}`
//   console.log(log)

//   res.render('maintenance.hbs', {
//     pagetitle: 'Site Under Maintenance',
//     p: 'Currently udnergoing maintenance, we will be back soon!'
//   })
//   //this creates a log file to get the attributes listed in log
//   fs.appendFile('server.log', log + '\n', (err) => {
//     if (err) {
//       console.log('Unable to append server.log.')
//     }
//   })
// })


app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getyear', () => {
  return new Date().getFullYear();  
})

app.get('/', (req, res) => {
  res.render('index.hbs', {
    pagetitle: 'Welcome Home!',
    name: 'Brah'
  })
});

app.get('/api', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.send({
    name: 'Matt',
    likes: [
      'Packers',
      'Badgers'
    ]
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pagetitle: 'About Us',
    name: 'Matt'
  })
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
