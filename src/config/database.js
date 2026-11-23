const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://yoganandan185_db_user:mPLRozcCHwZX8FiV@nodecluster.p90wg0b.mongodb.net/devTinder",
  );
};

module.exports = connectDB;


