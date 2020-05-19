import { Component, OnInit, Input } from '@angular/core';
import { UserService, NotificationService } from '../../_services';
import {  User } from '../../_models';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users : User[] ;
  currentUser : User;
  userId : number;

  constructor(private userService : UserService,
    private route : ActivatedRoute,
    private notificationService : NotificationService,
    private router : Router,) { 
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }


  ngOnInit() {
    if (!this.currentUser.roles.includes("Admin"))
    {
      this.notificationService.showWarning("This page is for admin's usage only!", "Warning");
      this.router.navigate(["/"]);
    }
    else
    {
      this.route.paramMap.subscribe(params => {
        this.userId = Number(params.get('userId'));
      });

      this.userService.getAll()
      .subscribe(users =>{
        this.users = users
      },
      error => {
        this.notificationService.showError(error, "Error");
      });
    } 
  }

}
