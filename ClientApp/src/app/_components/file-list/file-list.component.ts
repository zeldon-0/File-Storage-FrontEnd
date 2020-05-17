import { Component, OnInit, Input } from '@angular/core';
import { FileService, NotificationService } from '../../_services';
import { Folder, File, User } from '../../_models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  files : File[] ;
  fileToMove : Folder;
  currentUser : User;
  private sub : Subscription = new Subscription();

  constructor(private fileService : FileService,
    private notificationService : NotificationService) { }

  @Input() folder : Folder;

  ngOnInit() {
    if (this.folder!=null)
    {
      this.files = this.folder.files;
    }
    else
    {
    this.sub = this.fileService.getAll()
    .subscribe(files =>
      this.files = files);
    }
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.fileToMove = JSON.parse(localStorage.getItem("fileToMove"));
    console.log(this.currentUser);
  }
  move() : void {
    if (this.folder!=null)
    {
      this.sub = this.fileService.moveToFolder(this.folder.id, this.fileToMove.id)
      .subscribe(
        data => {
          localStorage.removeItem("fileToMove");
          window.location.reload();
        },
        error => {
          this.notificationService.showError(error[0], "Error");
        }
      );
    }
    else
    {
      this.sub = this.fileService.moveToFolder(null, this.fileToMove.id)
      .subscribe(
        data => {
          localStorage.removeItem("fileToMove");
          window.location.reload();
        },
        error => {
          this.notificationService.showError(error[0], "Error");
          console.log(error);
        }
      );
    }
    

  }

  ngOnDestroy() : void {
    this.sub.unsubscribe();
  }


}
