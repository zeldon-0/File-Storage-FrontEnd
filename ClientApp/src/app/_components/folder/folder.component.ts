import { Component, OnInit } from '@angular/core';
import { FolderService, SharingService, NotificationService } from '../../_services';

import { Folder, User } from '../../_models';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  folder : Folder;
  private sub : Subscription = new Subscription();
  private folderId : string;
  private loading = false;
  error:string;
  currentUser: User;
  constructor(private folderService : FolderService,
    private route : ActivatedRoute,
    private router : Router,
    private notificationService : NotificationService,
    private sharingService : SharingService
    ) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.folderId = params.get('folderId');
    });

    this.sub = this.folderService.getById(this.folderId)
      .subscribe(folder => 
        {
          this.folder = folder
        },
        error =>{
          this.notificationService.showError(error, "Error");
          this.router.navigate(['/']);
        });
  }
  ngOnDestroy() : void {
    this.sub.unsubscribe();
  }

  share() : void {
    this.sub = this.sharingService.makeFolderShareable(this.folderId)
      .subscribe(
        obj =>{window.location.reload()},
        error => {
          this.notificationService.showError(error[0], "Error");
        });
        
  }

  unShare() : void {
    this.sharingService.makeFolderUnshareable(this.folderId)
    .subscribe(
      obj =>{window.location.reload()},
      error => {
        this.notificationService.showError(error, "Error");
      });
  }
}
