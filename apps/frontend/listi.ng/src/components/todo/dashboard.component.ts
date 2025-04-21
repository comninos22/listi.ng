import { Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { TodoListComponent } from './list.component';
import { TodoFormComponent } from './form.component';
import { TodoService } from '../../service/todo/todo.service';
import { TodoDto } from '@listi.ng/common-dtos';

@Component({
  selector: 'app-todo-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatTooltipModule,
    MatSnackBarModule,
    TodoListComponent,
    TodoFormComponent,
  ],
  template: `
    <div class="todo-dashboard">
      <mat-toolbar color="primary" class="toolbar">
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>Todo Dashboard</span>
        <span class="toolbar-spacer"></span>
        <button
          mat-icon-button
          matTooltip="Add new todo"
          (click)="openAddTodoForm()"
        >
          <mat-icon>add</mat-icon>
        </button>
      </mat-toolbar>

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #sidenav mode="side" opened class="sidenav">
          <mat-nav-list>
            <a
              mat-list-item
              (click)="filterTodos('all')"
              (keydown.enter)="filterTodos('all')"
              tabindex="0"
              [class.active]="currentFilter === 'all'"
            >
              <mat-icon matListItemIcon>list</mat-icon>
              <span matListItemTitle>All</span>
              <span
                matListItemMeta
                matBadge="{{ todos.length }}"
                matBadgeColor="primary"
              >
              </span>
            </a>
            <a
              mat-list-item
              (click)="filterTodos('active')"
              (keydown.enter)="filterTodos('active')"
              tabindex="0"
              [class.active]="currentFilter === 'active'"
            >
              <mat-icon matListItemIcon>check_box_outline_blank</mat-icon>
              <span matListItemTitle>Active</span>
              <span
                matListItemMeta
                matBadge="{{ getActiveTodosCount() }}"
                matBadgeColor="accent"
              >
              </span>
            </a>
            <a
              mat-list-item
              (click)="filterTodos('completed')"
              (keydown.enter)="filterTodos('completed')"
              tabindex="0"
              [class.active]="currentFilter === 'completed'"
            >
              <mat-icon matListItemIcon>check_box</mat-icon>
              <span matListItemTitle>Completed</span>
              <span
                matListItemMeta
                matBadge="{{ getCompletedTodosCount() }}"
                matBadgeColor="warn"
              ></span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content class="sidenav-content">
          <div class="content-container">
            <div *ngIf="showAddForm" class="form-container">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Add New Todo</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <app-todo-form
                    (todoSubmit)="addTodo($event)"
                    (cancelForm)="closeAddTodoForm()"
                  ></app-todo-form>
                </mat-card-content>
              </mat-card>
            </div>

            <div *ngIf="selectedTodo" class="form-container">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Edit Todo</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <app-todo-form
                    [todo]="selectedTodo"
                    (todoSubmit)="updateTodo($event)"
                    (cancelForm)="cancelEdit()"
                  >
                  </app-todo-form>
                </mat-card-content>
              </mat-card>
            </div>

            <app-todo-list
              [todos]="filteredTodos"
              (todoToggle)="toggleTodoStatus($event)"
              (todoEdit)="editTodo($event)"
              (todoDelete)="deleteTodo($event)"
            >
            </app-todo-list>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [
    `
      .todo-dashboard {
        display: flex;
        flex-direction: column;
        height: 100vh;
      }

      .toolbar-spacer {
        flex: 1 1 auto;
      }

      .sidenav-container {
        flex: 1;
      }

      .sidenav {
        width: 250px;
      }

      .sidenav-content {
        padding: 20px;
      }

      .content-container {
        max-width: 800px;
        margin: 0 auto;
      }

      .form-container {
        margin-bottom: 20px;
      }

      .active {
        background-color: rgba(0, 0, 0, 0.04);
      }
    `,
  ],
})
export class TodoDashboardComponent implements OnInit {
  todos: TodoDto[] = [];
  filteredTodos: TodoDto[] = [];
  currentFilter: 'all' | 'active' | 'completed' = 'all';
  showAddForm = false;
  selectedTodo: TodoDto | null = null;

  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      this.applyFilter();
    });
  }

  filterTodos(filter: 'all' | 'active' | 'completed'): void {
    this.currentFilter = filter;
    this.applyFilter();
  }

  applyFilter(): void {
    switch (this.currentFilter) {
      case 'active':
        this.filteredTodos = this.todos.filter((todo) => !todo.completed);
        break;
      case 'completed':
        this.filteredTodos = this.todos.filter((todo) => todo.completed);
        break;
      default:
        this.filteredTodos = [...this.todos];
    }
  }

  getActiveTodosCount(): number {
    return this.todos.filter((todo) => !todo.completed).length;
  }

  getCompletedTodosCount(): number {
    return this.todos.filter((todo) => todo.completed).length;
  }

  openAddTodoForm(): void {
    this.showAddForm = true;
    this.selectedTodo = null;
  }

  closeAddTodoForm(): void {
    this.showAddForm = false;
  }

  addTodo(todo: TodoDto): void {
    this.todoService.addTodo(todo).subscribe({
      next: (newTodo) => {
        this.todos = [...this.todos, newTodo];
        this.applyFilter();
        this.showAddForm = false;
        this.showSnackBar('Todo added successfully');
      },
      error: (error) => {
        console.error('Error adding todo:', error);
        this.showSnackBar('Failed to add todo');
      },
    });
  }

  toggleTodoStatus(todo: TodoDto): void {
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.todoService.updateTodo(updatedTodo).subscribe({
      next: (result) => {
        this.todos = this.todos.map((t) => (t.id === result.id ? result : t));
        this.applyFilter();
        this.showSnackBar(
          `Todo marked as ${result.completed ? 'completed' : 'active'}`
        );
      },
      error: (error) => {
        console.error('Error updating todo status:', error);
        this.showSnackBar('Failed to update todo status');
      },
    });
  }

  editTodo(todo: TodoDto): void {
    this.selectedTodo = { ...todo };
    this.showAddForm = false;
  }

  updateTodo(todo: TodoDto): void {
    this.todoService.updateTodo(todo).subscribe({
      next: (updatedTodo) => {
        this.todos = this.todos.map((t) =>
          t.id === updatedTodo.id ? updatedTodo : t
        );
        this.applyFilter();
        this.selectedTodo = null;
        this.showSnackBar('Todo updated successfully');
      },
      error: (error) => {
        console.error('Error updating todo:', error);
        this.showSnackBar('Failed to update todo');
      },
    });
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.applyFilter();
        this.showSnackBar('Todo deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting todo:', error);
        this.showSnackBar('Failed to delete todo');
      },
    });
  }

  cancelEdit(): void {
    this.selectedTodo = null;
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
