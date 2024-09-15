import dotenv from "dotenv";
import users from "./data/users.js";
import User from "./models/userModel.js";
import connectDB from "./ConfigDB/connectDB.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    await User.insertMany(users);

    console.log("Data Imported! ✔");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};
const DestroyData = async () => {
  try {
    await User.deleteMany();

    console.log("Data Destroyed! ✔");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  DestroyData();
} else {
  importData();
}
