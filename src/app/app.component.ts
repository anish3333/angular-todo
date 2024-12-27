import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CounterComponent } from './components/counter/counter.component';
import { TodosComponent } from './components/todos/todos.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CounterComponent, TodosComponent],
  template: `
    <!-- <app-header /> -->
    <!-- <app-counter /> -->
    <app-todos />
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'first-app';
}
