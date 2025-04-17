import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainComponent } from '../modules/main/main.module';

@Component({
  imports: [MainComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: '../custom-theme.scss',
})
export class AppComponent {
  title = 'listi.ng';
}
