const connectToMongoDB = require("../db/setupDb");
const userModel = require("../models/userModel");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promptUserConfirmation = async () => {
  return new Promise((resolve, reject) => {
    rl.question(
      "[ATENTION] Are you sure you want to delete all users? (y/n) ",
      (answer) => {
        resolve(answer.toLowerCase() === "y");
      }
    );
  });
};

const resetUsers = async () => {
  try {
    const confirmation = await promptUserConfirmation();
    if (confirmation) {
      await deleteUsers();
      console.log("Users deleted successfully.");
    } else {
      console.log("Operation to delete users canceled.");
    }
  } catch (error) {
    console.log("Error deleting users", error);
  } finally {
    rl.close();
    process.exit();
  }
};

const deleteUsers = async () => {
  try {
    await connectToMongoDB(async () => {
      await userModel.deleteMany();
    });
  } catch (error) {
    throw new Error("Error deleting users", error);
  }
};

resetUsers();
