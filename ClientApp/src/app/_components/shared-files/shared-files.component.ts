import { Component, OnInit } from '@angular/core';
import { SharingService, NotificationService } from '../../_services';
import { File } from '../../_models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shared-files',
  templateUrl: './shared-files.component.html',
  styleUrls: ['./shared-files.component.css']
})
export class SharedFilesComponent implements OnInit {
  files : File[] ;

  constructor(private sharingService : SharingService,
    private notificationService : NotificationService) { }

  ngOnInit() {
    
    this.sharingService.getSharedFiles()
    .subscribe(files => {
      this.files = files;
    },
    error => {
      this.notificationService.showError(error,"Error");
    });
    
  }

}
