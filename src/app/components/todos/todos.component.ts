import { Component, inject, signal } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoFbService } from '../../services/todo-fb.service';

@Component({
  selector: 'app-todos',
  template: `
    <div class="container">
      <h1>Todo List</h1>
      <div class="flex">
        <input
          [value]="newTodoTitle()"
          (input)="handleInput($event)"
          placeholder="Enter a todo"
        />
        <button (click)="addTodo()" class="btn-primary">Add Todo</button>
      </div>
      <ul>

        @for(todo of todoService.todos(); track todo.id){
          <li>
            <input
              type="checkbox"
              [checked]="todo.isCompleted"
              (change)="toggleCompletion(todo.id)"
            />
            <span
              [class.completed]="todo.isCompleted"
              (click)="toggleCompletion(todo.id)"
            >
              {{todo.title}}
            </span>
            <button (click)="removeTodo(todo.id)" class="btn-danger">
              Remove
            </button>
          </li>
        }

      </ul>
    </div>
  `,
  styles: [`
    .container {
      max-width: 400px;
      margin: 20px auto;
      padding: 20px;
      background: #1a1a1a;
      color: #e0e0e0;
      box-shadow: 0 2px 8px #000;
      border-radius: 8px;
    }

    h1 {
      text-align: center;
      margin-bottom: 20px;
      color: #fff;
    }

    .flex {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
    }

    input {
      flex: 1;
      padding: 8px;
      background: #2d2d2d;
      color: #e0e0e0;
      border: 1px solid #404040;
      border-radius: 4px;
      outline: none;
    }

    input:focus {
      border-color: #2c5282;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 0;
      border-bottom: 1px solid #333;
    }

    span {
      flex: 1;
      cursor: pointer;
      padding: 4px 0;
    }

    .completed {
      color: #666;
      text-decoration: line-through;
    }

    button {
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: filter 0.2s;
    }

    button:hover {
      filter: brightness(1.2);
    }

    .btn-primary {
      background: #2c5282;
      color: white;
      padding: 8px 16px;
    }

    .btn-danger {
      background: #822727;
      color: white;
      padding: 4px 8px;
    }

    input[type="checkbox"] {
      width: 16px;
      height: 16px;
      cursor: pointer;
      accent-color: #2c5282;
    }
  `]
})
export class TodosComponent {
  // todoService = inject(TodoService);
  todoService = inject(TodoFbService);
  newTodoTitle = signal('');

  handleInput(event: Event) {
    this.newTodoTitle.update(() => (event.target as HTMLInputElement).value);
  }

  addTodo() {
    if (this.newTodoTitle().trim()) {
      this.todoService.addTodo(this.newTodoTitle().trim());
      this.newTodoTitle.update(() => '');
    }
  }

  toggleCompletion(id: string) {
    this.todoService.toggleCompletion(id);
  }

  removeTodo(id: string) {
    this.todoService.removeTodo(id);
  }
}