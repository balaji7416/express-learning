const express = require("express");
const path = require("path");
const fs = require("fs");
const { time } = require("console");
const app = express();

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "form.html"));
});

app.post("/submit", (req, res) => {
    let name = req.body.userName;
    let pass = req.body.pass
    let timeStamp = new Date().toISOString();
    let filePath = path.join(__dirname,"form_data.txt");
    let dataToWrite = `Name: ${name}\npassword: ${pass}\nTime stamp: ${timeStamp}`;

    fs.appendFile(filePath,dataToWrite, (err) =>{
        if(err){
            res.status(500).send("Internal server Error");
        }
        else{
            res.send(`✅ Thanks, ${name}! Your data was saved.`);
        }
    });
})

app.use((req, res) => {
    res.status(404).send("404 NOt found");
});

app.listen(3000, () =>{
    console.log("🚀 Server running at http://localhost:3000");
});
