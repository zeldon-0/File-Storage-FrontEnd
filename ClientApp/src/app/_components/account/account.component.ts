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

  private sub : Subscription = new Subscription();
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
  this.route.paramMap.subscribe(params => {
    this.userId = params.get('userId');
  });
  console.log(this.currentUser.refreshToken);
}


  ngOnInit(): void {
    if (this.userId == null){
      this.sub = this.accountService.getAccountInfo(this.currentUser.id)
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
      this.sub = this.userService.getById(Number(this.userId))
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
      this.sub = this.accountService.upgrade()
      .subscribe(user => {
        },
        error =>{
          this.notificationService.showError(error, "Error");
          this.router.navigate(['/users/']);
        });
      this.sub = this.authenticationService.refreshToken(this.currentUser.refreshToken)
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
      this.sub = this.userService.upgrade()
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
      this.sub = this.accountService.revertUpgrade()
      .subscribe(user => {
        },
        error =>{
          this.notificationService.showError(error, "Error");
          this.router.navigate(['/account/']);
        });
        this.sub = this.authenticationService.refreshToken(this.currentUser.refreshToken)
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
    this.router.navigate(['/editAccount/']);
  }
  changePassword():void{
    this.router.navigate(['/changePassword/']);
  }

  delete():void{
    this.sub = this.accountService.delete()
    .subscribe(user => 
      {
        localStorage.removeItem("currentUser");
        this.router.navigate(['/']);
      },
      error =>{
        this.notificationService.showError(error, "Error");
      });
  }

}
