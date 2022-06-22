function extractTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  // add leading 0 to minutes if needed
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return [hours, minutes]
}

// "13:23"
function formatTime24(date) {
  let [hours, minutes] = extractTime(date);
  return `${hours}:${minutes}`
}

// "1:23 PM"
function formatTime12(date) {
  let [hours, minutes] = extractTime(date);

  let ampm = hours < 12 ? 'AM' : 'PM';
  if (hours === 0) hours = 12;
  if (hours > 12) hours = hours - 12;

  return `${hours}:${minutes} ${ampm}`;
}

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

const days = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]

// "Saturday, Feb 14"
function formatMD(date) {
  let month = months[date.getMonth()],
  dayOfMonth = date.getDate(),
  dayOfWeek = days[date.getDay()]
  
  return `${dayOfWeek}, ${month} ${dayOfMonth}`
}

// "Feb 14, 2021"
function formatMDY(date) {
  let month = months[date.getMonth()],
      dayOfMonth = date.getDate(),
      year = date.getYear() + 1900;

  return `${month} ${dayOfMonth}, ${year}`
}

const DAY_LENGTH = 1000 * 60 * 60 * 24;
const WEEK_LENGTH = DAY_LENGTH * 7;

// Dynamically format date to a string based on how far it is from now
//  date  : date
//  today : most recent midnight. set this manually for performance
//            if calling this function many times
function formatDate(date, today = formatDate.today()) {
  let age = today - date;

  switch(true) {
    case age < 0:           return formatTime12(date);
    case age < DAY_LENGTH:  return 'Yesterday at ' + formatTime12(date);
    case age < WEEK_LENGTH: return formatMD(date);
    default:                return formatMDY(date);
  }
}
formatDate.today = function() {
  return new Date().setHours(0, 0, 0, 0)
}

export default formatDate;
export {
  formatTime12, formatTime24, formatMD, formatMDY
}
