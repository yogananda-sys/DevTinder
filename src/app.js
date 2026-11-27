const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

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

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error(
        "Invalid credentials. Please check your email and password!",
      );
    }
    const token = await user.getJWT();

    res.cookie("token", token, {
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 8 * 24 * 60 * 60 * 1000, // Cookie expires in 8 days
    });

    res.send("Login successfull!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user; // Access the user object attached by the userAuth middleware
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + " " + "Connection request sent successfully!");
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
