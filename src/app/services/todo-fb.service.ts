import { inject, Injectable, signal } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { TodoItem } from '../models/todo.model';
import {
  GoogleGenerativeAI, HarmBlockThreshold, HarmCategory 
} from '@google/generative-ai';
import { environment } from '../../environments/environment.development';
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


  // GEMINI 2.0 CODE: 


  genAI = new GoogleGenerativeAI(environment.GEMINI_API_KEY);

  generationConfig = {
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
      },
    ],
    temperature: 0.9,
    top_p: 1,
    top_k: 32,
    maxOutputTokens: 100, // limit output
  };

  model = this.genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp', // or 'gemini-pro-vision'
    ...this.generationConfig,
  });

  async TestGeminiPro() {
    // Model initialisation missing for brevity
  
    const prompt = 'What is the largest number with a name?';
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    console.log(response.text());
  }

}

