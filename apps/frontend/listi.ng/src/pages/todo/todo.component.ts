import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoDashboardComponent } from '../../components/todo/dashboard.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, TodoDashboardComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {}
