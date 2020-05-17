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
    return this.http.get<User[]>(`${this.apiUrl}/folders/${folderId}/sharingInfo`);
  }


  makeFileShareable(fileId : string)
  {
    return this.http.put(`${this.apiUrl}/files/${fileId}/share`, {});
  }

  makeFileUnshareable(fileId : string)
  {
    return this.http.put(`${this.apiUrl}/files/${fileId}/unshare`, {});
  }

  getFileUserShares(fileId : string)
  {
    return this.http.get<User[]>(`${this.apiUrl}/files/${fileId}/sharingInfo`);
  }
  
  shareFolder(folderId : string, userName : string)
  {
    return this.http.put(`${this.apiUrl}/folders/${folderId}/share/${userName}`, {});
  }

  shareFile(fileId : string, userName : string)
  {
    return this.http.put(`${this.apiUrl}/files/${fileId}/share/${userName}`, {});
  }

  getSharedFolders()
  {
    return this.http.get<Folder[]>(`${this.apiUrl}/folders/shared`);
  }

  getSharedFiles()
  {
    return this.http.get<File[]>(`${this.apiUrl}/files/shared`);
  }
}
