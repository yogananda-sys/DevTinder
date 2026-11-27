const express = require("express");

const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

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

authRouter.post("/login", async (req, res) => {
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

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date() });
  res.send("Logout successfull!");
});

module.exports = authRouter;
