const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

app.use((req, res) => {
    res.status(404).send("File not found");
})

app.listen(3000, () => {
    console.log("server is running on port 3000");
})