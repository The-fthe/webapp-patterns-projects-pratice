import { TodoList, TodoItem } from './webapp/classes.js'
import { CommandExecutor, Command, Commands } from './webapp/command.js'
import { LocalStorage } from './webapp/storage.js';

globalThis.DOM = {};

const DOM = globalThis.DOM


function renderList() {
  const todos = TodoList.getInstance();
  DOM.todoList.innerHTML = "";
  console.log("render list is called")
  for (let todo of todos.items) {
    const listItem = document.createElement('li')
    listItem.className = 'todo-item';
    listItem.innerHTML = `${todo.text} 
    <button class="delete-btn">Delete</button>`;
    listItem.dataset.text = todo.text;
    DOM.todoList.appendChild(listItem);
  }
}

document.addEventListener('keydown', function(event) {
  console.log("keydown is trigger")
  if (event.ctrlKey && event.key === 'p') {
    event.preventDefault();
    console.log("keydown is match!!")
    const cmd = new Command(Commands.ADD);
    CommandExecutor.execute(cmd);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  DOM.todoInput = document.getElementById('todo-input');
  DOM.addBtn = document.getElementById('add-btn');
  DOM.todoList = document.getElementById('todo-list');
  LocalStorage.load()

  DOM.addBtn.addEventListener('click', () => {
    console.log('add button is press')
    const cmd = new Command(Commands.ADD);
    CommandExecutor.execute(cmd);
  });

  DOM.todoList.addEventListener('click', (event) => {
    console.log('todoList click is press')
    if (event.target.classList.contains('delete-btn')) {
      const todo = event.target.parentNode.dataset.text;
      const cmd = new Command(Commands.DELETE, [todo])
      CommandExecutor.execute(cmd);
    }
  });

  renderList();
  TodoList.getInstance().addObserver(renderList);
});
