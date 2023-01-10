const mongoose = require("./connect");

const fileSchema = new mongoose.Schema({
  firstReqTime: {
    type: Date,
    required: [true, "firstReqTime required"],
  },
  lastReqTime: {
    type: Date,
    required: [true, "lastReqTime required"],
  },
  filename: {
    type: String,
    required: [true, "Filename required"],
  },
});

const fileModel = mongoose.model("fileModel", fileSchema, "file");

module.exports = fileModel;
