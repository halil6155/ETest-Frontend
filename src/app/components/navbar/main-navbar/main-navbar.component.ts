import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
    this.authService.loggedIn();
  }
  logout(){
    this.authService.removeAccessToken();
    this.authService.removeRefreshToken();
  }

}
