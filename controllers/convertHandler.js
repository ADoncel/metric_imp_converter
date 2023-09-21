function ConvertHandler() {

  this.getNum = function(input) {
    const regex = /[a-zA-Z]/g;
    let result = input.slice(0, input.search(regex));
    if (result === '') return 1;

    const regex2 = /\//g;
    let frac = result.search(regex2);

    if (frac < 0) return parseFloat(result);
    else {
      let frac1 = result.slice(0, frac);
      let frac2 = result.slice(frac + 1);

      let wrongNum = frac2.search(regex2);
      if (wrongNum >= 0) return null;

      result = parseFloat(frac1) / parseFloat(frac2);
    }

    return result;
  };

  this.getUnit = function(input) {
    const regex = /[a-zA-Z]/g;
    let result = input.slice(input.search(regex));
    const regexU = /^kg$|^mi$|^km$|^lbs$|^L$|^gal$/;

    result = result.toLowerCase() != 'l' ? result.toLowerCase() : 'L'
    result = result.match(regexU) == null ? null : result

    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let result;

    switch (initUnit) {
      case 'kg':
        result = 'lbs';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'L':
        result = 'gal';
        break;
      case 'gal':
        result = 'L';
        break;
      default:
        result = initUnit;
        break;
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    switch (unit) {
      case 'kg':
        result = 'kilograms';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'L':
        result = 'liters';
        break;
      case 'gal':
        result = 'gallons';
        break;
      default:
        result = '';
        break;
    }

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'gal':
        result = initNum * galToL;
        break;
      default:
        result = -1;
        break;
    }

    return parseFloat(result.toFixed(5));
  };

  //TODO: return = '3.1 miles converts to 4.98895 kilometers'
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return result;
  };

}

module.exports = ConvertHandler;
