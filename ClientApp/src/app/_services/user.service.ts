import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, SignUpModel } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    readonly  apiUrl : string  = `https://localhost:5001/api/`;
    getAll() {
        return this.http.get<User[]>(`${this.apiUrl}users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${this.apiUrl}users/${id}`);
    }

    update(user: User) {
        return this.http.put<User>(`${this.apiUrl}account/edit`, user);
    }

    delete(userId: number) {
        return this.http.delete(`${this.apiUrl}users`);
    }
    upgrade(){
        return this.http.put(`${this.apiUrl}users/upgrade`,{});
    }
    revertUpgrade(){
        return this.http.put(`${this.apiUrl}users/revertUpgrade`,{});
    }
}