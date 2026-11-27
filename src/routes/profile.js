const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user; // Access the user object attached by the userAuth middleware
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Edit profile data contains invalid fields!");
    }
    const loggedInUser = req.user; // Access the user object attached by the userAuth middleware

    // loggedInUser.firstName = req.body.firstName;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    //console.log("Logged-in user:", loggedInUser);

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} ${loggedInUser.lastName}, Profile updated successfully!`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
