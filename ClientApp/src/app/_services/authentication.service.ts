import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

import { User, SignUpModel } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private apiUrl = "https://localhost:5001/api/";

    constructor(private http: HttpClient) {

    }

        
    register(user: SignUpModel) {
        return this.http.post(`${this.apiUrl}account/signUp`, user);
    }

    login(Login: string, Password: string) {
        return this.http.post<User>(`${this.apiUrl}account/signin`, { Login, Password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }

    refreshToken(token : string){
        const headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'refreshToken': `${token}`
          }
          
          const requestOptions = {                                                                                                                                                                                 
            headers: new HttpHeaders(headerDict), 
          };
        return this.http.get<User>(`${this.apiUrl}account/refresh?refreshToken=${token}`, requestOptions);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
 
    }

}