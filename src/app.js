const express = require("express");
const connectDB = require("./config/database");

const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  //console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added to DB Successfully..");
  } catch (err) {
    res.status(400).send("Error saving the user! : " + err.message);
  }
});

// Get user by ID
app.get("/userId", async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);
  try {
    const user = await User.findById({ _id: userId }).exec();
    // const user = await User.findById(userId).exec();
    if (user.length === 0) {
      res.send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

// Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail }).exec();
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

app.get("/user/1", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail }).exec();
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

// Feed API - GET/feed - get all users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}).exec();
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

// Delete a user
app.delete("/user", async (req, res) => {
  const id = req.body.id;
  console.log(id);
  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.send("User not found");
    } else {
      res.send("User deleted successfully!");
    }
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

//Update a user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    if (!user) {
      res.send("User not found");
    } else {
      res.send("User updated successfylluy!!");
    }
  } catch (err) {
    res.send("Something went wrong" + err.message);
  }
});

//Update a user by options
app.patch("/userOpt", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "before",
    });
    console.log(user);
    if (!user) {
      res.send("User not found");
    } else {
      res.send("User updated Options successfylluy!!");
    }
  } catch (err) {
    res.send("Something went wrong");
  }
});

//Update a user by email ID
app.patch("/useremail", async (req, res) => {
  const userEmail = req.body.emailId;
  const data = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { emailId: userEmail },
      data,
      {
        lean: false,
      },
      { returnDocument: "after" },
      { new: false },
    );
    console.log(user);
    if (!user) {
      res.send("User not found");
    } else {
      res.send("User updated  successfylluy!!");
    }
  } catch (err) {
    res.send("Something went wrong");
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

//   app.post("/signup", async (req, res) => {
//   // Creating a new instance of the User model
//   const user = new User({
//     firstName: "Sachin",
//     lastName: "Tendulkar",
//     emailId: "Sachin@mail.com",
//     password: "Sachin@!23",
//   });
//   try {
//     await user.save();
//     res.send("User added to DB Successfully..");
//   } catch (err) {
//     res.status(400).send("Error saving the user :", + err.message);
//   }
// });

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
