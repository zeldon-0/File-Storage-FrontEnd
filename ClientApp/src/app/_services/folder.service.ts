import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Folder} from '../_models';
@Injectable({
  providedIn: 'root'
})
export class FolderService {

    constructor(private http: HttpClient) { }
    readonly  apiUrl : string  = `https://localhost:5001/api/`;

    getAll() {
        return this.http.get<Folder[]>(`${this.apiUrl}folders`);
    }

    getById(id: string){
        return this.http.get<Folder>(`${this.apiUrl}folders/${id}`);
    }


    update(folder: Folder) {
        return this.http.put(`${this.apiUrl}/folders`, folder);
    }

    delete(id: string) {
        return this.http.delete(`${this.apiUrl}/folders/${id}`);
    }
 }

