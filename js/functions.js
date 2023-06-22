const checkStringLength = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (string = '') => {
  string = string.replaceAll(' ', '').toLowerCase();
  let stringReversed = '';

  for (let i = string.length - 1; i >= 0; i--) {
    stringReversed += string[i];
  }

  return string === stringReversed;
};

const extractNumbers = (string) => {
  string = String(string);
  let result = '';

  for (let i = 0; i < string.length; i++) {
    const number = parseInt(string[i], 10);
    result += (!Number.isNaN(number)) ? number : '';
  }

  return parseInt(result, 10);
};

const convertTimeToMinutes = (time) => {
  const arrTime = time.split(':');
  return parseInt(arrTime[0], 10) * 60 + parseInt(arrTime[1], 10);
};

const isMeetingAtTime = (dayStart, dayEnd, meetingStart, meetingDuration) => {
  dayStart = convertTimeToMinutes(dayStart);
  dayEnd = convertTimeToMinutes(dayEnd);
  meetingStart = convertTimeToMinutes(meetingStart);
  const meetingEnd = meetingStart + meetingDuration;

  return (dayStart <= meetingStart && meetingEnd <= dayEnd);
};

checkStringLength('проверяемая строка', 20);
isPalindrome();
extractNumbers();
isMeetingAtTime('08:00', '17:30', '14:00', 90);
