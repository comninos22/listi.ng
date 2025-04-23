import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleListComponent } from '../../components/todo/simple-list/simple-list.component';

@Component({
  selector: 'app-main',
  imports: [CommonModule,SimpleListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
 