import { inject, Injectable, signal } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { TodoItem } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoFbService {
  private firestore = inject(Firestore);
  private todosCollection = collection(this.firestore, 'todos'); // Reference to the 'todos' Firestore collection

  todos = signal<TodoItem[]>([]); // Local state using signals

  constructor() {
    this.loadTodosFromFirestore();
  }

  private loadTodosFromFirestore() {
    collectionData(this.todosCollection, { idField: 'id' }).subscribe(
      (data) => {
        console.log('Fetched Todos from Firestore:', data); // Log all fetched todos
        this.todos.set(data as TodoItem[]); // Update local state
      }
    );
  }

  async addTodo(title: string) {
    const newTodo: Partial<TodoItem> = { title, isCompleted: false };
    await addDoc(this.todosCollection, newTodo); // Save to Firestore
  }

  async toggleCompletion(id: string) {
    const todo = this.todos().find((t) => t.id === id);
    if (!todo) return;

    const todoDoc = doc(this.firestore, `todos/${id}`);
    await updateDoc(todoDoc, { isCompleted: !todo.isCompleted }); // Update in Firestore

    // Update local state
    this.todos.update((current) =>
      current.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  }

  async removeTodo(id: string) {
    const todoDoc = doc(this.firestore, `todos/${id}`);
    await deleteDoc(todoDoc); // Delete from Firestore

    // Update local state
    this.todos.update((current) => current.filter((todo) => todo.id !== id));
  }
}

