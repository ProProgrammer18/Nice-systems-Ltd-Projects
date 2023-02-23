const fs = require("fs");
const fileModel = require("../database/fileSchema");
const formatHelper = require("../utils/formatHelper");

exports.checkPrevFiles = async (req, res, next) => {
  try {
    const firstReqTime = req.minDate;
    const lastReqTime = req.maxDate;

    const files = await fileModel.find();

    const currentDate = new Date()
      .toISOString()
      .split("T")[0]
      .split("-")
      .join("");
    const timespan =
      formatHelper.fomatTimeHrMin(firstReqTime) +
      "-" +
      formatHelper.fomatTimeHrMin(lastReqTime);

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
      console.log("File stored !!");
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
