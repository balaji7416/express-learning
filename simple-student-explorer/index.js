const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.static("public")) // for serving static files
app.use(express.json())           // for using res.json()
app.use(express.urlencoded({extended: true})) // for handling form submission i.e., for req.body

let students = require("./students.json");

// fetch students on the basis of course if provided
app.get("/students", (req, res) => {
    let {course} = req.query;
    let FilteredList;
    if(course)
         FilteredList = students.filter((s) => s.course.toLocaleLowerCase() === course.toLocaleLowerCase());

    res.json(FilteredList);
});

// fetch student by id
app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let student = students.find(s => s.id === id);

    if(!student) return res.status(404).send("student not found");
    res.json(student);
});

//add a new student
app.post("/students", (req, res) => {
    const id = students.length +1;
    const {name, course} = req.body;
    if(!course || !name){
        res.status(400).send("name and course required");
    }
    const NewStudent = {
      "id": id,
      "name": name,
      "course": course
    };

    students.push(NewStudent);
    console.log("student data added",NewStudent);
    res.json(NewStudent);
})

//serve feedback html form
app.get("/feedback", (req, res) => {
    res.sendFile(path.join(__dirname,"public","feedback.html"));
});

//form data handling logic
app.post("/feedback", (req, res) => {
    let {name, message} = req.body;
    let data = `Name: ${name}\nMessage: ${message}\n\n`;
    
    fs.appendFile(path.join(__dirname,"feedback.txt"),data, (err) => {
        if(err){
            console.log("feedback not saved");
            return res.status(500).send("feedback file not saved");
        }
        res.send("Feedback recieved! 🚀");
    })
})

// start the server 
app.listen(port, () => console.log(`Server is running on http://localhost:${port}/feedback`));