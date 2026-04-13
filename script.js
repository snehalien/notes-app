// 🔐 LOGIN CHECK
let user = localStorage.getItem("loggedInUser");

if(!user) {
    window.location.href = "login.html";
}

// 🧠 LOAD USER-SPECIFIC NOTES
let notes = JSON.parse(localStorage.getItem(user + "_notes")) || [];

let selectedColor = "white";

// 🎨 SET COLOR
function setColor(color) {
    selectedColor = color;
}

// 🧠 DISPLAY NOTES
function displayNotes(data = notes) {
    let list = document.getElementById("noteList");
    list.innerHTML = "";

    data.forEach((note, index) => {
        let li = document.createElement("li");

        let title = note.text.split(" ").slice(0,2).join(" ");
        li.innerText = title;

        li.onclick = () => showNote(index);

        list.appendChild(li);
    });
}

// 📄 SHOW NOTE
function showNote(index) {
    let textarea = document.getElementById("noteInput");

    textarea.value = notes[index].text;
    textarea.style.background = notes[index].color;
}

// ➕ ADD NOTE
function addNote() {
    let input = document.getElementById("noteInput");
    let text = input.value;

    if(text === "") {
        alert("Write something!");
        return;
    }

    notes.push({
        text: text,
        color: selectedColor
    });

    // 🔥 SAVE PER USER
    localStorage.setItem(user + "_notes", JSON.stringify(notes));

    input.value = "";
    displayNotes();
}

// ✏️ EDIT NOTE (auto save when changed)
document.getElementById("noteInput").addEventListener("input", function() {
    let currentText = this.value;

    let index = notes.findIndex(n => n.text === currentText);

    if(index !== -1) {
        notes[index].text = currentText;
        localStorage.setItem(user + "_notes", JSON.stringify(notes));
    }
});

// 🔍 SEARCH
function searchNotes() {
    let value = document.getElementById("search").value.toLowerCase();

    let filtered = notes.filter(note =>
        note.text.toLowerCase().includes(value)
    );

    displayNotes(filtered);
}

// 🌙 DARK MODE
function toggleDark() {
    document.body.classList.toggle("dark");
}

// 🚪 LOGOUT
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

// 🚀 INITIAL LOAD
displayNotes();