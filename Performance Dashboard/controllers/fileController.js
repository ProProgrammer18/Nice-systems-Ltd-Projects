const fileModel = require("../database/fileSchema");

exports.checkPrevFiles = async (req, res) => {
  try {
    const firstReqTime = req.minDate,
      lastReqTime = req.maxDate;
    const files = fileModel.find({});
    console.log(files);
  } catch (err) {}
};
