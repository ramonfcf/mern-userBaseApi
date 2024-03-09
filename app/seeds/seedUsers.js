const dbConnection = require("../db/setupDb");
const userModel = require("../models/userModel");
const fakeUsers = require("./fakeUsers");

const seedUsers = async () => {
  try {
    await dbConnection(seed);
  } catch (error) {
    console.log("Error seeding users", error);
    process.exit(1);
  }
};

const seed = async () => {
  try {
    await userModel.deleteMany();
    for (const user of fakeUsers) {
      console.log("Creating user", user);
      await userModel.create(user);
    }
    console.log("Users seeded successfully");
  } catch (error) {
    console.log("Error seeding users", error);
  } finally {
    process.exit();
  }
};

seedUsers();

module.exports = seedUsers;
