import { Component, OnInit, Input } from '@angular/core';
import { FolderService, NotificationService } from '../../_services';
import { Folder } from '../../_models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.css']
})
export class FolderListComponent implements OnInit {
  folders : Folder[] ;
  folderToMove : Folder;
  private sub : Subscription = new Subscription();

  constructor(private folderService : FolderService,
    private notificationService : NotificationService) { }

  @Input() folder : Folder;

  ngOnInit() {
    if (this.folder!=null)
    {
      this.folders = this.folder.subfolders;
    }
    else
    {
    this.sub = this.folderService.getAll().subscribe(folders =>
      this.folders = folders);
    }
    this.folderToMove = JSON.parse(localStorage.getItem("folderToMove"));
  }
  move() : void {
    if (this.folder!=null)
    {
      this.sub = this.folderService.moveToFolder(this.folder.id, this.folderToMove.id)
      .subscribe(
        data => {
          localStorage.removeItem("folderToMove");
          window.location.reload();
        },
        error => {
          this.notificationService.showError(error[0], "Error");
        }
      );
    }
    else
    {
      this.sub = this.folderService.moveToFolder(null, this.folderToMove.id)
      .subscribe(
        data => {
          localStorage.removeItem("folderToMove");
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
