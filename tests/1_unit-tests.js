const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('isWholeNumber', function(done) {
    assert.equal(convertHandler.getNum('32mi'), '32');
    done();
  });
  test('isDecimalNumber', function(done) {
    assert.equal(convertHandler.getNum('3.2mi'), 3.2);
    done();
  });
  test('isFractionalNumber', function(done) {
    assert.equal(convertHandler.getNum('1/2mi'), 0.5);
    done();
  });
  test('isFractionalNumberWithDecimal', function(done) {
    assert.equal(convertHandler.getNum('1.2/2mi'), 0.6);
    done();
  });
  test('doubleFractionIsInvalid', function(done) {
    assert.isFalse(convertHandler.getNum('1/2/3mi'), false);
    done();
  });
  test('defaultIsOne', function(done) {
    assert.equal(convertHandler.getNum('mi'), 1);
    done();
  });
  test('readsEachValidInput', function(done) {
    let inputs = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    let outputs = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    inputs.forEach((item, index) => {
      assert.equal(convertHandler.getUnit(item), outputs[index]);
    });
    done();
  });
  test('isInvalidUnit', function(done) {
    assert.isFalse(convertHandler.getUnit('min'), false);
    done();
  });
  test('returnsCorrectOutputForEachInput', function(done) {
    assert.equal(convertHandler.getReturnUnit('gal'), "L");
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    done();
  });
  test("spellsOutEachUnit", function(done) {
    let inputs = ["gal", "L", "mi", "km", "lbs", "kg"];
    let outputs = ["gallons", "litres", "miles", "kilometers", "pounds", "kilograms",];
    inputs.map((item, index) => {
      assert.equal(convertHandler.spellOutUnit(item), outputs[index]);
    });
    done();
  });
  test("galToL", function(done) {
    assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
    done();
  });
  test("lToGal", function(done) {
    assert.equal(convertHandler.convert(1, 'l'), 0.26417);
    done();
  });
  test("miToKm", function(done) {
    assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
    done();
  });
  test("kmToMi", function(done) {
    assert.equal(convertHandler.convert(1, 'km'), 0.62137);
    done();
  });
  test("lbsToKg", function(done) {
    assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
    done();
  });
  test("kgToLbs", function(done) {
    assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
    done();
  });
});

