const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all notes using: GET "/api/auth/fetchallnotes". Login required
router.get(
  "/fetchallnotes",fetchuser,async (req, res) => {
    try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
}
);
// ROUTE 2: Add e new Note using: POST "/api/auth/addnotes". Login required
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
    const { title, description, tag } = req.body;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Notes({
      title,description,tag,user: req.user.id,
    });
    const saveNote = await note.save();

    res.json(saveNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
}
);

// ROUTE 3: Update an existing Note using: Put "/api/auth/updatenote". Login required
router.put(
  "/updatenote/:id",fetchuser,async (req, res) => {
   const {title, description, tag} = req.body;
   //Create a newnote object
   const newNote = {};
   if(title){newNote.title = title}
   if(description){newNote.description = description}
   if(tag){newNote.tag = tag}

   //find the note to be updated and update it
  let note = await Notes.findById(req.params.id)
  if(!note){ return res.status(404).send("not found")}

  if(note.user.toString() !== req.user.id){
    return res.status(401).send("not allowed")
  }

  note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote},{ new:true})

  res.json({note})
  })


module.exports = router;
