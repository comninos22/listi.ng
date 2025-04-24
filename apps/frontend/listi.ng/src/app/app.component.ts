import { Component } from '@angular/core';

import { MainComponent } from '../pages/main/main.component';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { API_URL_TOKEN } from '../service/api/public/publicApi.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthErrorInterceptor } from '../interceptors/token-expired.interceptor';

@Component({
  imports: [NavigationComponent, RouterModule],
  providers: [
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: '../custom-theme.scss',
})
export class AppComponent {
  title = 'listi.ng';
}
