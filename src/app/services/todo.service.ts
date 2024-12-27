import { Injectable, signal } from '@angular/core';
import { TodoItem } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos = signal<TodoItem[]>([]);

  addTodo(title: string) {
    const id = crypto.randomUUID();
    const newTodo: TodoItem = { id, title, isCompleted: false };
    this.todos.update((current) => [...current, newTodo]);
  }

  toggleCompletion(id: string) {
    this.todos.update((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }

  removeTodo(id: string) {
    this.todos.update((current) => current.filter((todo) => todo.id !== id));
  }
}
