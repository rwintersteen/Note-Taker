const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();


const PORT = process.env.PORT || 3005;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// Returns the notes.html file using /notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

// All other routes returns the index.html file
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});
7

// GET request from db.json
app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "./Develop/db/db.json", 'utf8', function (error, data) {
        if (err) throw err;
        res.json(JSON.parse(data))
    })
});

// POST to db.json
app.post("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "./Develop/db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        const db = JSON.parse(data);
        const newDB = [];

        db.push(req.body);

        for (let i = 0; i < db.length; i++) {
            const newNote = {
                title: db[i].title,
                text: db[i].text,
                id: i
            };
            newDB.push(newNote);
        }

        fs.writeFile(path.join(__dirname, "./Develop/db/db.json"), JSON.stringify(newDB, null, 2), (err) => {
            if (err) throw err;
            res.json(req.body);
        });
    });
});

// DELETE from db.json
app.delete("/api/notes/:id", function (req, res) {
    const noteId = JSON.parse(req.params.id)
    console.log(noteId)
    fs.readFile(__dirname + "./Develop/db/db.json", 'utf8', function (error, notes) {
        if (err) throw err;
        notes = JSON.parse(notes)
        notes = notes.filter(val => val.id !== noteId)
    
        fs.writeFile(__dirname + "./Develop/db/db.json", JSON.stringify(notes), function (error, data) {
        if (err) throw err;
        res.json(notes)
        })
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
});