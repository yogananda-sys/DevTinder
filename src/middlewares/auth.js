const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized data");
  } else {
    next();
  }
};

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    // Add your user authentication logic here
    if (!token) {
      throw new Error("Token not found");
    }

    const decodedToken = await jwt.verify(token, "DEV@Secret$951#");
    const { userId } = decodedToken;

    const user = await User.findById(userId).exec();
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user; // Attach the user object to the request for further use
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

const userAuthTest = (req, res, next) => {
  const token = "xyz";
  const isUserAuthorized = token === "xyz";
  if (!isUserAuthorized) {
    res.status(401).send("Unauthorized data");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth, userAuthTest };
