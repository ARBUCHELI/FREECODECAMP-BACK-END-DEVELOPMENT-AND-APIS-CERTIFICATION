let express = require('express');
let app = express();
let bodyParser = require('body-parser');

console.log("Hello World");

app.get('/', function(req, res) {
  res.send('Hello Express');
})

//Serve an html file.
app.get('/' , function (req, res) {
  const absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
})

//Serve static assets.
app.use('/public', express.static(__dirname + '/public'));

//Serve Json on a Specific Route/Create a simple API
app.get('/json', function (req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({"message": "HELLO JSON"});
  } else {
    res.json({"message": "Hello json"});
  }
})

//Implement a Root Level Requeshttps://boilerplate-express.arbucheli.repl.cot Logger Middleware
app.use(function (req, res, next) {
  console.log(`${req.method} /${req.path} - ${req.ip}`);
  next();
});

// Chain middleware to create a time server
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();  
  next();
}, function(req, res) {
  res.json({time: req.time});
});

/*Get Route Parameters Input from the Client
https://boilerplate-express.arbucheli.repl.co*/
app.get('/:word/echo', function(req, res) {
  word = req.params.word
  res.json({echo: word});
})

//Get Query Parameter Input from the Client
//app.route('/name').get(handler).post(handler)

app.get('/name', function(req, res) {
  firstname = req.query.first;
  lastname = req.query.last;
  console.log(firstname);
  console.log(lastname);
  res.json({name: `${firstname} ${lastname}`});
})

//Use body-parser to Parse Post Requests
app.use('/',bodyParser.urlencoded({extended: false}));

app.post('/name', function(req, res) {
  firstname = req.body.first;
  lastname = req.body.last;
  console.log(firstname);
  console.log(lastname);
  res.json({name: `${firstname} ${lastname}`});
});

        




























 module.exports = app;
