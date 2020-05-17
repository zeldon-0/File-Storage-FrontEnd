import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, SignUpModel } from '../_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    constructor(private http: HttpClient) { }

    readonly  apiUrl : string  = `https://localhost:5001/api/`;

    getAccountInfo(id : number)
    {
      return this.http.get<User>(`${this.apiUrl}account`);
    }
    
    register(user: SignUpModel) {
        return this.http.post(`${this.apiUrl}account/signUp`, user);
    }

    update(user: User) {
        return this.http.put<User>(`${this.apiUrl}account/edit`, user);
    }

    delete() {
        return this.http.delete(`${this.apiUrl}account/delete`);
    }
    upgrade(){
        return this.http.put(`${this.apiUrl}account/upgrade`,{});
    }
    revertUpgrade(){
        return this.http.put(`${this.apiUrl}account/revertUpgrade`,{});
    }
    changePassword(oldPassword: string, newPassword: string){
      return this.http.put(`${this.apiUrl}account/updatePassword?oldPassword=${oldPassword}&newPassword=${newPassword}`, {});
    }
}