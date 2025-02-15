const jwt = require("jsonwebtoken");
const RecycledCenter = require("../models/RecyclingCenterModel");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add email and password in the request body",
    });
  }

  let foundUser = await RecycledCenter.findOne({ email: req.body.email });
  if (foundUser) {
    const isMatch = await foundUser.comparePassword(password);

    if (isMatch) {
      const token = jwt.sign(
        { id: foundUser._id, name: foundUser.name },
        process.env.JWT_SECRET,
        {
          expiresIn: "15d",
        }
      );

      return res.status(200).json({ msg: "user logged in", token,name:foundUser.name ,id:foundUser._id});
    } else {
      return res.status(200).json({ msg: "Bad password" });
    }
  } else {
    return res.status(200).json({ msg: "Bad credentials" });
  }
};

const getAllUsers = async (req, res) => {
  let users = await RecycledCenter.find({});

  return res.status(200).json({ users });
};

const register = async (req, res) => {
  let foundUser = await RecycledCenter.findOne({ email: req.body.email });
  if (foundUser === null) {
    let { name, email, password } = req.body;
    if (name.length && email.length && password.length) {
      const person = new RecycledCenter({
        name: name,
        email: email,
        password: password,
      });
      await person.save();
      return res.status(201).json({ person });
    }else{
        return res.status(400).json({msg: "Please add all values in the request body"});
    }
  } else {
    return res.status(400).json({ msg: "Email already in use" });
  }
};

module.exports = {
  login,
  register,
  getAllUsers,
};