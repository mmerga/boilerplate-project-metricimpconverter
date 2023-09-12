const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('convert valid input', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=10L')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, '{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}');
        done();
      });
  });
  test('convert invalid unit', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=30g')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, '"invalid unit"');
        done();
      });

  });
  test('convert invalid number', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, '"invalid number"');
        done();
      });

  });
  test('convert invalid number and unit', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, '"invalid number and unit"');
        done();
      });

  });
  test('convert no number', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=kg')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, '{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}');
        done();
      });
  });
  after(function() {
        chai.request(server).get('/api')
    });
});
