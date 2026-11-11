const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const userModel = require("./models/userModel");

dotenv.config();

const createAdmin = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected");

    const existingAdmin =
      await userModel.findOne({
        email: "admin@gamesquarechess.com",
      });

    if (existingAdmin) {

      console.log("Admin already exists");

      process.exit(0);
    }


    const hashedPassword =
      await bcrypt.hash(
        "Admin@12345",
        10
      );


    const admin =
      await userModel.create({

        name: "Game Square Admin",

        email: "admin@gamesquarechess.com",

        phone: "9999999999",

        password: hashedPassword,

        role: "admin",

      });


    console.log(
      "Admin created successfully"
    );

    console.log(
      "Admin ID:",
      admin._id
    );

    process.exit(0);

  } catch (error) {

    console.error(
      "Error creating admin:",
      error.message
    );

    process.exit(1);
  }
};

createAdmin();