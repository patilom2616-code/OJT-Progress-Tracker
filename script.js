// script.js

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask(){

  let title = document.getElementById("taskInput").value;
  let category = document.getElementById("categoryInput").value;
  let date = document.getElementById("dateInput").value;
  let status = document.getElementById("statusInput").value;

  if(title === ""){
    alert("Please enter task title");
    return;
  }

  let task = {
    title,
    category,
    date,
    status
  };

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  displayTasks();

  document.getElementById("taskInput").value = "";
  document.getElementById("categoryInput").value = "";
  document.getElementById("dateInput").value = "";
}

function displayTasks(){

  let taskList = document.getElementById("taskList");

  taskList.innerHTML = "";

  let completed = 0;
  let pending = 0;

  tasks.forEach((task, index) => {

    if(task.status === "Completed"){
      completed++;
    } else {
      pending++;
    }

    taskList.innerHTML += `
      <div class="task">
        <h3>${task.title}</h3>
        <p><b>Category:</b> ${task.category}</p>
        <p><b>Date:</b> ${task.date}</p>
        <p><b>Status:</b> ${task.status}</p>

        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = tasks.length;
  document.getElementById("completed").innerText = completed;
  document.getElementById("pending").innerText = pending;
}

function deleteTask(index){

  tasks.splice(index, 1);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  displayTasks();
}