'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let query = req.query.input
    if (!query) res.send('missing input')
    let response = { "initNum": 0, "initUnit": "", "returnNum": 0, "returnUnit": "", "string": "" }
    let badU = false, badN = false;
    const regexU = /kg|mi|km|lib|L|gal/g;

    response.initNum = convertHandler.getNum(query)
    badN = response.initNum == null ? true : false

    response.initUnit = convertHandler.getUnit(query)
    badU = response.initUnit == null ? true : false

    badU === true ?
      badN === true ? res.send('invalid number and unit') : res.send('invalid unit') :
      badN === true ? res.send('invalid number') : null

    response.returnUnit = convertHandler.getReturnUnit(response.initUnit)

    response.returnNum = convertHandler.convert(response.initNum, response.initUnit)

    response.string = convertHandler.getString(response.initNum,
      response.initUnit,
      response.returnNum,
      response.returnUnit)

    res.json(response)
  })
};
