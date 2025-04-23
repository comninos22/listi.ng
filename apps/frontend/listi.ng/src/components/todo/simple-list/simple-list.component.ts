import { Component, OnInit } from '@angular/core';
import { TodoDto } from '@listi.ng/common-dtos';
import { TodoService } from '../../../service/api/todo/todo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simple-list',
  imports: [CommonModule],
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.scss'],
})
export class SimpleListComponent implements OnInit {
  todos: TodoDto[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
      },
      error: (err) => {
        console.error('Failed to load todos:', err);
      },
    });
  }
}
