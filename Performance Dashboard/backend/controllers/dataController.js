const fs = require("fs");
const helperFunctions = require("../utils/helperFunctions");
const dataModel = require("../database/dataSchema");

const upload = fs.readFileSync("public/html/upload.html", "utf-8");
exports.uploadFile = async (req, res) => {
  try {
    res.end(upload);
  } catch (err) {
    console.log(err);
    res.status(500).json({
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
    res.status(500).json({
      status: "Failed",
      err: err,
    });
  }
};

exports.separateData = (file) => {
  try {
    let listOfRows = [];
    file.split("\n").forEach((element) => {
      try {
        let reqDetails = element.split(" - ")[1];
        let reqTimeDetails = element.split(" - ")[0];

        let row = reqDetails.split("|");

        let reqDate = reqTimeDetails.split(" ")[2];

        let reqTime = new Date(reqDate + " " + row[6]);
        reqTime.setHours(reqTime.getHours() + 5);
        reqTime.setMinutes(reqTime.getMinutes() + 30);

        let resTime = new Date(reqDate + " " + row[7]);
        resTime.setHours(resTime.getHours() + 5);
        resTime.setMinutes(resTime.getMinutes() + 30);

        let endpoint = row[4].split("/");
        endpoint = endpoint[endpoint.length - 1];

        let data = {
          reqURL: row[4],
          endpoint: endpoint,
          type: row[3],
          reqTime: reqTime,
          resTime: resTime,
          totProTime: parseInt(row[8]),
          status: parseInt(row[5]),
        };
        listOfRows.push(data);
      } catch (err) {}
    });
    // console.log(listOfRows);
    return listOfRows;
  } catch (err) {
    console.log(err);
    console.log("File not present in required format!!");
  }
};

exports.loadFile = async (req, res, next) => {
  try {
    console.log("Parsing file will take some time!!");
    let file = req.file.buffer.toString();
    file = file.replace(/^\n+|\n+$/g, "").replace(/\n{2,}/g, "\n");

    req.listOfRows = this.separateData(file);

    helperFunctions.findExtremeDates(req, req.listOfRows);

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      err: err,
    });
  }
};

exports.saveData = async (req, res, next) => {
  try {
    if (req.prevFileFound) {
      console.log("Same File found !!");
      res.status(200).json({
        message: "File with similar data already exists",
      });
    } else {
      req.listOfRows.forEach(async (ele) => {
        ele.reqURL = ele.reqURL ? ele.reqURL : "/";
        ele.endpoint = ele.endpoint ? ele.endpoint : "/";
        ele.type = ele.type ? ele.type : "/";
        ele.reqTime = ele.reqTime ? ele.reqTime : new Date();
        ele.resTime = ele.resTime ? ele.resTime : new Date();
        ele.totProTime = ele.totProTime ? ele.totProTime : 0;
        ele.status = ele.status ? ele.status : 0;

        ele.fileId = req.fileId.trim();
        ele.companyName = req.body.companyName;
      });

      console.log("Data uploading to database !! May take some time !!");

      const batchSize = 10000;
      for (let i = 0; i < req.listOfRows.length; i += batchSize) {
        const batch = req.listOfRows.slice(i, i + batchSize);
        await dataModel.insertMany(batch);
        console.log(`Uploaded batch ${i / batchSize + 1}`);
      }

      console.log("Data uploaded to database !!");

      res.status(201).json({
        message: "File upload successful!!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      err: err,
    });
  }
};

exports.getReqPerMin = async (req, res, next) => {
  try {
    console.log("Fetching data from database !!");
    let data = await dataModel.find({
      reqTime: {
        $gte: req.body.startDate,
        $lte: req.body.endDate,
      },
      companyName: req.body.companyName,
    });
    req.requiredData = data;

    let reqPerMin = new Map();

    console.log("Processing data to get request per minute !!");

    data.forEach((req) => {
      let reqTime = new Date(req.reqTime.getTime() - 19800000);
      reqTime = helperFunctions.fomatTime(reqTime);
      let count = reqPerMin.get(reqTime) || 0;
      reqPerMin.set(reqTime, count + 1);
    });
    req.reqPerMinObj = Object.fromEntries(reqPerMin);
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed in fetching data",
      err: err,
    });
  }
};

