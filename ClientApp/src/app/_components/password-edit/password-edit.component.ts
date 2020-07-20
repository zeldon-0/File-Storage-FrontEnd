import { Component, OnInit} from '@angular/core';
import { User } from '../../_models';
import { AccountService, NotificationService, AuthenticationService } from '../../_services'
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.css']
})
export class PasswordEditComponent implements OnInit {

  passwordForm: FormGroup;
  currentUser : User;
  user: User;
  constructor(private accountService : AccountService,
    private authenticationService : AuthenticationService,
    private formBuilder: FormBuilder,
    private notificationService : NotificationService,
    private router: Router,
    private route: ActivatedRoute

    ) { 
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if(this.currentUser == null){
        this.router.navigate(['/login/']);
      }
    }

  ngOnInit(): void {
 
        this.passwordForm = this.formBuilder.group({
          oldPassword: ['', Validators.required],
          newPassword: ['', Validators.required]
        });

  }

  onSubmit(): void {
  
    if (this.passwordForm.invalid) {
        return;
    }

    this.accountService.changePassword(this.passwordForm.value.oldPassword, this.passwordForm.value.newPassword )
      .subscribe(
         data => {
          this.authenticationService
            .refreshToken(this.currentUser.refreshToken,  this.currentUser.token)
            .subscribe(user => {
              localStorage.setItem("currentUser", JSON.stringify(user));
              this.router.navigate([`/account/`]);
              this.notificationService.showSuccess("Successfully updated your password.", "Success");     
            },
            error =>{
              this.notificationService.showError(error, "Error");
            });
          },
          error => {
            this.notificationService.showError(error, "Error")
    });
  

  }

}
