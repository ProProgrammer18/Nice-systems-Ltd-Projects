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
  fileId: {
    type: String,
    required: [true, "Filename required"],
  },
});

const fileModel = mongoose.model(
  "fileModel",
  fileSchema,
  "Files_Uploaded_Model"
);

module.exports = fileModel;
