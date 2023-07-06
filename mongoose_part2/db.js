const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://chandrakaladms:3rm5R2e46uBxXWuD@cluster0.toyzeqx.mongodb.net/livedatabase=true&w=majority"
);

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    city: { type: String, required: true },
    language: { type: String, required: true },
    maritalStatus: { type: Boolean, required: true },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { connection, userSchema, UserModel };
