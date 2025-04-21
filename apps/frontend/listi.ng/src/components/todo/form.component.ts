import {
  Component,
  Input,
  Output,
  EventEmitter,
  type OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  type FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoDto } from '@listi.ng/common-dtos';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  template: `
    <form [formGroup]="todoForm" (ngSubmit)="onSubmit()" class="todo-form">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Title</mat-label>
        <input
          matInput
          formControlName="title"
          placeholder="Enter todo title"
        />
        <mat-error *ngIf="todoForm.get('title')?.hasError('required')">
          Title is required
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Description</mat-label>
        <textarea
          matInput
          formControlName="description"
          placeholder="Enter todo description (optional)"
          rows="3"
        >
        </textarea>
      </mat-form-field>

      <mat-checkbox
        *ngIf="isEditMode"
        formControlName="completed"
        color="primary"
        class="completed-checkbox"
      >
        Mark as completed
      </mat-checkbox>

      <div class="form-actions">
        <button mat-button type="button" (click)="onCancel()">Cancel</button>
        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="todoForm.invalid"
        >
          {{ isEditMode ? 'Update' : 'Add' }} Todo
        </button>
      </div>
    </form>
  `,
  styles: [
    `
      .todo-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .full-width {
        width: 100%;
      }

      .completed-checkbox {
        margin-bottom: 8px;
      }

      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
    `,
  ],
})
export class TodoFormComponent implements OnInit {
  @Input() todo: TodoDto | null = null;
  @Output() todoSubmit = new EventEmitter<TodoDto>();
  @Output() cancelForm = new EventEmitter<void>();

  todoForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.todo) {
      this.isEditMode = true;
      this.todoForm.patchValue({
        title: this.todo.title,
        description: this.todo.description || '',
        completed: this.todo.completed,
      });
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      completed: [false],
    });
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const formValue = this.todoForm.value;
      const todo: TodoDto = {
        id: this.isEditMode && this.todo ? this.todo.id : crypto.randomUUID(),
        title: formValue.title,
        description: formValue.description || undefined,
        completed: formValue.completed,
      };

      this.todoSubmit.emit(todo);
      if (!this.isEditMode) {
        this.todoForm.reset({ title: '', description: '', completed: false });
      }
    }
  }

  onCancel(): void {
    this.cancelForm.emit();
  }
}
