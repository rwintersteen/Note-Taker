const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
let allNotes = require('./db/db.json');

const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// All other routes returns the index.html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Returns the notes.html file using /notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// GET request from db.json
app.get("/api/notes", (req, res) => {
    res.json(JSON.parse(allNotes))
})

// POST to db.json
app.post("/api/notes", (req, res) => {
    const newNote = req.body 
    newNote.id= notes.length
    notes.push(newNote) 
    fs.writeFileSync("./db/db.json", JSON.stringify(notes)) 
    res.status(201).end()
    return res.json(notes)
});

// DELETE from db.json
app.delete("/api/notes/:id", function (req, res) {
    const id = req.params.id
    console.log(id)
    const filteredNotes = notes.filter((note) => note.id !== parseInt(id)) 
    console.log(filteredNotes)
    fs.writeFileSync("./db/db.json", JSON.stringify(filteredNotes)) 
    notes = filteredNotes
    return res.json({ok: true})
})

app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
});