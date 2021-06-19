import { AlertifyService } from '@app/services/alertify.service';
import { UserService } from '@app//services/user.service';
import { UserListModel } from '@app/models/user/userListModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  userListModel: UserListModel[];
  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.userService.getList().subscribe(
      (result) => {
        this.userListModel = result.data;
      },
      (error) => this.alertifyService.error(error)
    );
  }
} 
