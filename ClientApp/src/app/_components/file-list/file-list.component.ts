import { Component, OnInit, Input } from '@angular/core';
import { FileService, NotificationService, UserService } from '../../_services';
import { Folder, File, User } from '../../_models';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  files : File[] ;
  fileToMove : Folder;
  currentUser : User;
  userId : string;
  constructor(private fileService : FileService,
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
    this.fileToMove = JSON.parse(localStorage.getItem("fileToMove"));
    
    if(this.userId){
      this.userService.getUserFiles(this.userId)
        .subscribe(files =>{
            this.files = files;
          },
          error => {
            this.notificationService.showError(error, "Error");
          });
      return;
    }
    if (this.folder!=null)
    {
      this.files = this.folder.files;
    }
    else
    {
      this.fileService.getAll()
      .subscribe(files =>
        this.files = files);
    }
  }
  move() : void {
    if (this.folder!=null)
    {
      this.fileService.moveToFolder(this.folder.id, this.fileToMove.id)
      .subscribe(
        data => {
          localStorage.removeItem("fileToMove");
          window.location.reload();
        },
        error => {
          this.notificationService.showError(error, "Error");
        }
      );
    }
    else
    {
      this.fileService.moveToFolder(null, this.fileToMove.id)
      .subscribe(
        data => {
          localStorage.removeItem("fileToMove");
          window.location.reload();
        },
        error => {
          this.notificationService.showError(error, "Error");
        }
      );
    }
    
  }
}
