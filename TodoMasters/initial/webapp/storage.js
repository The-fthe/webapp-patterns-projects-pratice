import { TodoList, TodoItem } from "./classes.js";

const todoList = TodoList.getInstance();

export const LocalStorage = {
  load() {
    if (localStorage.getItem("todos")) {
      for (let t of JSON.parse(localStorage.getItem("todos"))) {
        todoList.add(new TodoItem(t.text));
      }
    }
  },
  save() {
    console.log(`save called:\n${todoList.items}`);
    const array = Array.from(todoList.items);
    localStorage.setItem("todos", JSON.stringify(array));
  }
}
todoList.addObserver(LocalStorage.save);
