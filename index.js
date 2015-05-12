'use strict';

var express = require('express');

var app = express();

var bookRouter = express.Router();

require('./routes/books_routes')(bookRouter);

app.use('/shelf', bookRouter);

app.listen(3000, function() {
  console.log('Server is running');
});
