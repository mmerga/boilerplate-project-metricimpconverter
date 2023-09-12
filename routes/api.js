'use strict';

//// remeber to .env NODE_ENV=test

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  console.log(convertHandler.getString(3.1, 'mi', 4.98895, 'km'));
  app.route('/api/convert')
    .get(function(req, res) {
      const input = req.query.input;
      let result = [];
      result[0] = convertHandler.getNum(input);
      result[1] = convertHandler.getUnit(input);
      if(result[0]!=false && result[1]!=false){  // Valid Input

        let newResult = [];
        newResult[0] = convertHandler.convert(result[0], result[1]);
        newResult[1] = convertHandler.getReturnUnit(result[1]);
        const string = convertHandler.getString(result[0], result[1], newResult[0], newResult[1]);
        //const auxNewResult = parseFloat(newResult[0].toFixed(5));
        res.json({
          initNum: result[0],
          initUnit: result[1],
          returnNum: newResult[0],
          returnUnit: newResult[1],
          string: string
        });
      }else if(result[0] == false && result[1] == false){ // Invalid Num & Unit
        res.json(
          'invalid number and unit'
        );
      }else if(result[0] == false){  // Invalid Num
        res.json(
          'invalid number'
        );
      }else if(result[1] == false){  // Invalid Unit
        res.json(
          'invalid unit'
        );
      }
    })
  ;

}

