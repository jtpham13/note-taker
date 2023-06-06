const express = require('express');
const router = express.Router();
const fs = require('fs');

// GET /api/notes - Retrieve all notes
router.get('/', (req, res) => {
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// POST /api/notes - Save a new note
router.post('/', (req, res) => {
  const { title, text } = req.body;
  // Generate a unique ID for the note (you can use a library like uuid to generate IDs)
  const id = generateUniqueId();

  // Create a new note object
  const newNote = {
    id,
    title,
    text,
  };

  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(newNote);
    });
  });
});

// DELETE /api/notes/:id - Delete a note by ID
router.delete('/:id', (req, res) => {
  const noteId = req.params.id;

  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const notes = JSON.parse(data);
    const updatedNotes = notes.filter((note) => note.id !== noteId);

    fs.writeFile('db/db.json', JSON.stringify(updatedNotes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.sendStatus(204);
    });
  });
});

module.exports = router;
