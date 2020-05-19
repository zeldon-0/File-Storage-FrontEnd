import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


import { NotificationService, AuthenticationService } from '../../_services';

@Component({
    styleUrls:[ 'login.component.css'],
    templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private notificationService : NotificationService
    ) {

        if (localStorage.getItem("currentUser")) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });


        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }


    onSubmit() {
        this.submitted = true;


        if (this.loginForm.invalid) {
            return;
        }

        this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {

                    this.notificationService.showError(error, 'Error');
                });
    }

}
