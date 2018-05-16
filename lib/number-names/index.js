function addUnitName(text, scale) {
  const units = ['', 'thousand', 'million', 'billion'][scale] || '';



  if (units) {
    return text ? text + ' ' + units : '';
  }

  return text;
}

function singleDigitName(number) {
  // return array[index];
  return ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][number];
}

function doubleDigitName(number) {
  const teens = ['', 'eleven', 'twelve', 'thirteen', 'forteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',]
  const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety',]

  if (number[0] === 1 && number[1] !== 0) {
    //doubleDigitName handle double for teens
    return teens[number[1]];
  }

  //return all doubles that are not in teens
  return (number[1] == 0) ? tens[number[0]] : tens[number[0]] + ((number[0] == 0) ?'' :' ') + singleDigitName(number[1]);
}

function tripleDigitName(number, scale) {
  // split a 3 digit number into array of three 1 digit numbers
  const numberUnits = number.toString().split('').map(Number);

  let name = '';

  // do hundres
  if (numberUnits.length === 3) {

    if (numberUnits[0] > 0) {
      //when dealing with thousands
      name += singleDigitName(numberUnits[0]) + ' hundred';
    }

    numberUnits.shift();
  }
  console.log(numberUnits, 'numberUnits')
  console.log(numberUnits.length, 'numberUnits length!!!!')
  // do tens/teens
  if (numberUnits.length === 2) {
    return addUnitName((name && ((numberUnits[0] == 0 && numberUnits[1] == 0) ? name : name + ' and ')) + doubleDigitName(numberUnits), scale);
  }

  // do single numbers
  return addUnitName(singleDigitName(numberUnits[0]), scale);
}

module.exports = number => {
  if (number === 0) return 'zero'

  // split into chunks of <3 from right side
  const numberUnits = number.toString().match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);

  let names = [];


  // loop through chunks and get their names
  while (numberUnits.length > 0) {
    names.push(tripleDigitName(numberUnits.shift(), numberUnits.length));
  }

  names = names.filter(function(e){return e}); 

  // stitch the 3 chunks names together into a sentence
  return names.join(', ');
}


