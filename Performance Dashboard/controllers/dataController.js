const fs = require("fs");
const dataModel = require("../database/dataSchema");

const upload = fs.readFileSync("public/html/upload.html", "utf-8");

exports.uploadFile = async (req, res) => {
  try {
    res.end(upload);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Failed",
      err: err,
    });
  }
};

exports.getAllData = async (req, res) => {
  try {
    let data = await dataModel.find();
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Failed",
      err: err,
    });
  }
};

exports.separateData = (file, filename) => {
  let listOfRows = [];
  file.split("\n").forEach((element) => {
    let row = element.split("|");
    let totProTime =
      parseInt(row[5].trim().split(":")[0]) * 60 +
      parseInt(row[5].trim().split(":")[1]);
    let data = {
      reqURL: row[0].trim(),
      endpoint: row[1].trim(),
      type: row[2].trim(),
      reqTime: row[3].trim(),
      resTime: row[4].trim(),
      totProTime: totProTime,
      status: row[6].trim(),
      filename: filename.trim(),
    };
    listOfRows.push(data);
  });
  return listOfRows;
};

exports.findExtremeDates = (req, listOfRows) => {
  let allDates = [];
  listOfRows.forEach((ele) => {
    allDates.push(ele.reqTime);
  });
  let minDate = new Date(Math.min.apply(null, allDates));
  let maxDate = new Date(Math.max.apply(null, allDates));
  req.minDate = minDate;
  req.maxDate = maxDate;
};

exports.loadFile = async (req, res) => {
  try {
    console.log(req.file);
    const filepath =
      req.file.destination.split("/")[1] + "/" + req.file.filename;
    let file = fs.readFileSync("public/" + filepath, "utf-8");
    req.listOfRows = this.separateData(file, req.file.filename);
    this.findExtremeDates(req, req.listOfRows);
    let data = await dataModel.find();
    console.log(data);
    res.end("DONED");
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Failed",
      err: err,
    });
  }
};

exports.saveData = async (req, res) => {
  try {
    dataModel.insertMany(req.listOfRows);
    console.log("Data uploaded");
    res.end(file);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Failed",
      err: err,
    });
  }
};
