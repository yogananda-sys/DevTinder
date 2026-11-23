const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 4, maxxLength: 30 },
    lastName: { type: String },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      validate(val) {
        if (!["male", "female", "others"].includes(val)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    photoUrl: { type: String, default: "images/avatar-profile.jpg" },
    about: {
      type: String,
      default: "This information is required for application validation",
    },
    skills: [String],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
