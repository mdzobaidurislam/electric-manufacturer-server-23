const User = require("../models/UserModel");
const generateToken = require("../utlis/generateToken");

//getAllUser
const getAllUser = async (req, res) => {
  const result = await User.find({});
  res.status(200).json(result);
};

//  make admin
const makeAdmin = async (req, res) => {
  const filter = { email: req.body.email };
  const result = await User.findOneAndUpdate(
    filter,
    {
      isAdmin: true,
      role: "admin",
    },
    {
      new: true,
      upsert: true,
    }
  );
  if (result) {
    res.status(200).json({ success: true, msg: "Admin created success!" });
  } else {
    res.status(401).res.json({ success: false, msg: "Admin not created!" });
  }
};

//  make User
const makeUser = async (req, res) => {
  const filter = { email: req.body.email };
  const result = await User.findOneAndUpdate(
    filter,
    {
      isAdmin: false,
      role: "user",
    },
    {
      new: true,
      upsert: true,
    }
  );
  if (result) {
    res.status(200).json({ success: true, msg: "User created success!" });
  } else {
    res.status(401).res.json({ success: false, msg: "User not created!" });
  }
};

// check administrator
const getAdmin = async (req, res) => {
  const email = req.params.email;
  const result = await User.findOne({ email: email });
  if (result) {
    const isAdmin = result.role === "admin";
    res.json({ success: true, admin: isAdmin });
  } else {
    res.json({ success: false, result });
  }
};

// check user
const getUser = async (req, res) => {
  const email = req.params.email;
  console.log(email);
  const result = await User.findOne({ email: email });
  if (result) {
    const isUser = result.role === "user";
    res.json({ success: true, user: isUser });
  } else {
    res.json({ success: false, result });
  }
};

//  update profile
const userUpdateProfile = async (req, res) => {
  const userData = req.body;
  const filter = { email: req.params.email };
  const result = await User.findOneAndUpdate(filter, userData, {
    new: true,
    upsert: true,
  });
  if (result) {
    res.status(200).json({ success: true, msg: "Profile updated success!" });
  } else {
    res.status(401).res.json({ msg: "Internal problem!" });
  }
};

//  userRegistration
const userRegistration = async (req, res) => {
  const userData = req.body;
  const filter = { email: userData.email };
  const result = await User.findOneAndUpdate(filter, userData, {
    new: true,
    upsert: true,
  });
  if (result) {
    const token = generateToken(userData.email);
    res.status(200).json({ result, token });
  } else {
    res.status(401).res.json({ msg: "Internal  problem!" });
  }
};
module.exports = {
  userRegistration,
  getAdmin,
  userUpdateProfile,
  getAllUser,
  makeAdmin,
  makeUser,
  getUser,
};
