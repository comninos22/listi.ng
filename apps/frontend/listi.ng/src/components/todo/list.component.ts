import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { TodoDto } from '@listi.ng/common-dtos';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  template: `
    <div class="todo-list">
      <mat-card *ngIf="todos.length === 0" class="empty-state">
        <mat-card-content>
          <div class="empty-message">
            <mat-icon>assignment</mat-icon>
            <p>No todos found. Add a new todo to get started!</p>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card
        *ngFor="let todo of todos"
        class="todo-item"
        [class.completed]="todo.completed"
      >
        <mat-card-content>
          <div class="todo-content">
            <mat-checkbox
              [checked]="todo.completed"
              (change)="onToggle(todo)"
              color="primary"
              class="todo-checkbox"
            >
              <span [class.line-through]="todo.completed">{{
                todo.title
              }}</span>
            </mat-checkbox>

            <div class="todo-actions">
              <button
                mat-icon-button
                color="primary"
                matTooltip="Edit"
                (click)="onEdit(todo)"
              >
                <mat-icon>edit</mat-icon>
              </button>
              <button
                mat-icon-button
                color="warn"
                matTooltip="Delete"
                (click)="onDelete(todo.id)"
              >
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </div>

          <div *ngIf="todo.description" class="todo-description">
            <mat-divider></mat-divider>
            <p [class.line-through]="todo.completed">{{ todo.description }}</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .todo-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .todo-item {
        transition: all 0.3s ease;
      }

      .todo-item.completed {
        opacity: 0.7;
        background-color: rgba(0, 0, 0, 0.02);
      }

      .todo-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .todo-checkbox {
        flex: 1;
      }

      .todo-actions {
        display: flex;
        gap: 8px;
      }

      .todo-description {
        margin-top: 12px;
        padding-top: 12px;
        color: rgba(0, 0, 0, 0.6);
      }

      .line-through {
        text-decoration: line-through;
        color: rgba(0, 0, 0, 0.5);
      }

      .empty-state {
        padding: 32px;
        text-align: center;
      }

      .empty-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        color: rgba(0, 0, 0, 0.5);
      }

      .empty-message mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
      }
    `,
  ],
})
export class TodoListComponent {
  @Input() todos: TodoDto[] = [];
  @Output() todoToggle = new EventEmitter<TodoDto>();
  @Output() todoEdit = new EventEmitter<TodoDto>();
  @Output() todoDelete = new EventEmitter<string>();

  onToggle(todo: TodoDto): void {
    this.todoToggle.emit(todo);
  }

  onEdit(todo: TodoDto): void {
    this.todoEdit.emit(todo);
  }

  onDelete(id: string): void {
    this.todoDelete.emit(id);
  }
}
