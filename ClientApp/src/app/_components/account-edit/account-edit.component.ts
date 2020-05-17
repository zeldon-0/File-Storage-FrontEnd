import { Component, OnInit} from '@angular/core';
import { User } from '../../_models';
import { AccountService, NotificationService } from '../../_services'
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  private sub : Subscription = new Subscription();
  editForm: FormGroup;
  private userId: string;
  currentUser : User;
  user: User;
  constructor(private accountService : AccountService,
    private formBuilder: FormBuilder,
    private notificationService : NotificationService,
    private router: Router,
    private route: ActivatedRoute

    ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
    });
    
    if (this.userId){

    }
    else{
      this.sub = this.accountService.getAccountInfo(this.currentUser.id)
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

    this.accountService.update(user)
    .subscribe(
        data => {
          if (this.currentUser.id != user.id){
            this.router.navigate([`../users/${this.userId}`]);
          }
          else{
            this.notificationService.showSuccess("Successfully updated your account info. Please, sign in again.", "Success");
            localStorage.removeItem("currentUser");
            this.router.navigate([`/`]);          
          }
        },
        error => {
            this.notificationService.showError(error, "Error")
        });

  }
  ngOnDestroy() : void {
    this.sub.unsubscribe();
  }


}
