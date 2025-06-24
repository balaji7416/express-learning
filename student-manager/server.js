const express = require("express");
const app = express();

const students = [
  { id: 1, name: "Luffy", age: 19, course: "Pirate Studies" },
  { id: 2, name: "Naruto", age: 17, course: "Ninja Arts" },
    { id: 3, name: "Goku", age: 18, course: "Saiyan Training" },
    { id: 4, name: "Saitama", age: 25, course: "Hero Studies" },
    { id: 5, name: "Edward", age: 16, course: "Alchemy" },
    { id: 6, name: "Spike", age: 27, course: "Bounty Hunting" },
    { id: 7, name: "Ash", age: 10, course: "Pokemon Trainer" },
    { id: 8, name: "Light", age: 17, course: "Justice Studies" },
];

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index", {students});
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

