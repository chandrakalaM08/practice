const { Router } = require("express");
const { NotesModel } = require("../models/notesModel");
const notesRouter = Router();

notesRouter.get("/", (req, res) => {
  res.status(200).send("Welcome to notes-routes home page!!!");
});

notesRouter.post("/add", async (req, res) => {
  try {
    const { title, content } = req.body;

    let newnote = await NotesModel.create({
      title,
      content,
      creator: req.userId,
      creator_name: req.username,
    });
    // await newnote.populate("creator");
    res.status(200).send({ msg: "Note added", note: newnote });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

notesRouter.get("/get", async (req, res) => {
  try {
    const userId = req.userId;
    let { title } = req.body;
    const query = { creator: userId }; // Filter by the logged-in user's ID
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    let notes = await NotesModel.find(query);
    res.status(200).send({ msg: "Post fetched", notes });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

notesRouter.patch("/update/:id", async (req, res) => {
  try {
    const userId = req.userId;

    let { id } = req.params;
    const note = await NotesModel.findById(id);
    const userIdNote = note.creator.toString();
    console.log("here", userId, userIdNote);
    let payload = req.body;

    if (userId !== userIdNote) {
      res.status(400).send({
        msg: "You are not authorised to update.",
      });
      return;
    }

    let updated = await NotesModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    res.status(200).send({
      msg: "Post updated",
      updated: updated,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

notesRouter.delete("/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const userId = req.userId;
    const note = await NotesModel.findById(id);
    const userIdNote = note.creator.toString();

    if (userId !== userIdNote) {
      res.status(400).send({
        msg: "You are not authorised to delete.",
      });
      return;
    }

    await NotesModel.findByIdAndDelete(id);
    res.status(200).send({ msg: "Post deleted" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = { notesRouter };
