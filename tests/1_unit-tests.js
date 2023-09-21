const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('convertHandler should correctly read a whole number input.', function(done) {
    assert.equal(convertHandler.getNum('32L'), 32);
    done();
  });

  test('convertHandler should correctly read a decimal number input.', function(done) {
    assert.equal(convertHandler.getNum('5.5kg'), 5.5);
    done();
  });

  test('convertHandler should correctly read a fractional input.', function(done) {
    assert.equal(convertHandler.getNum('4/2gal'), 2);
    done();
  });

  test('convertHandler should correctly read a fractional input with a decimal.', function(done) {
    assert.equal(convertHandler.getNum('4.5/1.5gal'), 3);
    done();
  });

  test('convertHandler should correctly return an error on a double-fraction', function(done) {
    assert.isNull(convertHandler.getNum('1/2/3kg'));
    done();
  });

  test('convertHandler should correctly default to a numerical input of 1', function(done) {
    assert.equal(convertHandler.getNum('km'), 1);
    done();
  });

  test('convertHandler should correctly read each valid input unit.', function(done) {
    let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
    let result = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'gal', 'L', 'mi', 'km', 'lbs', 'kg']
    input.forEach((item, idx) => {
      assert.equal(convertHandler.getUnit(23 + item), result[idx]);
    });
    done();
  });

  test('convertHandler should correctly return an error for an invalid input unit.', function(done) {
    assert.isNull(convertHandler.getUnit('kgwhatever'));
    done();
  });

  let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
  test('convertHandler should return the correct return unit for each valid input unit.', function(done) {
    let result = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
    input.forEach((item, idx) => assert.equal(convertHandler.getReturnUnit(item), result[idx]));
    done();
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function(done) {
    let result = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
    input.forEach((item, idx) => assert.equal(convertHandler.spellOutUnit(item), result[idx]));
    done();
  });

  test('convertHandler should correctly convert gal to L.', function(done) {
    assert.approximately(convertHandler.convert(5, input[0]), 18.92705, 0.001);
    done();
  });

  test('convertHandler should correctly convert L to gal', function(done) {
    assert.approximately(convertHandler.convert(5, input[1]), 1.32086, 0.001);
    done();
  });

  test('convertHandler should correctly convert mi to km.', function(done) {
    assert.approximately(convertHandler.convert(5, input[2]), 8.0467, 0.001);
    done();
  });

  test('convertHandler should correctly convert km to mi', function(done) {
    assert.approximately(convertHandler.convert(5, input[3]), 3.10686, 0.001);
    done();
  });

  test('convertHandler should correctly convert lbs to kg', function(done) {
    assert.approximately(convertHandler.convert(5, input[4]), 2.26796, 0.001);
    done();
  });

  test('convertHandler should correctly convert kg to lbs', function(done) {
    assert.approximately(convertHandler.convert(5, input[5]), 11.02312, 0.001);
    done();
  });
});