const dotenv = require("dotenv").config();
const express = require("express");
const router = require("./routes/dataRoutes");
const cors = require("cors");
require("./database/connect");

const app = express();

app.use(cors());

app.use(express.static(`${__dirname}/ public`));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", router);

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log("App running on port " + port);
});
