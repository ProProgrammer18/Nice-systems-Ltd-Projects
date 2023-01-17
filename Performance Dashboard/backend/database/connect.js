const mongoose = require("mongoose");

const database_password = process.env.DATABASE_PASSWORD;
const database_url = process.env.DATABASE_URL.replace(
  "<password>",
  database_password
);

mongoose.set('strictQuery', false);
mongoose.connect(database_url, () => {
  console.log("Connected to database");
});

module.exports = mongoose;
