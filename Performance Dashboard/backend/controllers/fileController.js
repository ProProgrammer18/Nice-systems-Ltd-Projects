const fs = require("fs");
const fileModel = require("../database/fileSchema");
const helperFunctions = require("../utils/helperFunctions");

exports.checkPrevFiles = async (req, res, next) => {
  try {
    console.log("Checking if same file exists !!");
    const firstReqTime = req.minDate;
    const lastReqTime = req.maxDate;

    const files = await fileModel.find({
      companyName: req.body.companyName,
    });

    const currentDate = new Date()
      .toISOString()
      .split("T")[0]
      .split("-")
      .join("");
    const timespan =
      helperFunctions.fomatTimeHrMin(firstReqTime - 19800000) +
      "-" +
      helperFunctions.fomatTimeHrMin(lastReqTime - 19800000);

    const fileId =
      req.body.companyName + "_" + currentDate + "-" + timespan + ".log"; //BOA_20230101-1000-1030.log
    req.fileId = fileId;
    req.prevFileFound = 0;

    let fRT = 0,
      lRT = 0;
    files.forEach((ele) => {
      if (
        ele.firstReqTime.getTime() <= firstReqTime.getTime() &&
        ele.lastReqTime.getTime() >= lastReqTime.getTime()
      ) {
        lRT = 1;
        fRT = 1;
      }
    });

    if (fRT && lRT) {
      req.prevFileFound = 1;
      next();
    } else {
      const companyName = req.body.companyName;
      const file = { firstReqTime, lastReqTime, fileId, companyName };
      fileModel.create(file);
      console.log("File data stored !!");
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      err: err,
    });
  }
};
