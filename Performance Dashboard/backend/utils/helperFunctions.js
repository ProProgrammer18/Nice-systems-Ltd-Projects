/* A function that takes a date and returns a string in the format of HH:MM. */
exports.fomatTime = (reqTime) => {
  let date = new Date(reqTime);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes;
};

/* Converting the date to a string in the format of HHMM. */
exports.fomatTimeHrMin = (reqTime) => {
  let date = new Date(reqTime);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return hours + "" + minutes;
};

/* A function that takes two parameters, `req` and `listOfRows`. It then creates an array called
`allDates` and then loops through the `listOfRows` array and pushes the `reqTime` and `resTime`
properties of each element into the `allDates` array. It then creates two variables called `minDate`
and `maxDate` and sets them to the minimum and maximum values of the `allDates` array. It then sets
the `minDate` and `maxDate` properties of the `req` object to the `minDate` and `maxDate` variables. */
//! exports.findExtremeDates = (req, listOfRows) => {
//   let allDates = [];

//   listOfRows.forEach((ele) => {
//     allDates.push(ele.reqTime);
//     allDates.push(ele.resTime);
//   });

//   let minDate = new Date(Math.min.apply(null, allDates));
//   let maxDate = new Date(Math.max.apply(null, allDates));
//   req.minDate = minDate;
//   req.maxDate = maxDate;
//! };

exports.findExtremeDates = (req, listOfRows) => {
  if (listOfRows.length === 0) {
    req.minDate = null;
    req.maxDate = null;
    return;
  }

  let minDate = new Date(listOfRows[0].reqTime);
  let maxDate = new Date(listOfRows[0].resTime);

  for (let i = 1; i < listOfRows.length; i++) {
    const reqTime = new Date(listOfRows[i].reqTime);
    const resTime = new Date(listOfRows[i].resTime);

    if (reqTime < minDate) {
      minDate = reqTime;
    }

    if (resTime > maxDate) {
      maxDate = resTime;
    }
  }

  req.minDate = minDate;
  req.maxDate = maxDate;
};
