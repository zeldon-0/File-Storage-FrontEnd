import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {File} from '../_models';
@Injectable({
  providedIn: 'root'
})
export class FileService {

    constructor(private http: HttpClient) { }
    readonly  apiUrl : string  = `https://localhost:5001/api/`;

    getAll() {
        return this.http.get<File[]>(`${this.apiUrl}files`);
    }

    getById(id: string){
        return this.http.get<File>(`${this.apiUrl}files/${id}`);
    }

    postAtRoot(file: File){
        return this.http.post<File>(`${this.apiUrl}files/`, file);
    }
    
    postAtFolder(folderId: string, file: File){
        return this.http.post<File>(`${this.apiUrl}folders/${folderId}/files`, file);
    }
    moveToFolder(folderId : string, fileId : string)
    {
        if (folderId)
        {
            return this.http.put(`${this.apiUrl}files/${fileId}/move/${folderId}`, {});
        }
        else
        {
            return this.http.put(`${this.apiUrl}files/${fileId}/move/`, {});
        }
    }

    copy(fileId : string){
        return this.http.post<File>(`${this.apiUrl}files/${fileId}/copy`, {});
    }
    update(file: File) {
        return this.http.put(`${this.apiUrl}files`, file);
    }

    delete(fileId: string) {
        return this.http.delete(`${this.apiUrl}folders/${fileId}`);
    }
 }

