const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const users = require("./routes/user");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/register", users);

app.get("/", (req, res) => {
  res.send("welcome to the api");
});

mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("db connected!");
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
