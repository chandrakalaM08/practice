const mongoose = require("mongoose");

const blackListSchema = new mongoose.Schema({
  tokens: [String],
});

const BlackListModel = mongoose.model("blackListedToken", blackListSchema);

module.exports = { BlackListModel };
