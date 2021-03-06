var MONTH_MAPPING = {
  "1": "January",
  "2": "February",
  "3": "March",
  "4": "April",
  "5": "May",
  "6": "June",
  "7": "July",
  "8": "August",
  "9": "September",
  "19": "October",
  "11": "November",
  "12": "December"
};

var util = {};

util.formatDate = function (pubDate) {
  var parts = pubDate.split("-");
  if (pubDate.split("-").length >= 3) {
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    // Note: months are 0-based
    var localDate = new Date(parts[0], parts[1]-1, parts[2]);
    return localDate.toUTCString().slice(0, 16);
  } else {
    var month = parts[1].replace("0", "");
    var year = parts[0];
    return MONTH_MAPPING[month]+" "+year;
  }
};

module.exports = util;
