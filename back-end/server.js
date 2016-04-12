'use strict';
// SERVER

var express = require('express');
var app = express();

var parser = require('body-parser');
var router = require('./api');  // router will use '/api'
require('./database');  // database.js holds Mongoose connection to MongoDB
require('./seed');  // require the seed data

// MIDDLEWARE STACK
app.use('/', express.static('public'));  // tell Express where to server static (html) files from
                                         // By passing in the static middleware as the first parameter,
                                         // Express defaults the route to the root of the app, or /.
                                         // I can be more explicit by adding / as the first parameter,
                                         // but I don't have to. (see Blackjack, for example).
app.use(parser.json());  // tell Express to use body-parser's json method

app.use('/api', router);  // mounts router to app; '/api' is the namespace where things will be served from
                          // *** router had to be last in this middleware stack ***


app.listen(3000, () => {
  console.log('Server running on port 3000.');
});
