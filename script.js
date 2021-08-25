let projects = []
let todoID = 0;
let projID = 0;

class Todo {
    constructor(title, description, dueDate, priority, isComplete, id) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = isComplete;
        this.id = id;
    }
}

class Project {
    constructor(todos, title) {
        this.todos = todos;
        this.title = title;
    }
}

function writeTodoToDOM(todo) {
    const d = document.createElement('div');
    const completedChk = document.createElement("INPUT");
    completedChk.setAttribute("type", "checkbox");

    d.innerHTML = "";

    if (todo.isComplete) {
        completedChk.setAttribute("checked", true);
    }
    completedChk.setAttribute("onclick", `toggleCompleted(${todo.id});`);

    d.appendChild(completedChk);
    d.innerHTML += todo.title + ": ";
    d.innerHTML += todo.description + ", ";
    d.innerHTML += todo.dueDate + ", ";
    d.innerHTML += "Priority: " + todo.priority + ", ";
    d.innerHTML += "Completed: ";

    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = "Remove";
    removeBtn.setAttribute("onclick", `removeTodo(${todo.id}); reloadTodos()`);
    d.appendChild(removeBtn);
    
    d.id = todo.id;

    const content = document.getElementById("todo-list");
    content.appendChild(d);
}

function writeProjectToDOM(project) {
    project.todos.forEach(function(todo) {
        writeTodoToDOM(todo);
    })
}

function addTodoFromForm() {
    const title = document.forms["todo-input"]["title"].value;
    const description = document.forms["todo-input"]["description"].value;
    const date = document.forms["todo-input"]["date"].value;
    const priority = document.forms["todo-input"]["priority"].value;
    const todo = new Todo(title, description, date, priority, false, todoID, projID);
    todoID++;
    projects[projID].todos.push(todo);
}

function clearTodoListFromDOM() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
}

function clickNewTodo() {
    console.log("new todo clicked");
}

function toggleCompleted(id){
    projects[projID].todos.find(todo => todo.id === id).isComplete 
        = !projects[projID].todos.find(todo => todo.id === id).isComplete ;
}

function removeTodo(id) {
    const todos = projects[projID].todos;

    let i = 0
    while (i < todos.length) {
        if (todos[i].id === id) {
            break;
        }
        i++;
    }
    projects[projID].todos.splice(i, 1);
}

function reloadTodos() {
    clearTodoListFromDOM(); 
    writeProjectToDOM(projects[projID]);
}

function createNewProject() {
    const projectTitle = prompt("Enter name for your new project");
    const p = new Project([], projectTitle);
    projects.push(p);
    addProjectToDOM(projectTitle);
}

function addProjectToDOM(projectTitle) {
    const selectProjects = document.querySelector('#projects');
    const projectOption = document.createElement('option');
    projectOption.innerHTML = projectTitle;
    projectOption.value = projects.length - 1;
    selectProjects.appendChild(projectOption);
}

const sel = document.getElementById('projects');
sel.addEventListener("change", selectProject);

function selectProject() {
    projID = parseInt(sel.value);
    reloadTodos();
}

const p = new Project([], "Default project");
projects.push(p);