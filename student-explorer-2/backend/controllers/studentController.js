let students = require("../data/students");

// get all users (with optional filtering by course)
function getAllUsers(req, res) {
    let {course} = req.query;
    let result = students;

    if(course)
        result = result.filter(s => s.course.toLocaleLowerCase() === course.toLocaleLowerCase());

    res.json(result);
}

//get student by id
function getUserById(req, res){
    let id = parseInt(req.params.id);
    let user = students.find(s => s.id === id);
    
    if(!user) 
        return res.status(404).send("entry not found");

    res.json(user);
}

//add a new user
function addUser(req, res){
    let id = students.length +1
    let {name, age, course} = req.body;

    if(!name || !age || !course)
        return res.status(400).send("all fields are required");

    const user = {
        id: id,
        name: name,
        age: age,
        course: course

    };

    students.push(user);
    res.status(201).json({message: "user added successFully", user: user});
}

//update user by id
function updateUserbyId(req, res){
    let id = req.params.id;
    let user = students.find(s => s.id === parseInt(id));

    if(!user) return res.status(404).send("user not found");
    let initialName = user.name;
    let initialAge = user.age;
    let initialcourse = user.course;

    const {name, age, course} = req.body;
    user.id = parseInt(id);
    user.name = name || initialName;
    user.age = age || initialAge;
    user.course = course || initialcourse;

    res.json({message:"user updated successfully", user:user});
}


//delete user by id
function deleteUserbyId(req, res){
    let id = parseInt(req.params.id);
    let userIndex = students.findIndex(s => s.id === id);

    if(userIndex === -1)
        res.status(404).send("student not found");

    let removed = students.splice(userIndex,1);
    res.json({message: "user removed successfully", user: removed});
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUserbyId,
    deleteUserbyId
}