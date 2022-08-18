const form = document.querySelector("#new-todo-form");
const todoInput = document.querySelector("#todo-input");
const list = document.querySelector("#list");
const template = document.querySelector("#list-item-template");
const LOCAL_STORAGE_PREFIX = `ADVANCED-TODO-LIST`;
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`;
let todos = loadTodo();
console.log(todos);
todos.forEach((todo) => {
  renderTodo(todo);
});

list.addEventListener("change", (e) => {
  if (!e.target.matches("[data-list-item-checkbox]")) return;

  // Get the todo that is clicked on
  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  const todo = todos.find((t) => t.id === todoId);
  todo.complete = e.target.checked;

  // toggle the complete property to be equal to the checkbox value
  // save out updated todo
  saveTodo();
});

list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return;

  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  // remove the todo from the screen
  parent.remove();
  // remove the todo from the list
  todos = todos.filter((todo) => todo.id !== todoId);
  // save the newtodos
  saveTodo();
});
// Add todos
// User will type in todo and click add todo button
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoName = todoInput.value;

  if (todoName === "") return;
  const newTodo = {
    name: todoName,
    complete: false,
    id: new Date().valueOf().toString()
  };
  todos.push(newTodo);
  renderTodo(newTodo);
  saveTodo();
  todoInput.value = "";
});

function renderTodo(todo) {
  const templateClone = template.content.cloneNode(true);
  const textElement = templateClone.querySelector("[data-list-item-text]");
  textElement.innerText = todo.name;
  const listItem = templateClone.querySelector(".list-item");
  listItem.dataset.todoId = todo.id;
  const checkbox = templateClone.querySelector("[data-list-item-checkbox]");
  checkbox.checked = todo.complete;
  list.appendChild(templateClone);
}
// save todos

function saveTodo() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
}
// Load todos

function loadTodo() {
  const loadString = localStorage.getItem(TODOS_STORAGE_KEY);
  return JSON.parse(loadString) || [];
}
