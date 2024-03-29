const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const connectToMongoDB = async (callback) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    await callback();
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

module.exports = connectToMongoDB;
