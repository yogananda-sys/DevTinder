const express = require("express");
const { error } = require("node:console");

const connectDB = require("./config/database");
const { User } = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User model
  const user = new User({
    firstName: "Sachin",
    lastName: "Tendulkar",
    emailId: "Sachin@mail.com",
    password: "Sachin@!23",
  });
  try {
    await user.save();
    res.send("User added to DB Successfully..");
  } catch (err) {
    res.status(400).send("Error saving the user :", + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection is established");
    app.listen(7777, () => {
      console.log("Server is successfully listening on the port 7777....");
    });
  })
  .catch((err) => {
    console.error("Database can't be connected!!");
  });

// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(501).send("Something went wrong");
//   }
// });

// app.get("/getUserData", (req, re) => {
//   // try {
//   // Logic of DB call and get user data
//   throw new error("sdfggdf");
//   res.send("User data sent");
//   // } catch (err) {
//   //   res.status(500).send("Some error contact support team");
//   // }
// });

// app.use("/", (err, req, res, next) => {
//   if (err) {
//     // Log error
//     res.status(501).send("Something went wrong");
//   }
// });

// const { adminAuth, userAuth } = require("./middlewares/auth");

// app.use("/admin", adminAuth);

// app.post("/user/login", (req, res) => {
//   res.send("User logged in successfully!");
// });

// app.get("/user/data", userAuth, (req, res) => {
//   res.send("User data sent");
// });

// app.get("/admin/getAllData", (req, res) => {
//   res.send("Get all data");
// });

// app.get("/admin/deleteAllData", (req, res) => {
//   res.send("Delete all data");
// });

//app.use("/route", rH, [rH2, rH3], rH4, rH5);

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("Handling the route user!!");
//     //res.send("1st Response!!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the route user 2!!");
//     //res.send("2nd Response!!");
//     next();
//   },
//   [
//     (req, res, next) => {
//       console.log("Handling the route user 3!!");
//       //res.send("3rd Response!!");
//       next();
//     },
//     (req, res, next) => {
//       console.log("Handling the route user 4!!");
//       //res.send("4th Response!!");
//       next();
//     },
//   ],
//   (req, res, next) => {
//     console.log("Handling the route user 5!!");
//     res.send("5th Response!!");
//   },
// );
