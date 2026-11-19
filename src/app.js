const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
  res.send("Hello namaste students we going to build tinder project");
});

app.use("/test", (req, res) => {
  res.send("Tinder Project is Running Successfully!");
});

app.listen(7777, () => {
  console.log("Server is listening the port 7777....");
});
