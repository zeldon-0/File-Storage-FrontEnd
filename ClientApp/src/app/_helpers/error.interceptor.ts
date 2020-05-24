import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services';
import { User } from '../_models';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
        ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                if(localStorage.getItem("currentUser")){
                    let currentUser =  JSON.parse(localStorage.getItem("currentUser"));
                    this.authenticationService
                        .refreshToken(currentUser.refreshToken, currentUser.token)
                        .subscribe(user =>{
                            localStorage.setItem("currentUser", JSON.stringify(user));
                            window.location.reload();
                        },
                        error =>{    
                            localStorage.removeItem('currentUser');
                            window.location.reload();
                        });
                }
                else{   
                    window.location.reload()
                }
            }
            else{
                const error = err.error;
                return throwError(error);
            }
        }))
    }
}