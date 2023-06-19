const checkStringLength = (string, maxLength) => string.length <= maxLength;

// Testing
/*
console.log(checkStringLength('проверяемая строка', 20)); // true
console.log(checkStringLength('проверяемая строка', 18)); // true
console.log(checkStringLength('проверяемая строка', 10)); // false
*/

const isPalindrome = (string = '') => {
  string = string.replaceAll(' ', '').toLowerCase();
  let stringReversed = '';

  for (let i = string.length - 1; i >= 0; i--) {
    stringReversed += string[i];
  }

  return string === stringReversed;
};

// Testing
/*
console.log(isPalindrome()); // true
console.log(isPalindrome('ДовОд')); // true
console.log(isPalindrome('Кекс')); // false
*/

const extractNumbers = (string) => {
  string = String(string);
  let result = '';

  for (let i = 0; i < string.length; i++) {
    const number = parseInt(string[i], 10);
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
