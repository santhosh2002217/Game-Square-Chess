const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");


const registerUser = async (body) => {

  const {
    name,
    email,
    phone,
    password,
  } = body;


  // Check existing user

  const existingUser =
    await userModel.findOne({ email });

  if (existingUser) {
    throw new Error(
      "User with this email already exists"
    );
  }


  // Hash password

  const hashedPassword =
    await bcrypt.hash(password, 10);


  // Create user

  const user = await userModel.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });


  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
};


const loginUser = async (body) => {

  const {
    email,
    password,
  } = body;


  // Find user

  const user =
    await userModel.findOne({ email });


  if (!user) {
    throw new Error(
      "Invalid email or password"
    );
  }


  // Compare password

  const isPasswordCorrect =
    await bcrypt.compare(
      password,
      user.password
    );


  if (!isPasswordCorrect) {
    throw new Error(
      "Invalid email or password"
    );
  }


  // Generate JWT

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );


  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
};


module.exports = {
  registerUser,
  loginUser,
};