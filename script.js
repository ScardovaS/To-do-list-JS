const taskInput = document.getElementById("taskInput");
const addTaskbt = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") return;

  const li = document.createElement("li");
  li.textContent = text;

  taskList.appendChild(li);
  taskInput.value = "";
}

addTaskbt.addEventListener("click", addTask);
