require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const fs = require('fs');
const join = require('path').join;
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const passportInit = require('./controllers/passportInit');
const { dbConfig } = require('./config');
const app = express();
const PORT = process.env.PORT || 3001;
const models = join(__dirname, './models');
const session = require('express-session');

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(join(models, file)));

// Setup for passport and to accept JSON objects
app.use(express.static(join(__dirname, '../client/build')));
app.use(express.json());
// app.use(bodyParser());
app.use(express.urlencoded({ extended: true }));


// Accept requests from the client
app.use(cors({
  //origin: 'http://localhost:3000',
  origin: true,
  credentials: true
})) 

passportInit(app)

app.use("/api", require("./routes/api/apiRoutes"));
app.get('/wake-up', (req, res) => res.send('👍'))
app.use('/', authRouter)

mongoose.connect(dbConfig, { useNewUrlParser: true });

let server = app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

// Set up socket server
//var server = http.createServer(app);
var io = require('socket.io')(server);  //pass a http.Server instance
//server.listen(80);
app.set('io', io)
io.set('origins', '*:*');
io.on('connection', function(socket){})
//connect();