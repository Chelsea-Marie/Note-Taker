const express = require("express");
const path = require("path");
const fs = require("fs");

// require the package for unique id

const app = express();

// middlewares
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// routes

app.get("/notes", (req, res) => {
    // res.send("hi!")
    res.sendFile(path.join(__dirname, "./public/notes.html"))
//  C:\Users\chels\bootcamp\modules\note-taker\Note-Taker\Develop\public\notes.html
})

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"))
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.post("/api/notes", (req, res) => {
    // console.log(req.body);

    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        // console.log(data)
        const notes = JSON.parse(data)
        // console.log(notes)

        notes.push({
            // id: asdasdasda,
            title: req.body.title,
            text: req.body.text
        })

        // console.log(notes);

        fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), (err, data) => {
            console.log("Note has been added!")

            res.json({message: "Note has been added!"})
        })
    })
})



app.listen(3001)