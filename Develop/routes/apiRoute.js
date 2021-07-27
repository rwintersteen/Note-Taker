const path = require('path')
const app = require('express').Router();
const fs = require('fs');

app.get("/api/notes", function(err, res) {
    try {
        notesData = fs.readFileSync("Develop/db/db.json", "utf8");
        notesData = JSON.parse(notesData);

    } catch (err) {
        console.log("\n error (in app.get.catch):");
        console.log(err);
    }
    res.json(notesData);
});

app.post("/api/notes", function(req, res) {
    try {
        notesData = fs.readFileSync("./Develop/db/db.json", "utf8");
        console.log(notesData);

        notesData = JSON.parse(notesData);
        req.body.id = notesData.length;
        notesData.push(req.body); 
        notesData = JSON.stringify(notesData);
        fs.writeFile("./Develop/db/db.json", notesData, "utf8", function(err) {
        if (err) throw err;
        });
        res.json(JSON.parse(notesData));

    } catch (err) {
        throw err;
        console.error(err);
    }
});

module.exports = router;