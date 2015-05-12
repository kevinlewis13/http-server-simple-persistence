'use strict';

require('../index');

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;

chai.use(chaihttp);

describe('simple persistence', function() {

  it('should make a new book', function (done) {
    chai.request('localhost:3000')
      .post('/shelf/books')
      .send({title: 'test title'})
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('test title added to your shelf.');
        done();
      });
  });

  it('should return an array of book files', function (done) {
    chai.request('localhost:3000')
      .get('/shelf/books')
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });
});
