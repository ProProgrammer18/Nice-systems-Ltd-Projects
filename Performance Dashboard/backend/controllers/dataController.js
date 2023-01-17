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
  try {
    let listOfRows = [];
    file.split("\n").forEach((element) => {
      let row = element.split("|");
      let totProTime =
        parseInt(row[5].trim().split(":")[0]) +
        parseInt(row[5].trim().split(":")[1]);

      let data = {
        reqURL: row[0].trim(),
        endpoint: row[1].trim(),
        type: row[2].trim(),
        reqTime: new Date(new Date(row[3].trim()).getTime() + 19800000),
        resTime: new Date(new Date(row[4].trim()).getTime() + 19800000),
        totProTime: totProTime,
        status: row[6].trim(),
        filename: filename.trim(),
      };
      listOfRows.push(data);
    });
    return listOfRows;
  } catch {
    console.log("File not present in required format!!");
  }
};

exports.convertToDate = (givenDate) => {
  // let gd = givenDate.split("/");

  // let DD = parseInt(gd[0]);
  // let MM = parseInt(gd[1]) - 1;
  // let YY = parseInt(gd[2].split("-")[0]);
  // let time = gd[2].split("-")[1].split(":");
  // let hh = parseInt(time[0]) + 6;
  // let mm = parseInt(time[1]) - 30;
  // let ss = 0;
  // let ms = 0;

  // // ! SOME PROBLEM WITH THE TIME (Running 5 hrs 30 mins behind for some reason)

  // date = new Date(YY, MM, DD, hh, mm, ss, ms);
  const date = new Date(new Date(givenDate).getTime() + 19800000);
  return date;
};

exports.findExtremeDates = (req, listOfRows) => {
  let allDates = [];

  listOfRows.forEach((ele) => {
    allDates.push(this.convertToDate(ele.reqTime));
    allDates.push(this.convertToDate(ele.resTime));
  });

  let minDate = new Date(Math.min.apply(null, allDates));
  let maxDate = new Date(Math.max.apply(null, allDates));
  req.minDate = minDate;
  req.maxDate = maxDate;
};

exports.loadFile = async (req, res, next) => {
  try {
    console.log(req.file);

    const filepath =
      req.file.destination.split("/")[1] + "/" + req.file.filename;

    req.filepathOfNewFile = "public/" + filepath;

    let file = fs.readFileSync("public/" + filepath, "utf-8");

    req.listOfRows = this.separateData(file, req.file.filename);

    this.findExtremeDates(req, req.listOfRows);

    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Failed",
      err: err,
    });
  }
};

exports.saveData = async (req, res, next) => {
  try {
    if (req.prevFileFound) {
      console.log("File already found !!");
      res.status(201).json({
        message: "File with similar data already exists",
      });
    } else {
      dataModel.insertMany(req.listOfRows);
      console.log("Data uploaded");
      res.status(200).json({
        message: "File upload successful!!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Failed",
      err: err,
    });
  }
};

exports.filterData = async (req, res) => {
  try {
    let data = await dataModel.find({
      reqTime: {
        $gte: req.body.startDate,
        $lte: req.body.endDate,
      },
    });
    var webcnt=0,mobilecnt=0;
    ResponseWeb = new Map();
    ResponseMobile = new Map();
    for(let i=0;i<data.length;i++){
      if(data[i].type=="Web"){
        webcnt++;
        if(!ResponseWeb[data[i].status]){
          ResponseWeb[data[i].status]=1;
        }
        else{
          ResponseWeb[data[i].status]++;
        }
      }
      else{
        mobilecnt++;
        if(!ResponseMobile[data[i].status]){
          ResponseMobile[data[i].status]=1;
        }
        else{
          ResponseMobile[data[i].status]++;
        }
      }
    }
    res.status(200).send({webcnt:webcnt,mobilecnt:mobilecnt,ResponseWeb:ResponseWeb,ResponseMobile:ResponseMobile});
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Failed in fetching data",
      err: err,
    });
  }
}