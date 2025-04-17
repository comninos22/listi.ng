import { Component } from '@angular/core';

import { MainComponent } from '../pages/main/main.component';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { RouterModule } from '@angular/router';

@Component({
  imports: [NavigationComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: '../custom-theme.scss',
})
export class AppComponent {
  title = 'listi.ng';
}
