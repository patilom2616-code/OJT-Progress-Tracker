let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask(){

let title=document.getElementById("title").value.trim();
let category=document.getElementById("category").value.trim();
let date=document.getElementById("date").value;
let status=document.getElementById("status").value;
let notes=document.getElementById("notes").value.trim();

if(title===""){
alert("Please enter task title");
return;
}

tasks.push({
title,
category,
date,
status,
notes
});

saveTasks();
displayTasks();

document.getElementById("title").value="";
document.getElementById("category").value="";
document.getElementById("date").value="";
document.getElementById("notes").value="";
}

function displayTasks(){

let taskList=document.getElementById("taskList");

taskList.innerHTML="";

let completed=0;

tasks.forEach((task,index)=>{

if(task.status==="Completed"){
completed++;
}

taskList.innerHTML += `
<div class="task">
<h3>${task.title}</h3>

<p><b>Category:</b> ${task.category}</p>
<p><b>Date:</b> ${task.date}</p>
<p><b>Status:</b> ${task.status}</p>
<p><b>Notes:</b> ${task.notes}</p>

<div class="actions">

<button class="complete"
onclick="completeTask(${index})">
Complete
</button>

<button class="edit"
onclick="editTask(${index})">
Edit
</button>

<button class="delete"
onclick="deleteTask(${index})">
Delete
</button>

</div>
</div>
`;
});

document.getElementById("total").innerText=tasks.length;
document.getElementById("completed").innerText=completed;
document.getElementById("pending").innerText=tasks.length-completed;
searchTask();
}

function completeTask(index){
tasks[index].status="Completed";
saveTasks();
displayTasks();
}

function deleteTask(index){
tasks.splice(index,1);
saveTasks();
displayTasks();
}

function editTask(index){

let updatedTitle=prompt(
"Edit Task",
tasks[index].title
);

if(updatedTitle){
tasks[index].title=updatedTitle;
saveTasks();
displayTasks();
}
}

function searchTask(){
    let search = (document.getElementById("search")?.value || "").toLowerCase();
    let cards = document.querySelectorAll(".task");
    let visible = 0;

    cards.forEach(card => {
        let isMatch = card.innerText.toLowerCase().includes(search);
        card.style.display = isMatch ? "grid" : "none";
        if (isMatch) visible++;
    });

    let noResults = document.getElementById("noResults");
    if (search.trim() === "") {
        noResults.classList.add("hidden");
    } else {
        noResults.classList.toggle("hidden", visible !== 0);
    }
}

function saveTasks(){
localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);
}