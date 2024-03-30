// Function to add a new item
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
    try {
        // Try to parse the task date
        var parsedDate = new Date(task.date);

        // Check if the parsed date is valid
        if (!isNaN(parsedDate.getTime())) {
            itemDate = parsedDate.toISOString().split('T')[0];
        } else {
            throw new Error("Invalid date format");
        }
    } catch (error) {
        console.error("Error parsing date:", error.message);
        return; // Exit the function if date parsing fails
    }
    var taskText = task.name + " - Deadline: " + task.date + " - Priority: " + task.priority;

    var sectionId = "future-tasks-section";
    if (itemDate === today) {
        sectionId = "today-tasks-section";
    } else if (new Date(itemDate) < new Date(today)) {
        sectionId = "completed-tasks-section";
    }

    displayInSection(taskText, sectionId, task.completed);
}

// Function to display a task in the specified section
function displayInSection(taskText, sectionId, completed) {
    var section = document.getElementById(sectionId);
    
    // Create a container for the task
    var taskContainer = document.createElement("div");
    taskContainer.className = "task-container";
    
    // Apply styling properties to the task container
    taskContainer.style.backgroundColor = "black";
    taskContainer.style.color = "white";
    taskContainer.style.padding = "15px";
    taskContainer.style.border = "2px solid #000";
    taskContainer.style.borderRadius = "5px";
    taskContainer.style.marginBottom = "20px";
    taskContainer.style.display = "flex";
    taskContainer.style.flexDirection = "column";
    taskContainer.style.gap = "10px";

    // Create a div element for the task text
    var taskDiv = document.createElement("div");
    taskDiv.textContent = taskText;
// Add data-task attribute to identify the task
taskDiv.setAttribute("data-task", taskText);
    // Apply styling properties to the task text
    taskDiv.style.fontWeight = "bold";
    taskDiv.style.fontSize = "16px";

    // Add delete button
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.padding = "5px 10px";
    deleteBtn.style.backgroundColor = "#dc3545";
    deleteBtn.style.color = "white";
    deleteBtn.style.border = "none";
    deleteBtn.style.borderRadius = "5px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.onclick = function() {
        deleteTask(taskText, sectionId);
    };

    // Add checkbox
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.addEventListener("change", function() {
        toggleCompleted(taskText, sectionId, checkbox.checked);
    });

    // Create a div to contain the delete button and checkbox
    var controlsDiv = document.createElement("div");
    controlsDiv.style.display = "flex";
    controlsDiv.style.gap = "10px";
    controlsDiv.appendChild(deleteBtn);
    controlsDiv.appendChild(checkbox);

    // Append task text and controls to the task container
    taskContainer.appendChild(taskDiv);
    taskContainer.appendChild(controlsDiv);

    // Append task container to the section
    section.appendChild(taskContainer);
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
// Function to toggle task completion status
function toggleCompleted(taskText, sectionId, completed) {
    var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    for (var i = 0; i < todoList.length; i++) {
        if (todoList[i].name === taskText) {
            todoList[i].completed = completed;
            break;
        }
    }

    localStorage.setItem("todoList", JSON.stringify(todoList));
    renderTasks();

    if (completed) {
        // Move the task container to the Completed Tasks section
        var taskContainer = document.querySelector(".task-container[data-task='" + taskText + "']");
        if (taskContainer) {
            document.getElementById("completed-tasks-section").appendChild(taskContainer);
        }
    }
}


// Function to render tasks from localStorage
function renderTasks() {
    var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    var today = new Date().toISOString().split('T')[0];

    // Clear all task sections
    document.getElementById("today-tasks-section").innerHTML = "";
    document.getElementById("future-tasks-section").innerHTML = "";
    document.getElementById("completed-tasks-section").innerHTML = "";

    // Display tasks in appropriate sections
    todoList.forEach(task => {
        var itemDate = new Date(task.date).toISOString().split('T')[0];
        // try {
        //     // Try to parse the task date
        //     var parsedDate = new Date(task.date);
    
        //     // Check if the parsed date is valid
        //     if (!isNaN(parsedDate.getTime())) {
        //         itemDate = parsedDate.toISOString().split('T')[0];
        //     } else {
        //         throw new Error("Invalid date format");
        //     }
        // } catch (error) {
        //     console.error("Error parsing date:", error.message);
        //     return; // Exit the function if date parsing fails
        // }
        var taskText = task.name + " - Deadline:                    " + task.date + " - Priority: " + task.priority;

        // Create a container for the task
        var taskContainer = document.createElement("div");
        taskContainer.className = "task-container";

        // Apply styling properties to the task container
        taskContainer.style.backgroundColor = "black";
        taskContainer.style.color = "white";
        taskContainer.style.padding = "15px";
        taskContainer.style.border = "2px solid #000";
        taskContainer.style.borderRadius = "5px";
        taskContainer.style.marginBottom = "20px";
        taskContainer.style.display = "flex";
        taskContainer.style.flexDirection = "column";
        taskContainer.style.gap = "10px";

        // Create a div element for the task text
        var taskDiv = document.createElement("div");
        taskDiv.textContent = taskText;

        // Apply styling properties to the task text
        taskDiv.style.fontWeight = "bold";
        taskDiv.style.fontSize = "16px";

        // Add delete button
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.padding = "5px 10px";
        deleteBtn.style.backgroundColor = "#dc3545";
        deleteBtn.style.color = "white";
        deleteBtn.style.border = "none";
        deleteBtn.style.borderRadius = "5px";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.onclick = function() {
            deleteTask(taskText, sectionId);
        };

        // Add checkbox
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", function() {
            toggleCompleted(taskText, sectionId, checkbox.checked);
        });

        // Create a div to contain the delete button and checkbox
        var controlsDiv = document.createElement("div");
        controlsDiv.style.display = "flex";
        controlsDiv.style.gap = "10px";
        controlsDiv.appendChild(deleteBtn);
        controlsDiv.appendChild(checkbox);

        // Append task text and controls to the task container
        taskContainer.appendChild(taskDiv);
        taskContainer.appendChild(controlsDiv);

        // Append task container to the appropriate section
        var sectionId = "future-tasks-section";
        if (itemDate === today) {
            sectionId = "today-tasks-section";
        } else if (new Date(itemDate) < new Date(today)) {
            sectionId = "completed-tasks-section";
        }
        document.getElementById(sectionId).appendChild(taskContainer);
    });
}

// Event listener for the add item button
document.getElementById("add-item-btn").addEventListener("click", addItem);

// Render tasks on page load
document.addEventListener("DOMContentLoaded", renderTasks);
