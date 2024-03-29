const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  reqURL: {
    type: String,
    required: [true, "request URL required"],
  },
  endpoint: {
    type: String,
    required: [true, "endpoint required"],
  },
  type: {
    type: String,
    required: [true, "type required"],
  },
  reqTime: {
    type: Date,
    required: [true, "request Time required"],
  },
  resTime: {
    type: Date,
    required: [true, "response Time required"],
  },
  totProTime: {
    type: Number,
    required: [true, "Total Processing time required"],
  },
  status: {
    type: Number,
    required: [true, "request status required"],
  },
  fileId: {
    type: String,
    required: [true, "Filename required"],
  },
  companyName: {
    type: String,
    required: [true, "Company Name required"],
  },
});

const dataModel = mongoose.model("dataModel", dataSchema, "Request_Logs_Model");

module.exports = dataModel;
