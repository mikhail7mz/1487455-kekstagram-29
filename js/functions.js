const checkIsStringLengthValid = (string, maxLength) => (string.length <= maxLength);

// Testing
/*
console.log(checkIsStringLengthValid('проверяемая строка', 20)); // true
console.log(checkIsStringLengthValid('проверяемая строка', 18)); // true
console.log(checkIsStringLengthValid('проверяемая строка', 10)); // false
*/

const checkIsStringpalindrome = (string) => {
  const stringNormalized = (string) ? string.replaceAll(' ', '').toLowerCase() : '';
  let stringReversed = '';

  for (let i = stringNormalized.length - 1; i >= 0; i--) {
    stringReversed += stringNormalized[i];
  }

  return stringNormalized === stringReversed;
};

// Testing
/*
console.log(checkIsStringpalindrome()); // true
console.log(checkIsStringpalindrome('ДовОд')); // true
console.log(checkIsStringpalindrome('Кекс')); // false
*/

const extractNumbers = (string) => {
  if (string === undefined || string === null) {
    return NaN;
  }

  const stringNormalized = string.toString();
  let result = '';

  for (let i = 0; i < stringNormalized.length; i++) {
    const number = parseInt(stringNormalized[i], 10);
    result += (!Number.isNaN(number)) ? number : '';
  }

  return parseInt(result, 10);
};

// Testing
/*
console.log(extractNumbers('2023 год')); // 2023
console.log(extractNumbers('ECMAScript 2022')); // 2022
console.log(extractNumbers('1 кефир, 0.5 батона')); // 105
console.log(extractNumbers('агент 007')); // 7
console.log(extractNumbers('а я томат')); // NaN

console.log(extractNumbers(2023)); // 2023
console.log(extractNumbers(-1)); // 1
console.log(extractNumbers(1.5)); // 15
*/
