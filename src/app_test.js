const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  //console.log(req.body);

  try {
    // Validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // Creating a new instance of the User Model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added to DB Successfully..");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// Create LOGIN API
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error(
        "Invalid credentials. Please check your email and password!",
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error(
        "Invalid credentials. Please check your email and password!",
      );
    }
    const token = await jwt.sign({ userId: user._id }, "DEV@Secret$951#", {
      expiresIn: "7d", // Token expires in 7 days
    });

    res.cookie("token", token, {
      //expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Cookie expires in 7 days
      //httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 8 * 24 * 60 * 60 * 1000, // Cookie expires in 8 days
    });

    res.send("Login successfull!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;

    const { token } = cookies;

    if (!token) {
      throw new Error("Token not found");
    }

    const decodedToken = await jwt.verify(token, "DEV@Secret$951#");

    const { userId } = decodedToken;

    //console.log("Logged in user ID:" + userId);
    const user = await User.findById(userId).exec();

    if (!user) {
      throw new Error("User not found");
    }

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
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
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isUpdateAllowed) {
      throw new Error("Update is not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills can not be more than 10");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });

    if (!user) {
      res.send("User not found");
    } else {
      res.send("User updated successfylluy!!");
    }
  } catch (err) {
    res.send("UPDATE FAILED : " + err.message);
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
