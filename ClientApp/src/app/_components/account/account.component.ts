import { Component, OnInit, Input } from '@angular/core';
import { AccountService, UserService, NotificationService, AuthenticationService} from '../../_services';

import { Folder, File, User } from '../../_models';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {


  error:string;
  currentUser: User;
  url: string;
  user: User;
  userId : string;

  constructor(private accountService : AccountService,
    private userService : UserService,
    private route : ActivatedRoute,
    private router : Router,
    private notificationService : NotificationService,
    private authenticationService : AuthenticationService
) { 
  this.url = this.router.url;
  this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if(this.currentUser == null){
    this.router.navigate(['/login/']);
  }
  
  this.route.paramMap.subscribe(params => {
    this.userId = params.get('userId');
  });
}


  ngOnInit(): void {
    if (this.userId == null){
      this.accountService.getAccountInfo(this.currentUser.id)
      .subscribe(user => 
        {
          this.user = user;
        },
        error =>{
          this.notificationService.showError(error, "Error");
          this.router.navigate(['/']);
        });
    }
    else{
      this.userService.getById(this.userId)
      .subscribe(user => 
        {
          this.user = user;
        },
        error =>{
          this.notificationService.showError(error, "Error");
          this.router.navigate(['/users/']);
        });

    }
  }

  upgrade():void{
    if (!this.userId){
      this.accountService.upgrade()
      .subscribe(user => {
        },
        error =>{
          this.notificationService.showError(error, "Error");
          this.router.navigate(['/users/']);
        });
      this.authenticationService
        .refreshToken(this.currentUser.refreshToken,  this.currentUser.token)
        .subscribe(user => 
          {
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.reload();
          },
          error =>{
            this.notificationService.showError(error, "Error");
          });
    }
    else{
      this.userService.upgrade()
      .subscribe(user => 
        {
            window.location.reload();
        },
        error =>{
          this.notificationService.showError(error, "Error");
          this.router.navigate(['/users/']);
        });
    }
  }

  revertUpgrade(): void{
    if (!this.userId)
    {
      this.accountService.revertUpgrade()
      .subscribe(user => {
        },
        error =>{
          this.notificationService.showError(error, "Error");
          this.router.navigate(['/account/']);
        });
        this.authenticationService        
          .refreshToken(this.currentUser.refreshToken,  this.currentUser.token)
          .subscribe(user => 
            {
              localStorage.setItem("currentUser", JSON.stringify(user));
              window.location.reload();
            },
            error =>{
              this.notificationService.showError(error, "Error");
          });
    }
  }
  edit():void{
    if (!this.userId){
      this.router.navigate(['/editAccount/']);
    }
    else{
      this.router.navigate(['/editAccount/', this.userId]);
    }
  }
  changePassword():void{
    this.router.navigate(['/changePassword/']);
  }

  delete():void{
    if (!this.userId){
      this.accountService.delete()
      .subscribe(user => 
        {
          localStorage.removeItem("currentUser");
          this.router.navigate(['/']);
        },
        error =>{
          this.notificationService.showError(error, "Error");
        });
    }
    else{
      this.userService.delete(this.userId)
        .subscribe(user => 
          {
            this.notificationService.showSuccess("Successfully deleted the user.", "Success");
            this.router.navigate(['users']);
          },
        error => {
          this.notificationService.showError(error, "Error");
        })
    }
  }

}
