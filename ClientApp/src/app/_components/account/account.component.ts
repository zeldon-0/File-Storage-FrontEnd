import { Component, OnInit, Input } from '@angular/core';
import { AccountService, NotificationService} from '../../_services';

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

  constructor(private accountService : AccountService,
    private route : ActivatedRoute,
    private router : Router,
    private notificationService : NotificationService
) { 
  this.url = this.router.url;
  this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(this.currentUser);
}

  @Input() userId: number;

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
      this.sub = this.accountService.getAccountInfo(this.userId)
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
    if (!this.userId)
    {
      this.sub = this.accountService.upgrade()
      .subscribe(user => 
        {
            this.currentUser.roles =this.currentUser.roles.concat("Corporate");
            localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
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
      .subscribe(user => 
        {
          this.currentUser.roles = this.currentUser.roles.filter(function(value, index, arr){ return value != "Corporate";})
          localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
          window.location.reload();
        },
        error =>{
          this.notificationService.showError(error, "Error");
          this.router.navigate(['/users/']);
        });
    }
  }
  edit():void{
    this.router.navigate(['/editAccount/']);
  }
  delete():void{

  }

}
