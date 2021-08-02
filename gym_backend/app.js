const express = require('express');
const cors = require('cors')
const http = require('http');
const bodyParser = require('body-parser');
const loginRouter = require('./routes/login');
const branchRegistarion = require('./routes/branchRegistration');
const userRegistarion = require('./routes/userRegistraion');

const app = express().use(bodyParser.json()); 
app.use(cors()) 
app.use(express.json()); 
app.options('*', cors());
app.use(loginRouter);
app.use(branchRegistarion);
app.use(userRegistarion);

// Create http server and run it
const server = http.createServer(app);
const port = process.env.PORT || 4000;
server.listen(port, function() {
  console.log('Express server running on *:' + port);
});

module.exports = app;
