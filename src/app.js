const express = require("express");

const app = express();

// app.use("/user", (req, res) => {
//   res.send("HAHAHAHAHAHAHAHAH");
// });

// This will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "Virat", lastName: "Raj" });
});

app.post("/user", (req, res) => {
  res.send("Data Saved Successfully into Database");
});

app.put("/user", (req, res) => {
  res.send({ firstName: "Rohit", lastName: "Sharma" });
});

app.patch("/user", (req, res) => {
  res.send({ firstName: "Rohit", lastName: "Mehra" });
});

app.delete("/user", (req, res) => {
  res.send("Data deleted Successfully!");
});

// Order of the routes matter a lot
app.use("/hello", (req, res) => {
  res.send("Hello namaste students we going to build tinder project");
});

app.use("/hello/2", (req, res) => {
  res.send("Hello namaste students");
});

// this will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
  res.send("Tinder Project is Running Successfully!");
});

// app.use("/", (req, res) => {
//   res.send("Hello routes");
// });

app.listen(7777, () => {
  console.log("Server is listening the port 7777....");
});
