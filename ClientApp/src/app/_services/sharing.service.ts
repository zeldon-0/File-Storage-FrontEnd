import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Folder, File, User} from '../_models';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  constructor(private http: HttpClient) { }
  readonly  apiUrl : string  = `https://localhost:5001/api`;

  makeFolderShareable(folderId : string)
  {
    return this.http.put(`${this.apiUrl}/folders/${folderId}/share`, {});
  }

  makeFolderUnshareable(folderId : string)
  {
    return this.http.put(`${this.apiUrl}/folders/${folderId}/unshare`, {});
  }

  getFolderUserShares(folderId : string)
  {
    return this.http.get<User[]>(`${this.apiUrl}/folders/${folderId}/sharingInfo`)
  }

  update(folder: Folder) {
      return this.http.put(`${this.apiUrl}/folders`, folder);
  }

  delete(id: string) {
      return this.http.delete(`${this.apiUrl}/folders/${id}`);
  }
}
