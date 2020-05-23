import { Component, OnInit} from '@angular/core';
import { User } from '../../_models';
import { AccountService, UserService, NotificationService, AuthenticationService } from '../../_services'
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  editForm: FormGroup;
  private userId: string;
  currentUser : User;
  user: User;
  constructor(private accountService : AccountService,
    private formBuilder: FormBuilder,
    private notificationService : NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UserService

    ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if(this.currentUser == null){
      this.router.navigate(['/login/']);
    }
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
    });
    
    if (this.userId){
      this.userService.getById(this.userId)
      .subscribe(
        user => {
          this.user = user;
          this.editForm = this.formBuilder.group({
            userName: [this.user.userName],
            email: [this.user.email]
        });
        },
        error =>
        {
          this.notificationService.showError(error, "Error");
        });
    }
    else{
      this.accountService.getAccountInfo(this.currentUser.id)
        .subscribe(
          user => {
            this.user = user;
            this.editForm = this.formBuilder.group({
              userName: [this.user.userName],
              email: [this.user.email]
          });
          },
          error =>
          {
            this.notificationService.showError(error, "Error");
          });
    }
  }

  onSubmit() {
  
    if (this.editForm.invalid) {
        return;
    }

    const user = this.user;
    user.userName = this.editForm.value.userName;
    user.email = this.editForm.value.email;

    if (!this.userId){
      this.accountService.update(user)
      .subscribe(
        data => {
            this.authenticationService        
              .refreshToken(this.currentUser.refreshToken,  this.currentUser.token)
              .subscribe(user => 
                {
                  localStorage.setItem("currentUser", JSON.stringify(user));
                  this.router.navigate([`/account/`]);
                  this.notificationService.showSuccess("Successfully updated your account info.", "Success");     
                },
                error =>{
                  this.notificationService.showError(error, "Error");
                });       
            
          },
          error => {
              this.notificationService.showError(error, "Error")
          });
    }
    else {
      this.userService.update(user)
      .subscribe(
          data => {
              this.router.navigate(['/users/', this.userId]);
              this.notificationService.showSuccess("Successfully updated the account's info.", "Success");     
          },
          error => {
              this.notificationService.showError(error, "Error")
          });
    }
  }
}