exports.tableData = async (req, res, next) => {
  try {
    let data = req.requiredData;
    let allTableData = new Map();

    console.log("Processing data to get table data !!");

    data.forEach((ele) => {
      if (allTableData.has(ele.reqURL)) {
        allTableData.get(ele.reqURL)[0]++;
        allTableData.get(ele.reqURL)[1] =
          allTableData.get(ele.reqURL)[1] + ele.totProTime;

        if (ele.status >= 200 && ele.status < 300) {
          allTableData.get(ele.reqURL)[4]++;
        } else if (ele.status >= 300 && ele.status < 400) {
          allTableData.get(ele.reqURL)[5]++;
        } else if (ele.status >= 400 && ele.status < 500) {
          allTableData.get(ele.reqURL)[6]++;
        } else if (ele.status >= 500 && ele.status < 600) {
          allTableData.get(ele.reqURL)[7]++;
        }
      } else {
        // [total request for that api, avg processing time, p95, ignore this value, 2xx, 3xx, 4xx, 5xx]
        let lst = [1, ele.totProTime, 0, 0, 0, 0, 0, 0];
        if (ele.status >= 200 && ele.status < 300) {
          lst = [1, ele.totProTime, 0, 0, 1, 0, 0, 0];
        } else if (ele.status >= 300 && ele.status < 400) {
          lst = [1, ele.totProTime, 0, 0, 0, 1, 0, 0];
        } else if (ele.status >= 400 && ele.status < 500) {
          lst = [1, ele.totProTime, 0, 0, 0, 0, 1, 0];
        } else if (ele.status >= 500 && ele.status < 600) {
          lst = [1, ele.totProTime, 0, 0, 0, 0, 0, 1];
        }
        allTableData.set(ele.reqURL, lst);
      }
    });

    data = data.sort((a, b) => {
      if (a.reqTime < b.reqTime) return -1;
      else if (a.reqTime > b.reqTime) return 1;
      else return 0;
    });

    data.forEach((ele) => {
      allTableData.get(ele.reqURL)[3]++;
      if (
        allTableData.get(ele.reqURL)[3] ==
        Math.ceil(allTableData.get(ele.reqURL)[0] * 0.95)
      ) {
        allTableData.get(ele.reqURL)[2] = ele.totProTime;
      }
    });

    allTableData.forEach((ele) => {
      ele[1] = (ele[1] / ele[0]).toFixed(2);
    });

    // [total request for that api, avg processing time, p95, ignore this value]
    req.allTableData = Object.fromEntries(allTableData);
    // console.log(allTableData);

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed in fetching data",
      err: err,
    });
  }
};

// Filters Web and Mobile request count
exports.filterData = async (req, res) => {
  try {
    let data = req.requiredData;
    console.log("Processing data to get web and mobile data !!");
    var webcnt = 0,
      mobilecnt = 0;
    ResponseWeb = new Map();
    ResponseMobile = new Map();
    for (let i = 0; i < data.length; i++) {
      if (data[i].type == "Web" || data[i].type == "Web_Agent") {
        webcnt++;
        if (!ResponseWeb[data[i].status]) {
          ResponseWeb[data[i].status] = 1;
        } else {
          ResponseWeb[data[i].status]++;
        }
      } else {
        mobilecnt++;
        if (!ResponseMobile[data[i].status]) {
          ResponseMobile[data[i].status] = 1;
        } else {
          ResponseMobile[data[i].status]++;
        }
      }
    }
    res.status(200).send({
      webcnt: webcnt,
      mobilecnt: mobilecnt,
      ResponseWeb: ResponseWeb,
      ResponseMobile: ResponseMobile,
      reqPerMin: req.reqPerMinObj,
      allTableData: req.allTableData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed in fetching data",
      err: err,
    });
  }
};
