

// // // Event listener for the add item button
// // document.getElementById("add-item-btn").addEventListener("click", addItem);
// function addItem() {
//     // Get input values
//     var itemName = document.getElementById("item-name").value;
//     var itemDate = document.getElementById("item-date").value;
//     var priority = document.getElementById("priority").value;

//     // Create todo item object
//     var todoItem = {
//         name: itemName,
//         date: itemDate,
//         priority: priority,
//         completed: false
//     };

//     // Add item to localStorage
//     var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
//     todoList.push(todoItem);
//     localStorage.setItem("todoList", JSON.stringify(todoList));

//     // Clear input fields
//     document.getElementById("item-name").value = "";
//     document.getElementById("item-date").value = "";
//     document.getElementById("priority").value = "high";

//     // Display the task in the appropriate section
//     displayTask(todoItem);
// }

// // Function to display a task in the appropriate section
// function displayTask(task) {
//     var today = new Date().toISOString().split('T')[0];
//     var itemDate = new Date(task.date).toISOString().split('T')[0];
//     var taskText = task.name + " - Deadline: " + task.date + " - Priority: " + task.priority;

//     var sectionId = "future-tasks-section";
//     if (itemDate === today) {
//         sectionId = "today-tasks-section";
//     } else if (new Date(itemDate) < new Date(today)) {
//         sectionId = "completed-tasks-section";
//     }

//     displayInSection(taskText, sectionId);
// }

// // Function to display a task in the specified section
// function displayInSection(taskText, sectionId) {
//     var section = document.getElementById(sectionId);
//     var taskDiv = document.createElement("div");
//     taskDiv.textContent = taskText;

//     // Add delete button
//     var deleteBtn = document.createElement("button");
//     deleteBtn.textContent = "Delete";
//     deleteBtn.onclick = function() {
//         deleteTask(taskText, sectionId);
//     };
//     taskDiv.appendChild(deleteBtn);

//     // Add tick button
//     if (sectionId !== "completed-tasks-section") {
//         var tickBtn = document.createElement("button");
//         tickBtn.textContent = "Tick";
//         tickBtn.className = "tick-btn";
//         tickBtn.onclick = function() {
//             toggleCompleted(taskText, sectionId);
//         };
//         taskDiv.appendChild(tickBtn);
//     }

//     section.appendChild(taskDiv);
// }

// // Function to delete a task
// // Function to delete a task
// function deleteTask(taskText, sectionId) {
//     var section = document.getElementById(sectionId);
//     var taskDivs = section.getElementsByTagName("div");
//     for (var i = 0; i < taskDivs.length; i++) {
//         if (taskDivs[i].textContent.includes(taskText)) {
//             section.removeChild(taskDivs[i]);
//             break;
//         }
//     }

//     // Remove task from localStorage
//     var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
//     var index = todoList.findIndex(task => task.name === taskText.split(" - ")[0]);
//     if (index !== -1) {
//         todoList.splice(index, 1);
//         localStorage.setItem("todoList", JSON.stringify(todoList));
//     }
// }

// // Function to toggle task completion status
// function toggleCompleted(taskText, sectionId) {
//     var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    
//     for (var i = 0; i < todoList.length; i++) {
//         if (todoList[i].name === taskText) {
//             todoList[i].completed = !todoList[i].completed;
//             break;
//         }
//     }

//     localStorage.setItem("todoList", JSON.stringify(todoList));
//     renderTasks(sectionId);
// }
// // Event delegation for the tick button click
// document.addEventListener("click", function(event) {
//     if (event.target && event.target.classList.contains("tick-btn")) {
//         var taskText = event.target.parentElement.textContent.trim();
//         var sectionId = event.target.closest(".task-section").id;
//         toggleCompleted(taskText, sectionId);
//     }
// });


// // Event listener for the add item button
// document.getElementById("add-item-btn").addEventListener("click", addItem);

// // Render tasks on page load
// document.addEventListener("DOMContentLoaded", renderTasks);

// // Function to render tasks from localStorage
// function renderTasks() {
//     var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
//     todoList.forEach(task => {
//         displayTask(task);
//     });
// }

