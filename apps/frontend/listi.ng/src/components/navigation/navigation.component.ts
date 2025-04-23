import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
  ],
})
export class NavigationComponent {
  __URL: string | null = null;
  constructor(router: Router) {
    router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd) this.__URL = evt.url;
    });
    console.log(this.__URL);
  }
  private breakpointObserver = inject(BreakpointObserver);
  isSidenavOpen = false; // State to track if the sidenav is open or closed
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  toggleSidenav(sidenav: MatSidenav): void {
    sidenav.toggle();
    this.isSidenavOpen = sidenav.opened; // Update the state after toggling
    console.log('Sidenav is open:', this.isSidenavOpen);
  }
}
