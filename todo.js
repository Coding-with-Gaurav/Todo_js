// Function to add a new todo
function Add() {
    let input = document.getElementById("inp");
    let textContainer = document.querySelector(".text");

    if (input.value.trim() === "") {
        alert("Please Enter Task");
    } else {
        // Create a new todo item
        let newTodo = document.createElement("div");
        newTodo.className = "todo-item";
        newTodo.innerHTML = `
            <p>${input.value}</p>
            <i class="fas fa-trash" onclick="deleteTodo(this)"></i>
        `;

        // Append the todo to the text container
        textContainer.appendChild(newTodo);

        // Save todos to local storage
        saveTodosToLocalStorage();

        // Clear input field
        input.value = "";
    }
}

// Function to delete a todo
function deleteTodo(element) {
    element.parentElement.remove();

    // Save todos to local storage after deletion
    saveTodosToLocalStorage();
}

// Function to save todos to local storage
function saveTodosToLocalStorage() {
    let todoItems = document.querySelectorAll(".todo-item");
    let todos = [];

    // Iterate through each todo and store its text in the array
    todoItems.forEach(todo => {
        todos.push(todo.querySelector("p").innerText);
    });

    // Save the array to local storage
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to load todos from local storage
function loadTodosFromLocalStorage() {
    let textContainer = document.querySelector(".text");
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // Clear the text container before appending todos
    textContainer.innerHTML = "";

    // Create and append a new todo item for each stored todo
    todos.forEach(todoText => {
        let newTodo = document.createElement("div");
        newTodo.className = "todo-item";
        newTodo.innerHTML = `
            <p>${todoText}</p>
            <i class="fas fa-trash" onclick="deleteTodo(this)"></i>
        `;
        textContainer.appendChild(newTodo);
    });
}

// Load todos from local storage on page load
loadTodosFromLocalStorage();