function addItem() {
    // Get input values
    var itemName = document.getElementById("item-name").value;
    var itemDate = document.getElementById("item-date").value;
    var priority = document.getElementById("priority").value;

    // Create todo item object
    var todoItem = {
        name: itemName,
        date: itemDate,
        priority: priority,
        completed: false
    };

    // Add item to localStorage
    var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    todoList.push(todoItem);
    localStorage.setItem("todoList", JSON.stringify(todoList));

    // Clear input fields
    document.getElementById("item-name").value = "";
    document.getElementById("item-date").value = "";
    document.getElementById("priority").value = "high";

    // Display the task in the appropriate section
    displayTask(todoItem);
}

// Function to display a task in the appropriate section
function displayTask(task) {
    var today = new Date().toISOString().split('T')[0];
    var itemDate = new Date(task.date).toISOString().split('T')[0];
    var taskText = task.name + " - Deadline: " + task.date + " - Priority: " + task.priority;

    var sectionId = "future-tasks-section";
    if (itemDate === today) {
        sectionId = "today-tasks-section";
    } else if (new Date(itemDate) < new Date(today)) {
        sectionId = "completed-tasks-section";
    }

    displayInSection(taskText, sectionId);
}

// Function to display a task in the specified section
function displayInSection(taskText, sectionId, completed) {
    var section = document.getElementById(sectionId);
    var taskDiv = document.createElement("div");
    taskDiv.textContent = taskText;

    // Add delete button
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function() {
        deleteTask(taskText, sectionId);
    };
    taskDiv.appendChild(deleteBtn);

    // Add tick button
    if (!completed && sectionId !== "completed-tasks-section") {
        var tickBtn = document.createElement("button");
        tickBtn.textContent = "Tick";
        tickBtn.className = "tick-btn"; // Set the class name
        tickBtn.onclick = function() {
            toggleCompleted(taskText, sectionId);
        };
        taskDiv.appendChild(tickBtn);
    }

    section.appendChild(taskDiv);
}


// Function to delete a task
function deleteTask(taskText, sectionId) {
    var section = document.getElementById(sectionId);
    var taskDivs = section.getElementsByTagName("div");
    for (var i = 0; i < taskDivs.length; i++) {
        if (taskDivs[i].textContent.includes(taskText)) {
            section.removeChild(taskDivs[i]);
            break;
        }
    }

    // Remove task from localStorage
    var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    var index = todoList.findIndex(task => task.name === taskText.split(" - ")[0]);
    if (index !== -1) {
        todoList.splice(index, 1);
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }
}

// Function to toggle task completion status
function toggleCompleted(taskText, sectionId) {
    var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    for (var i = 0; i < todoList.length; i++) {
        if (todoList[i].name === taskText) {
            todoList[i].completed = !todoList[i].completed;
            break;
        }
    }

    localStorage.setItem("todoList", JSON.stringify(todoList));
    renderTasks();
}
// Function to render tasks from localStorage
function renderTasks() {
    var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    var today = new Date().toISOString().split('T')[0];
    
    console.log("Task date:", task.date); 
    // Clear all task sections
    document.getElementById("today-tasks-section").innerHTML = "";
    document.getElementById("future-tasks-section").innerHTML = "";
    document.getElementById("completed-tasks-section").innerHTML = "";

    // Display tasks in appropriate sections
    todoList.forEach(task => {
        var itemDate = new Date(task.date).toISOString().split('T')[0];
        var taskText = task.name + " - Deadline: " + task.date + " - Priority: " + task.priority;
        var completed = task.completed;

        if (completed) {
            displayInSection(taskText, "completed-tasks-section", true);
        } else if (itemDate === today) {
            displayInSection(taskText, "today-tasks-section", false);
        } else {
            displayInSection(taskText, "future-tasks-section", false);
        }
    });
}


// Event delegation for the tick button click
document.addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("tick-btn")) {
        var taskText = event.target.parentElement.textContent.trim();
        var sectionId = event.target.closest(".task-section").id;
        toggleCompleted(taskText, sectionId);
    }
});

// Event listener for the add item button
document.getElementById("add-item-btn").addEventListener("click", addItem);

// Render tasks on page load
document.addEventListener("DOMContentLoaded", renderTasks);

// Function to render tasks from localStorage
function renderTasks() {
    var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    todoList.forEach(task => {
        displayTask(task);
    });
}
