let projects = []

class Todo {
    constructor(title, description, dueDate, priority, isComplete) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = isComplete;
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
    d.innerHTML = todo.title + ": ";
    d.innerHTML += todo.description + ", ";
    d.innerHTML += todo.dueDate + ", ";
    d.innerHTML += "Priority: " + todo.priority + ", ";
    d.innerHTML += "Completed: " + todo.isComplete;
    

    console.log(d);

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
    const todo = new Todo(title, description, date, priority, false);
    projects[0].todos.push(todo);
    console.log(projects);
}

function clearTodoListFromDOM() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
}

function writeProjectListToDOM() {

}

const p = new Project([], "Default project");
projects.push(p);