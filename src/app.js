const express = require("express");

const app = express();

// Reading the query params http://localhost:7777/user?userId=555
app.get("/user", (req, res) => {
  console.log(req.query);
  res.send({ firstName: "Akshay", lastName: "Saini" });
});

// Dynamic routes query params : means Dynamic => http://localhost:7777/user/809/virat/password
app.get("/user/:userId/:name/:password", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Akshay", lastName: "Saini" });
});

app.listen(7777, () => {
  console.log("Server is listening the port 7777....");
});
