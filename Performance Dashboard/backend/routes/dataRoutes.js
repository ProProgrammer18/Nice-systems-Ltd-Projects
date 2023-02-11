const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const fileController = require("../controllers/fileController");

const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.get("/", dataController.uploadFile);

router.post(
  "/insert",
  upload.single("data"),
  dataController.loadFile,
  fileController.checkPrevFiles,
  dataController.saveData
);

router.get("/allData", dataController.getAllData);

router.post(
  "/filterData",
  dataController.getReqPerMin,
  dataController.filterData
);

module.exports = router;
