import { Component, OnInit} from '@angular/core';
import { User } from '../../_models';
import { AccountService, NotificationService } from '../../_services'
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.css']
})
export class PasswordEditComponent implements OnInit {

  private sub : Subscription = new Subscription();
  passwordForm: FormGroup;
  currentUser : User;
  user: User;
  constructor(private accountService : AccountService,
    private formBuilder: FormBuilder,
    private notificationService : NotificationService,
    private router: Router,
    private route: ActivatedRoute

    ) { }

  ngOnInit(): void {
 
        this.passwordForm = this.formBuilder.group({
          oldPassword: ['', Validators.required],
          newPassword: ['', Validators.required]
        });

  }

  onSubmit() {
  
    if (this.passwordForm.invalid) {
        return;
    }

    this.accountService.changePassword(this.passwordForm.value.oldPassword, this.passwordForm.value.newPassword )
    .subscribe(
        data => {
            this.notificationService.showSuccess("Successfully updated your password.", "Success");
            this.router.navigate([`/account/`]);          
        },
        error => {
            this.notificationService.showError(error, "Error")
        });

  }
  ngOnDestroy() : void {
    this.sub.unsubscribe();
  }


}
