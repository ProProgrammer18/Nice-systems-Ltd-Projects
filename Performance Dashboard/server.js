const dotenv = require("dotenv").config();
const express = require("express");
const router = require("./routes/dataRoutes");
const bodyParser = require("body-parser");
// const dirname = __dirname;
// console.log(dirname);

require("./database/connect");
const app = express();

app.use(express.static(`${__dirname}/ public`));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/", router);

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log("App running on port " + port);
});
