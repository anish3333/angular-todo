import { TestBed } from '@angular/core/testing';

import { TodoFbService } from './todo-fb.service';

describe('TodoFbService', () => {
  let service: TodoFbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoFbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
