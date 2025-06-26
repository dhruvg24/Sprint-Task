import dotenv from "dotenv";
dotenv.config(); // required if this file is standalone and uses process.env
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be atleast 6 characters long." });
  }
  try {
    const doesUserExist = await User.findOne({ email });
    if (doesUserExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPswd = await bcrypt.hash(password, salt);

    const newUser = await User.create({ name, email, password: hashedPswd });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "20m",
    });
    // for 20 minutes

    // console.log(`Token Generated at:- ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  //first finding email and pswd from body
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const isPswdMatched = await bcrypt.compare(password, user.password);

    if (!isPswdMatched) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "20m",
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // new:true ensures returning the modified document instead of older one
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "User is deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
