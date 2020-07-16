import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, Folder, File } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    readonly  apiUrl : string  = `https://localhost:5001/api/`;
    getAll() {
        return this.http.get<User[]>(`${this.apiUrl}users`);
    }

    getById(userId: string) {
        return this.http.get<User>(`${this.apiUrl}users/${userId}`);
    }

    update(user: User) {
        return this.http.put<User>(`${this.apiUrl}users`, user);
    }

    delete(userId: string) {
        return this.http.delete(`${this.apiUrl}users/${userId}`);
    }
    upgrade(userId: string){
        return this.http.put(`${this.apiUrl}users/${userId}/upgrade`,{});
    }
    revertUpgrade(userId: string){
        return this.http.put(`${this.apiUrl}users/${userId}/revertUpgrade`,{});
    }
    getUserFolders(userId : string){
        return this.http.get<Folder[]>(`${this.apiUrl}users/${userId}/folders`,{});
    }
    getUserFiles(userId : string){
        return this.http.get<File[]>(`${this.apiUrl}users/${userId}/files`,{});
    }}