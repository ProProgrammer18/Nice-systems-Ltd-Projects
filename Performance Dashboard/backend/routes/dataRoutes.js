const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const fileController = require("../controllers/fileController");

const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/dataFiles");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: multerStorage });

router.get("/", dataController.uploadFile);

router.post(
  "/insert",
  upload.single("data"),
  dataController.loadFile,
  fileController.checkPrevFiles,
  dataController.saveData
);

router.get("/allData", dataController.getAllData);

router.post("/filterData", dataController.filterData);

module.exports = router;
