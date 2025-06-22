const express = require("express");
const app = express();

app.use(express.json());

let users = [
    {id: 1, name: "yang"},
    {id: 2, name: "zuko"}
];

// for getting users info
app.get("/users", (req, res) => {
    res.json(users);
})

//for adding a new user
app.post("/users", (req, res) => {
    let newUser = {id: users.length+1, name: req.body.name};
    users.push(newUser);
    res.status(201).json({
        message: `User ${newUser.name} added successfully`, 
        user: newUser
    });
});

//for updating a user
app.put("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id)
    let user = users.find(u => u.id === userId);
    if(!user) return res.status(404).send("User not found");

    user.name = req.body.name;
    res.json({
        message:`User ${userId} updated Successfully`,
        user
    });
})

//for deleting a user
app.delete("/users/:id", (req, res) =>{
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id != userId);
    res.send("User deleted successfully");
})

// for handling random req
app.use((req, res) => {
    res.status(404).send("404 Not found");
})

// start the server
app.listen(3000, () => {
    console.log("server is live on port 3000");
})