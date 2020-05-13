﻿import { Injectable } from '@angular/core';
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
        return this.http.get(`${this.apiUrl}users/${id}`);
    }

    register(user: SignUpModel) {
        return this.http.post(`${this.apiUrl}account/signUp`, user);
    }

    update(user: User) {
        return this.http.put(`${this.apiUrl}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/users/${id}`);
    }
}