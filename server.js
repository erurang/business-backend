const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Sales Management Backend Running!");
});

app.get("/test2", (req, res) => {
  res.send("test~");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
