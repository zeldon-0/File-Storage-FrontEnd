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
  private sub : Subscription = new Subscription();

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
    console.log(this.folderId);

    this.sub = this.sharingService.getFolderUserShares(this.folderId)
    .subscribe(users => 
      {
        this.users = users
      },
      error =>{
        this.notificationService.showError(error[0], "Error");
        this.router.navigate(['/']);
      });
  }
  ngOnDestroy() : void {
        this.sub.unsubscribe();
  }
}

