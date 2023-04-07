const Notes = require("../models/notes");
const createNotes = async (req, res) => {
  let note = new Notes({ title: "new note " + Math.floor(Math.random() * 10) });
  await note.save();
  res.send({
    newNote: { noteId: note._id, noteTitle: note.title, modified: true },
  });
};
const getNotes = async (req, res) => {
  try {
    let notes = await Notes.find().sort({ updatedAt: -1 });
    notes = notes.map((item) => {
      console.log(
        new Date().getTime() - 120000 < new Date(item.updatedAt).getTime()
      );
      return {
        noteId: item._id,
        noteTitle: item.title,
        modified:
          new Date().getTime() - 120000 < new Date(item.updatedAt).getTime(),
      };
    });
    res.send({ notes });
  } catch (error) {
    res.send(error);
  }
};
const getNote = async (req, res) => {
  try {
    if (req.params.noteid) {
      let note = await Notes.findById(req.params.noteid);

      res.send({ note: { noteText: note.text, noteTitle: note.title } });
    } else {
      let note = await Notes.find();

      res.send({ note: { noteText: note[0].text, noteTitle: note[0].title } });
    }
  } catch (error) {
    res.send(error);
  }
};
const updateNote = async (req, res) => {
  try {
    await Notes.findByIdAndUpdate(req.params.noteid, {
      text: req.body.noteText,
      title: req.body.noteTitle,
    });
    res.send({
      updatedNote: { noteId:req.params.noteid, noteTitle: req.body.noteTitle },
    });
  } catch (error) {
    res.send(error);
  }
};
const deleteNote = async (req, res) => {
  try {
    await Notes.findByIdAndDelete(req.params.noteid);
    res.send(200)
  } catch (error) {
    res.send(error);
  }
};
module.exports = { createNotes, getNotes, getNote, updateNote,deleteNote };
