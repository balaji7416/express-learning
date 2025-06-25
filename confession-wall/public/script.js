const API_URL = `http://localhost:3000`
const form = document.querySelector("form");
const confessionList = document.querySelector(".confessions-list");

const loadConfessions = async () => {
    confessionList.innerHTML = "";
    let res = await fetch(`${API_URL}/confessions`);
    let data = await res.json();

    data.forEach((c) => {
        let name = c.name;
        let confession = c.confession;
        let element = document.createElement("div");
        element.classList.add("card");
        element.innerHTML = `
        <strong> confession </strong><br>
        <span style = "color: blue;">${confession}</span> <br>
        - ${name}
        `
        confessionList.appendChild(element);
    })
}

form.addEventListener("submit",  async (e) => {
    e.preventDefault();
    let name = document.querySelector("#name").value;
    let confession = document.querySelector("#confession").value;
    let res = await fetch(`${API_URL}/confess`, {
        method: "POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify({name, confession})
    });
    let data =  await res.json();
    alert(data.message);
    form.reset();
    loadConfessions()
});

window.addEventListener("keydown",(e) => {
    if(e.key === "Enter" && !e.key.shiftKey){
        e.preventDefault();
        form.requestSubmit();
    }
});

loadConfessions();




