function ConvertHandler() {
  const VALOR_PADRAO = 1;
  const Regex = /[a-z]+|[^a-z]+/gi;
  
  // Verifica se a string começa com um número
  // Se nao, concatena VALOR_PADRAO no começo
  // Valor padrao
  function beginWithNumber(input){
    if (/^\d/.test(input)) {
      return input; 
    } else {
      return VALOR_PADRAO + input; 
    }
  }

  // Verifica se é um numero valido
  // Se for, retorna o numero FLOAT
  // Se nao. retorna FALSE
  this.getNum = function(input) {
    input = beginWithNumber(input);
    let number = input.match(Regex)[0]
    number = number.toString().split('/')
    if ( number.length == 2 ){
      const newNumber = parseFloat(number[0]) / parseFloat(number[1]);
      return newNumber;
    }else if ( number.length == 1 ){
      const newNumber = parseFloat(number);
      return newNumber;
    }else{  // not a valid number
      return false;
    }
  };

  // Verifica se unidade é valida
  // Se for, retorna a unidade em lowerCase - Exeto L
  // Se nao, retorna FALSE
  this.getUnit = function(input) { 
    input = beginWithNumber(input);
    let unit = input.match(Regex)[1];
    unit = unit.toLowerCase();
    switch (unit){
      case "gal":
        return "gal";
        break;
      case "l":
        return "L";
        break;
      case "mi":
        return "mi";
        break;
      case "km":
        return "km";
        break;
      case "lbs":
        return "lbs";
        break;
      case "kg":
        return "kg";
        break;
      default:  // not a valid unit
        return false;
    };   
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit) {
      case 'gal':
        result = "L";
        break;
      case "L":
        result = "gal";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      default:
        break;
    }
    return result;
  };

  // Retorna o valor convertido
  // [0] new Number
  // [1] new Unit
  this.convert = function (initNum, initUnit){
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let newNum = 0;
    switch (initUnit){
      case "gal":
        newNum = initNum * galToL;
        break;
      case "L":
        newNum = initNum / galToL;
        break;
      case "l":
        newNum = initNum / galToL;
        break;
      case "mi":
        newNum = initNum * miToKm;
        break;
      case "km":
        newNum = initNum / miToKm;
        break;
      case "lbs":
        newNum = initNum * lbsToKg;
        break;
      case "kg":
        newNum = initNum / lbsToKg;
        break;
      default:
        return "Algo deu errado";
    }  
    newNum = parseFloat(newNum.toFixed(5));
    return newNum;
  } 

  this.spellOutUnit = function(unit) {
    let result;

    switch (unit) {
      case "gal":
        result = "gallons";
        break;
      case "L":
        result = "litres";
        break;
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      default:
        break;
    }

    return result;
  };

  // Retorna uma string no formato solicitado
  // '{initNum} {initUnitString} converts to {returnNum} {returnUnitString}'
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const UNITS = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',      
      kg: 'kilograms'        
    }
    initUnit = UNITS[initUnit];
    returnUnit = UNITS[returnUnit]; 
    return `${initNum} ${initUnit} converts to ${returnNum.toFixed(5)} ${returnUnit}`;    
  };  
}

module.exports = ConvertHandler;

