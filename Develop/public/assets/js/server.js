const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/index.html"));
});

// Returns the notes.html file using /notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// All other routes returns the index.html file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// API routes

app.get("/api/notes", (err, res) => {
    try {
        notesData = fs.readFileSync("Develop/db/db.json", "utf8");
        notesData = JSON.parse(notesData);

    } catch (err) {
        console.log("\n error (in app.get.catch):");
        console.log(err);
    }
    res.json(notesData);
});

app.post("/api/notes", (req, res) => {
    try {
        notesData = fs.readFileSync("./Develop/db/db.json", "utf8");
        console.log(notesData);
        notesData = JSON.parse(notesData);
        req.body.id = notesData.length;
        notesData.push(req.body); 
        notesData = JSON.stringify(notesData);
        fs.writeFile("./Develop/db/db.json", notesData, "utf8", (err) => {
        if (err) throw err;
        });
        res.json(JSON.parse(notesData));

    } catch (err) {
        throw err;
        console.error(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
});