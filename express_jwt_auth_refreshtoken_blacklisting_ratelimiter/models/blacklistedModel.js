const mongoose = require("mongoose");

const blacklistedTokenSchema = new mongoose.Schema({
  tokens: [String],
});

const BlacklistedTokenModel = mongoose.model(
  "BlacklistedToken",
  blacklistedTokenSchema
);

module.exports = BlacklistedTokenModel;
