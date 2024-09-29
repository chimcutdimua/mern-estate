const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");
const saltRounds = 10;

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }
    const hashPassword = await bcryptjs.hash(password, saltRounds);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (error) {
    console.error("Failed to signup:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signup,
};
