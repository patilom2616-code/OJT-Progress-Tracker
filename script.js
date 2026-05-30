let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask(){

let title=document.getElementById("title").value;
let category=document.getElementById("category").value;
let date=document.getElementById("date").value;
let status=document.getElementById("status").value;
let notes=document.getElementById("notes").value;

if(title===""){
alert("Enter Task Title");
return;
}

tasks.push({
title,
category,
date,
status,
notes
});

saveData();
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

taskList.innerHTML+=`
<div class="task ${task.status==='Completed'?'completed':'pending'}">
<h3>${task.title}</h3>

<p><b>Category:</b> ${task.category}</p>
<p><b>Date:</b> ${task.date}</p>
<p><b>Status:</b> ${task.status}</p>
<p><b>Notes:</b> ${task.notes}</p>

<div class="actions">
<button onclick="completeTask(${index})">Complete</button>

<button onclick="editTask(${index})">Edit</button>

<button onclick="deleteTask(${index})">Delete</button>
</div>
</div>
`;
});

document.getElementById("total").innerText=tasks.length;
document.getElementById("completed").innerText=completed;
document.getElementById("pending").innerText=tasks.length-completed;
searchTask();
}

function deleteTask(index){
tasks.splice(index,1);
saveData();
displayTasks();
}

function completeTask(index){
tasks[index].status="Completed";
saveData();
displayTasks();
}

function editTask(index){

let newTitle=prompt("Edit Task",tasks[index].title);

if(newTitle){
tasks[index].title=newTitle;
saveData();
displayTasks();
}
}

function searchTask(){

let search=document.getElementById("search").value.toLowerCase();

let cards=document.querySelectorAll(".task");

let matchCount=0;

cards.forEach(card=>{
    let visible = card.innerText.toLowerCase().includes(search);
    card.hidden = !visible;
    if(visible) matchCount++;
});

let noResults = document.getElementById("noResults");
if(noResults){
    noResults.style.display = matchCount === 0 && cards.length > 0 ? "block" : "none";
}
}

function saveData(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}