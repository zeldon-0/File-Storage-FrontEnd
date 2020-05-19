import { Component, OnInit } from '@angular/core';
import { SharingService, NotificationService } from '../../_services';
import { Folder } from '../../_models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shared-folders',
  templateUrl: './shared-folders.component.html',
  styleUrls: ['./shared-folders.component.css']
})
export class SharedFoldersComponent implements OnInit {
  folders : Folder[] ;

  constructor(private sharingService : SharingService,
    private notificationService : NotificationService) { }

  ngOnInit() {
    
    this.sharingService.getSharedFolders()
    .subscribe(folders =>{
      this.folders = folders
    },
    error => {
      this.notificationService.showError(error,"Error");
    });
    
  }

}
