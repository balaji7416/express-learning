const apiURL = `http://localhost:3000/students`;

let studentList = document.querySelector(".studentList");
let form = document.querySelector("form");
let filetrByCourse = document.querySelector("#filterByCourse");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let name = document.querySelector("#name").value;
    let age = document.querySelector("#age").value;
    let course = document.querySelector("#course").value;

   await fetch(apiURL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, age, course})
    });

    form.reset();
    fetchStudents();
});

filetrByCourse.addEventListener("input", () => {
    fetchStudents(filetrByCourse.value);
});

async function fetchStudents(course = ""){

    let url = course ? `${apiURL}?course=${course}`: apiURL;
    let res = await fetch(url);
    let students = await res.json();

    studentList.innerHTML = "";
    students.forEach(student=> {
        let data = document.createElement("div");
        data.className = "studentCard";
        data.innerHTML = `
        <div>
        Name: ${student.name} (age: ${student.age}) <br>
        ${student.course} </div>
        <div class = "buttons">
        <button onClick=updateStudent(${student.id}) class="deleteBtn" style="background-color: green">Edit</button>
        <button onClick=deleteStudent(${student.id}) class="deleteBtn">delete</button>
        </div>
        `;
        studentList.appendChild(data);
    });
}

async function deleteStudent(id){
    await fetch(`${apiURL}/${id}`, {method: "DELETE"});
    fetchStudents(filetrByCourse.value);
}

async function updateStudent(id){
    let name = prompt("enter name");
    let age = prompt("enter age");
    let course = prompt("enter course");

    // this is spread operator syntax to conditionally include properties
    const body = {
        ...(name && {name}),
        ...(age && {age}),
        ...(course && {course})
    }

    //we can also use beginner friendly syntax for above code
    /**
     const body = {};
     if(name) body.name = name;
     if(age) body.age = age;
     if(course) body.course = course;
     **/

    await fetch(`${apiURL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
    });

    fetchStudents(filetrByCourse.value);
}

fetchStudents();