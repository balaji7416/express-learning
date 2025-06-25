const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const confessions = [];

const sanitize = (str) => {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

app.post("/confess", (req, res) => {
    let {name, confession} = req.body;

    if(!confession || confession.trim().length < 3){
        res.status(400).json({message: "confession is too short"});
    }

    name = name ? sanitize(name.trim()) : "Anonymous";
    confession = sanitize(confession.trim());

    confessions.push({name, confession});
    res.json({message: "Thanks for your honesty, legend ✨"});
});

app.get("/confessions", (req, res) => {
    res.json(confessions);
});

app.listen(port, () => console.log(`😶 Confessions server running at http://localhost:${port}`));