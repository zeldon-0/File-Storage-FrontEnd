import { Component, OnInit, Input } from '@angular/core';
import { FolderService, NotificationService, UserService } from '../../_services';
import { Folder, User } from '../../_models';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.css']
})
export class FolderListComponent implements OnInit {
  folders : Folder[] ;
  folderToMove : Folder;
  currentUser : User;
  userId : string;

  constructor(private folderService : FolderService,
    private userService : UserService,
    private notificationService : NotificationService,
    private route: ActivatedRoute) { 
      this.route.paramMap.subscribe(params => {
        this.userId = params.get('userId');
      });
    }

  @Input() folder : Folder;

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.folderToMove = JSON.parse(localStorage.getItem("folderToMove"));

    if(this.userId){
      this.userService.getUserFolders(this.userId)
        .subscribe(folders =>{
            this.folders = folders;
          },
          error => {
            this.notificationService.showError(error, "Error");
          });
      return;
    }
    if (this.folder!=null){
      this.folders = this.folder.subfolders;
    }
    else{
      this.folderService.getAll().subscribe(folders =>
      this.folders = folders);
    }

  }
  move() : void {
    if (this.folder!=null)
    {
      this.folderService.moveToFolder(this.folder.id, this.folderToMove.id)
      .subscribe(
        data => {
          localStorage.removeItem("folderToMove");
          window.location.reload();
        },
        error => {
          this.notificationService.showError(error, "Error");
        }
      );
    }
    else
    {
      this.folderService.moveToFolder(null, this.folderToMove.id)
      .subscribe(
        data => {
          localStorage.removeItem("folderToMove");
          window.location.reload();
        },
        error => {
          this.notificationService.showError(error, "Error");
          console.log(error);
        }
      );
    }
    

  }

}
