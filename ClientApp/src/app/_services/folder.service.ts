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

    postFolder(folder: Folder){
        return this.http.post<Folder>(`${this.apiUrl}folders/`, folder);
    }
    
    postSubfolder(folderId: string, folder: Folder){
        return this.http.post<Folder>(`${this.apiUrl}folders/${folderId}/subfolders`, folder);
    }
    moveToFolder(toFolderId : string, folderToMoveId : string)
    {
        if (toFolderId)
        {
            return this.http.put(`${this.apiUrl}folders/${folderToMoveId}/move/${toFolderId}`, {});
        }
        else
        {
            return this.http.put(`${this.apiUrl}folders/${folderToMoveId}/move/`, {});
        }
    }

    copy(folderId : string){
        return this.http.post<Folder>(`${this.apiUrl}folders/${folderId}/copy`, {});
    }
    update(folder: Folder) {
        return this.http.put(`${this.apiUrl}folders`, folder);
    }

    delete(folderId: string) {
        return this.http.delete(`${this.apiUrl}folders/${folderId}`);
    }
 }

