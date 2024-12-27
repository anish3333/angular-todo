import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  template: `
    <div>
      <h1>Counter</h1>
      <p>Current count: {{count()}}</p>
      <button (click) = "inc()">Increment</button>
      <button (click) = "dec()">Decrement</button>
      <button (click) = "reset()">Reset</button>
    </div>
  `,
  styles: ``
})
export class CounterComponent {
  count = signal(0);
  inc(){
    this.count.update( val => val + 1);
  }
  dec(){
    this.count.update( val => val - 1);
  }
  reset(){
    this.count.update( val => 0);
  }
}
