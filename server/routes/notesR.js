const express = require("express");
const { createNotes,getNotes, getNote, updateNote, deleteNote } = require("../controllers/notesC");
const route= express.Router()

route.post("/new",createNotes)
route.get("/notes",getNotes)
route.get("/noteid/:noteid",getNote)
route.put("/noteid/:noteid",updateNote)
route.delete("/noteid/:noteid",deleteNote)
module.exports=route;