const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
require("dotenv").config();
const userRouter = express.Router();
const secretKey = process.env.secretKey;
const secretKeyRefreshToken = process.env.secretKeyRefreshToken;
const BlacklistedTokenModel = require("../models/blacklistedModel");
var jwt = require("jsonwebtoken");

const apiRateLimiter = require("../middleware/rateLimiter.middleware");

userRouter.get("/", apiRateLimiter, (request, response) => {
  response.send("Welcome to the user - homepage");
});
// Signup route
userRouter.post("/signup", async (request, response) => {
  try {
    const { username, password } = request.body;
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(409).send({ message: "Username already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ username, password: hashedPassword });
    await user.save();
    response.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log("Error creating user:", error);
    response.status(500).send({ message: "Internal server error" });
  }
});

// Login route to generate a token
userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    console.log(user);
    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    /// Generating token
    const token = jwt.sign({ course: "backend" }, secretKey, {
      expiresIn: "1h",
    });

    // Generate a new refresh token with 7-day expiry
    const refreshToken = jwt.sign({ username }, secretKeyRefreshToken, {
      expiresIn: "7d",
    });

    // Store the refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();
    // Set the refresh token as an HTTP-only cookie
    res.cookie("token", token);
    res.cookie("refreshToken", refreshToken);
    res.send({ token, refreshToken });
  } catch (error) {
    console.log("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.get("/refreshtoken", (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    console.log("refreshToken", refreshToken);
    if (!refreshToken) {
      res.send("Login Again to have a token and refreshToken!!");
    }

    const decoded = jwt.verify(refreshToken, secretKeyRefreshToken);
    if (decoded) {
      const token = jwt.sign({ course: "backend" }, secretKey, {
        expiresIn: "1h",
      });
      res.send({ token });
    } else {
      res.send("Invalid Token!!!");
    }
  } catch (error) {
    res.send({ error: error.message });
  }
});

// Logout functionality
userRouter.post("/logout", async (req, res) => {
  try {
    const { token, refreshToken } = req.cookies;
    console.log("inside logout", { token, refreshToken });

    if (!token || !refreshToken) {
      res.send({ msg: "Login in first , you are not logged in!" });
    } else {
      // Blacklist the refresh token and token
      await BlacklistedTokenModel.updateOne(
        {},
        { $push: { tokens: { $each: [token, refreshToken] } } },
        { upsert: true }
      );

      // Clear the token and refreshToken cookies
      res.clearCookie("token");
      res.clearCookie("refreshToken");
      res.send({ message: "Logout successful" });
    }
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = userRouter;
