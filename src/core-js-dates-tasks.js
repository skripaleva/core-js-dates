/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  const currentDate = new Date(date);
  return currentDate.getTime();
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function getTime(date) {
  const currentDate = new Date(date);
  let hours = currentDate.getHours();
  if (hours < 9) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 9) {
    minutes = `0${minutes}`;
  }
  let secunds = currentDate.getSeconds();
  if (secunds < 9) {
    secunds = `0${secunds}`;
  }
  return `${hours}:${minutes}:${secunds}`;
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => '
 */
function getDayName(date) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const currentDate = new Date(date);
  const day = currentDate.getUTCDay();
  return days[day];
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
function getNextFriday(date) {
  const currentDate = new Date(date);
  const day = currentDate.getUTCDay();
  const milliSeconds = currentDate.getTime();
  let daysTillFriday = 0;
  if (day < 5) {
    daysTillFriday = 5 - day;
  } else {
    daysTillFriday = 7 - day + 5;
  }
  const newDate = milliSeconds + 86400000 * daysTillFriday;
  return new Date(newDate);
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && year % 4 === 0) {
    return 29;
  }
  return daysInMonth[month - 1];
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const dateOne = new Date(dateStart);
  const dateTwo = new Date(dateEnd);

  dateOne.toUTCString();

  dateTwo.toUTCString();

  const result = dateTwo - dateOne;

  return result / (1000 * 60 * 60 * 24) + 1;
}

getCountDaysOnPeriod('2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z');

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(date, period) {
  const dateOne = new Date(period.start);
  const dateTwo = new Date(period.end);
  const dateCheck = new Date(date);
  dateOne.toUTCString();
  dateTwo.toUTCString();
  dateCheck.toUTCString();
  return dateOne <= dateCheck && dateCheck <= dateTwo;
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(date) {
  const currentDate = new Date(date);
  const day = currentDate.getUTCDate();
  const month = currentDate.getUTCMonth();
  const year = currentDate.getUTCFullYear();
  let hours = currentDate.getUTCHours();
  let minutes = currentDate.getUTCMinutes();
  let secunds = currentDate.getUTCSeconds();
  let timeOfDay = 'AM';
  if (hours >= 12) {
    timeOfDay = 'PM';
  }
  if (hours > 12) {
    hours -= 12;
  }
  if (minutes < 9) {
    minutes = `0${minutes}`;
  }
  if (secunds < 9) {
    secunds = `0${secunds}`;
  }
  return `${month + 1}/${day}/${year}, ${hours}:${minutes}:${secunds} ${timeOfDay}`;
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth(month, year) {
  const date = new Date(year, month, 0);
  const days = date.getDate();
  let weekends = 0;
  for (let i = 1; i <= days; i += 1) {
    const day = new Date(year, month - 1, i);
    const dayOfWeek = day.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekends += 1;
    }
  }
  return weekends;
}

/**
 * Returns the week number of the year for a given date.
 * The first week of the year is defined according to ISO8601.
 * The first day of the week is Monday.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(date) {
  const year = date.getFullYear();
  const firstDayOfYear = new Date(year, 0, 1);
  const diff = getCountDaysOnPeriod(firstDayOfYear, date);
  return Math.ceil(diff / 7);
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let res = -1;
  while (res === -1) {
    const testDate = new Date(year, month, 13);
    const day = testDate.getDay();
    if (day === 5) {
      res = testDate;
    } else if (month < 12) {
      month += 1;
    } else {
      month = 0;
      year += 1;
    }
  }
  return res;
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  const month = date.getMonth();
  let season = 0;
  switch (month) {
    case 1:
    case 2:
    case 0:
      season = 1;
      break;
    case 3:
    case 4:
    case 5:
      season = 2;
      break;
    case 6:
    case 7:
    case 8:
      season = 3;
      break;
    case 9:
    case 10:
    case 11:
      season = 4;
      break;
    default:
      season = 0;
      break;
  }
  return season;
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule(period, countWorkDays, countOffDays) {
  const scheduleArr = [];
  const dateArr = period.start.split('-');
  let date = new Date(Date.UTC(dateArr[2], dateArr[1] - 1, dateArr[0]));
  const endDateArr = period.end.split('-');
  const endDate = new Date(
    Date.UTC(endDateArr[2], endDateArr[1] - 1, endDateArr[0])
  );
  while (endDate - date >= 0) {
    for (let i = countWorkDays; i > 0; i -= 1) {
      if (endDate - date >= 0) {
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth();
        const day = date.getUTCDate();
        let printDay = day;
        if (day < 10) {
          printDay = `0${day}`;
        }
        let printMonth = month + 1;
        if (month < 10) {
          printMonth = `0${month + 1}`;
        }
        scheduleArr.push(`${printDay}-${printMonth}-${year}`);
        date = new Date(year, month, day + 1);
      }
    }
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    date = new Date(Date.UTC(year, month, day + countOffDays));
  }
  return scheduleArr;
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(date) {
  const year = date.getFullYear();
  return year % 4 === 0;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
