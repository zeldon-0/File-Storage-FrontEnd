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
  private sub : Subscription = new Subscription();

  constructor(private sharingService : SharingService,
    private notificationService : NotificationService) { }

  ngOnInit() {
    
    this.sub = this.sharingService.getSharedFiles()
    .subscribe(files => {
      this.files = files;
    },
    error => {
      this.notificationService.showError(error,"Error");
    });
    
  }


  ngOnDestroy() : void {
    this.sub.unsubscribe();
  }

}
