import { Component, OnInit } from '@angular/core';
import { FileService, SharingService, NotificationService} from '../../_services';

import { Folder, File, User } from '../../_models';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  file : File;
  private fileId : string;
  error:string;
  currentUser: User;
  url : string;
  constructor(private fileService : FileService,
    private route : ActivatedRoute,
    private router : Router,
    private notificationService : NotificationService,
    private sharingService : SharingService,
    public datepipe: DatePipe

    ) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.url = this.router.url;
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if(this.currentUser == null){
        this.router.navigate(['/login/']);
      }

    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.fileId = params.get('fileId');
    });



    this.fileService.getById(this.fileId)
      .subscribe(file => 
        {
          this.file = file;
        },
        error =>{
          this.notificationService.showError(error, "Error");
          this.router.navigate(['/']);
        });
  }


  share() : void {
    this.sharingService.makeFileShareable(this.fileId)
      .subscribe(
        obj =>{window.location.reload()},
        error => {
          this.notificationService.showError(error[0], "Error");
        });
        
  }

  unShare() : void {
    this.sharingService.makeFileUnshareable(this.fileId)
    .subscribe(
      obj =>{window.location.reload()},
      error => {
        this.notificationService.showError(error, "Error");
      });
  }
  copy() : void {
    this.fileService.copy(this.fileId)
    .subscribe(
      obj =>{
        this.notificationService.showSuccess("Successfully copied the file", "Success");
      },
      error => {
        this.notificationService.showError(error, "Error");
      });
  }
  delete() : void {
    this.fileService.delete(this.fileId)
    .subscribe(
      obj =>{
        if (this.file.folderId)
        {
          this.router.navigate(['/folders/', this.file.folderId]);
        }
        else
        {
          this.router.navigate(['/']);
        }
      },
      error => {
        this.notificationService.showError(error, "Error");
      });
  }
  move() : void {
    if (localStorage.getItem("fileToMove"))
    {
      localStorage.removeItem("fileToMove");
      this.notificationService.showWarning("Replaced the file to move with the current one.", "Warning");
    }
    localStorage.setItem("fileToMove", JSON.stringify(this.file));
  }

  edit() : void {
    this.router.navigate(['/editFile/', this.file.id]);
  }

}
