import { Component, OnInit } from '@angular/core';
import { FolderService, SharingService, NotificationService, AuthenticationService } from '../../_services';

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
  url : string;
  constructor(private folderService : FolderService,
    private route : ActivatedRoute,
    private router : Router,
    private notificationService : NotificationService,
    private sharingService : SharingService,
    private authenticationService : AuthenticationService

    ) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.url = this.router.url;
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.folderId = params.get('folderId');
    });



    this.sub = this.folderService.getById(this.folderId)
      .subscribe(folder => 
        {
          this.folder = folder;
        },
        error =>{
          this.notificationService.showError(error, "Error");
          this.router.navigate(['/']);
        });
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
    this.sub = this.sharingService.makeFolderUnshareable(this.folderId)
    .subscribe(
      obj =>{window.location.reload()},
      error => {
        this.notificationService.showError(error, "Error");
      });
  }
  copy() : void {
    this.sub = this.folderService.copy(this.folderId)
    .subscribe(
      obj =>{
        this.notificationService.showSuccess("Successfully copied the folder", "Success");
      },
      error => {
        this.notificationService.showError(error, "Error");
      });
  }
  delete() : void {
    this.sub = this.folderService.delete(this.folderId)
    .subscribe(
      obj =>{
        this.router.navigate(['/folders/', this.folder.parentId])
      },
      error => {
        this.notificationService.showError(error, "Error");
      });
  }
  move() : void {
    if (localStorage.getItem("folderToMove"))
    {
      localStorage.removeItem("folderToMove");
      this.notificationService.showWarning("Replaced the folder to move with the current one.", "Warning");
    }
    localStorage.setItem("folderToMove", JSON.stringify(this.folder));
  }


  ngOnDestroy() : void {
    this.sub.unsubscribe();
  }
}
