import { TodoList, TodoItem } from './classes.js';
import { TodoHistory } from './memento.js';

export class Command {
  name;
  args;
  constructor(name, args) {
    this.name = name;
    this.args = args;
  }
}

export const Commands = {
  ADD: "add",
  DELETE: "delete",
  UNDO: "undo",
}

export const CommandExecutor = {
  execute(command) {
    console.log(`execute is called: ${command.name}`)
    const todoList = TodoList.getInstance();
    switch (command.name) {
      case Commands.ADD:
        const todoInput = globalThis.DOM.todoInput;
        const todoText = todoInput.value.trim();
        const itemToAdd = todoList.find(todoText);

        if (todoText !== '' && itemToAdd == null) {
          todoInput.value = '';
          todoList.add(new TodoItem(todoText))
        }
        console.log("Command add is called");
        break;
      case Commands.DELETE:
        const [itemToDelete] = command.args;
        todoList.delete(itemToDelete);
        console.log("Command deleted is called");
        break;
      case Commands.UNDO:
        const previousList = TodoHistory.pop();
        if (previousList) {
          todoList.replaceList(previousList);
        }
        console.log("Command undo is called");
        break;
    }
  }
}
