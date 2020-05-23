import { Component, OnInit } from '@angular/core';
import { SharingService, NotificationService, FolderService, FileService } from '../../_services'
import { User, File, Folder} from '../../_models';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shared-users',
  templateUrl: './shared-users.component.html',
  styleUrls: ['./shared-users.component.css']
})
export class SharedUsersComponent implements OnInit {

  users : User[];
  private folderId : string;
  private fileId : string;
  
  public folder: Folder;
  public file: File;
  
  public currentUser: User;


  constructor(private sharingService:SharingService,
    private notificationService : NotificationService,
    private fileService : FileService,
    private folderService : FolderService,
    private router : Router,
    private route : ActivatedRoute) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if(this.currentUser == null){
          this.router.navigate(['/login/']);
      }
    }

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe(params => {
      this.folderId = params.get('folderId');
    });

    if(!this.folderId)
    {
      this.route.parent.paramMap.subscribe(params => {
        this.fileId = params.get('fileId');
      });

      this.fileService.getById(this.fileId)
      .subscribe(file => {
        this.file = file;
      },
      error => {
       this.notificationService.showError(error, "Error"); 
      });

      this.sharingService.getFileUserShares(this.fileId)
      .subscribe(users => 
        {
          this.users = users;
        },
        error =>{
          this.notificationService.showError(error[0], "Error");
          this.router.navigate(['/']);
        });
        
    }
    else{

      this.folderService.getById(this.folderId)
      .subscribe(folder => {
        this.folder = folder;
      },
      error => {
       this.notificationService.showError(error, "Error"); 
      });

      this.sharingService.getFolderUserShares(this.folderId)
      .subscribe(users => 
        {
          this.users = users;
        },
        error =>{
          this.notificationService.showError(error[0], "Error");
          this.router.navigate(['/']);
        });
    }
  }
  unshareFile(username: string){
    this.sharingService.unshareFile(this.fileId, username)
      .subscribe( obj =>
        {window.location.reload()},
      error => {
        this.notificationService.showError(error[0], "Error");
      });
  }

  unshareFolder(username: string){
    this.sharingService.unshareFolder(this.folderId, username)
    .subscribe( obj =>
      {window.location.reload()},
    error => {
      this.notificationService.showError(error[0], "Error");
    })
  }

}

