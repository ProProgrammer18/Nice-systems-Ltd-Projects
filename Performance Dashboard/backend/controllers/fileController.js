const fs = require("fs");
const fileModel = require("../database/fileSchema");

exports.checkPrevFiles = async (req, res, next) => {
  try {
    const firstReqTime = req.minDate;
    const lastReqTime = req.maxDate;
    const files = await fileModel.find();
    const filename = req.file.filename;
    req.prevFileFound = 0;
    let fRT = 0,
      lRT = 0;
    files.forEach((ele) => {
      if (ele.firstReqTime.getTime() == firstReqTime.getTime()) {
        fRT = 1;
      }
      if (ele.lastReqTime.getTime() == lastReqTime.getTime()) {
        lRT = 1;
      }
    });

    if (fRT && lRT) {
      deleteFile(req, res);
      req.prevFileFound = 1;
      next();
    } else {
      const file = { firstReqTime, lastReqTime, filename };
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

let deleteFile = async (req, res) => {
  try {
    await fs.unlink(req.filepathOfNewFile, (err) => {
      if (err) {
        throw err;
      }
      console.log("File deleted as previous file has same data...");
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Failed",
      err: err,
    });
  }
};
