const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const database_password = process.env.DATABASE_PASSWORD;
const dataModel = require("../database/dataSchema");
const database_url = process.env.DATABASE_URL.replace(
  "<password>",
  database_password
);

mongoose.connect(database_url, () => {
  console.log("Connected to database");
});

let del = async () => {
  await dataModel.deleteMany();
  console.log("Data Deleted");
  process.exit();
};

if (process.argv[2] == "--delete") del();
else {
  console.log("Send with option --delete");
  process.exit();
}
