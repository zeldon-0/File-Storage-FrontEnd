import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'app';
  currentUser: User;

  constructor(
       private router: Router,
      private authenticationService: AuthenticationService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
