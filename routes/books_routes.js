'use strict';

var fs = require('fs');
var bodyparser = require('body-parser');
var path = require('path');

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/books', function (req, res) {
    fs.readdir('./data', function (err, files) {
      if (err) throw err;
      if (files.length === 0) {
        res.json({msg: 'No books in your library'});
        return;
      }
      res.json(files);
    });
  });

  router.get('/books/:title', function (req, res) {
    var fileName = 'data/' + req.params.title + '.json';
    fs.readFile(fileName, function (err, data) {
      if (err) {
        res.json({msg: 'There is no book with that title on your shelf.'});
        res.end();
      }
      res.send(data.toString());
      res.end();
    });
  });

  router.post('/books', function (req, res) {
    var newBook = JSON.stringify(req.body);
    var fileName = 'data/' + req.body.title.split(' ').join('_') + '.json';
    fs.writeFile(fileName, newBook, function (err) {
      if (err) throw err;
    });
    res.json({msg: req.body.title +' added to your shelf.'});
  });

  router.delete('/books/:title', function (req, res) {
    var fileName = 'data/' + req.params.title + '.json';
    fs.unlink(fileName, function (err) {
      if (err) throw err;
    });
    res.json({msg: req.params.title + ' removed from your shelf.'});
  });

  router.patch('/books/:title', function (req, res) {
    var fileName = 'data/' + req.params.title + '.json';
    var toAppend = JSON.stringify(req.body);
    fs.appendFile(fileName, toAppend, function (err) {
      if (err) throw err;
    });
    res.json({msg: req.params.title + ' updated on your shelf.'});
  });

  router.put('/books/:title', function (req, res) {
    var fileName = 'data/' + req.params.title + '.json';
    var newBook = JSON.stringify(req.body);
    fs.unlink(fileName, function (err) {
      if (err) throw err;
    });
    fs.writeFile(fileName, newBook, function (err) {
      if (err) throw err;
    });
    res.json({msg: req.params.title + ' replaced on your shelf.'});
  });
};
