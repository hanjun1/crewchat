const User = require("../models/user");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 6;

async function create(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!(await bcrypt.compare(req.body.password, user.password)))
      throw new Error();
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
    res.json(token);
  } catch (err) {
    res.status(400).json("Bad Credentials");
  }
}

async function getOne(req, res) {
  try {
    const user = await User.findById(req.user._id);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function edit(req, res) {
  try {
    console.log(req.body);
    const user = await User.findById(req.body.userId);
    user.name = req.body.name;
    await user.save();
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

module.exports = {
  create,
  login,
  getOne,
  edit,
};
