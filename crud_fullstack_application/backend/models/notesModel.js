const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
  creator_name: { type: String },
});

const NotesModel = mongoose.model("note", notesSchema);

module.exports = { NotesModel };
