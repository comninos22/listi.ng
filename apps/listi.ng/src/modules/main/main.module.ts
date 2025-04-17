import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

// ...existing code...

@Component({
  selector: 'app-main',
  imports: [MatButtonModule],
  template: `
    <div>
      <h1>Todo List</h1>
      <!-- Add your Todo items here -->
      <button mat-button>Toggle me!</button>
    </div>
  `,
  styleUrls: ['./main.module.css'],
})
export class MainComponent implements OnInit {
  ngOnInit(): void {
    // Initialization logic if needed
    console.log('MainComponent initialized');
  }
}

// ...existing code...
