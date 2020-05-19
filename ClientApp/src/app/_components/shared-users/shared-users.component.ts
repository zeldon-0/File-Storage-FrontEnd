import { Component, OnInit } from '@angular/core';
import { SharingService, NotificationService } from '../../_services'
import {User} from '../../_models';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shared-users',
  templateUrl: './shared-users.component.html',
  styleUrls: ['./shared-users.component.css']
})
export class SharedUsersComponent implements OnInit {

  users : User[];
  private folderId : string;
  private fileId : string;


  constructor(private sharingService:SharingService,
    private notificationService : NotificationService,
    private router : Router,
    private route : ActivatedRoute) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe(params => {
      this.folderId = params.get('folderId');
    });

    if(!this.folderId)
    {
      this.route.parent.paramMap.subscribe(params => {
        this.fileId = params.get('fileId');
      });
      this.sharingService.getFileUserShares(this.fileId)
      .subscribe(users => 
        {
          this.users = users;
        },
        error =>{
          this.notificationService.showError(error[0], "Error");
          this.router.navigate(['/']);
        });
    }
    else{
      this.sharingService.getFolderUserShares(this.folderId)
      .subscribe(users => 
        {
          this.users = users;
        },
        error =>{
          this.notificationService.showError(error[0], "Error");
          this.router.navigate(['/']);
        });
    }
  }

}

