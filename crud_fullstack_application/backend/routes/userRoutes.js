const { Router } = require("express");
const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { BlackListModel } = require("../models/blackListModel");
const userRouter = Router();
require("dotenv").config();
const secretKey = process.env.secretKey;
userRouter.get("/", (req, res) => {
  res.status(200).send("Welcome to user routes home page!!!");
});

userRouter.post("/create", async (req, res) => {
  try {
    const { email, password, username, age, city } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).send({
        msg: `The user with this email id already exists in database , proceed to login.`,
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      age,
      city,
    });

    await newUser.save();
    res.status(200).send({
      msg: `User has been created successfully`,
    });
  } catch (error) {
    res.status(500).send({
      msg: `Something went wrong inside create user , ${error.message}`,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).send({
        msg: `The user with this email id doesn't exists.`,
      });
      return;
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      res.status(400).send({
        msg: `Wrong credentials entered`,
      });
      return;
    }

    const token = jwt.sign(
      {
        username: user.username,
        userId: user._id,
      },
      secretKey,
      { expiresIn: "1h" }
    );

    res.status(200).send({
      msg: `User has been logged in successfully`,
      token: token,
    });
  } catch (error) {
    res.status(500).send({
      msg: `Something went wrong while log in , ${error.message}`,
    });
  }
});

userRouter.get("/logout", async (req, res) => {
  try {
    let token = req.headers.authorization?.split(" ")[1] || null;

    if (!token) {
      res.send({
        msg: "You are not logged in !!",
      });
    }

    let existingBlacklist = await BlackListModel.find({
      tokens: { $in: token },
    });

    if (!existingBlacklist[0]?.tokens.includes(token)) {
      await BlackListModel.updateOne(
        {},
        { $push: { tokens: token } },
        { upsert: true }
      );
    }

    let decoded = res.status(200).send({
      msg: `Logged out successfully`,
    });
  } catch (error) {
    res.status(500).send({
      msg: `Something went wrong while logout , ${error.message}`,
    });
  }
});

module.exports = { userRouter };
