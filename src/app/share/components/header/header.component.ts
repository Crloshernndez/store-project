import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  isAuthenticaded: boolean = false;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.isAuthenticaded = user ? true : false;
    });
  }

  onClick() {
    this.router.navigate(['/cart']);
  }

  onHandleLog() {
    if (this.isAuthenticaded) {
      this.authService.logOut();
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
