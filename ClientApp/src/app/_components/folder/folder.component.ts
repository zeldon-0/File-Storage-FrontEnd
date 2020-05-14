import { Component, OnInit } from '@angular/core';
import { FolderService, AuthenticationService, AlertService } from '../../_services';
import { first } from 'rxjs/operators';


import { Folder, User } from '../../_models';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  private folder : Folder;
  private sub : Subscription = new Subscription();
  private folderId : string;
  private loading = false;
  private error:string;
  currentUser: User;
  constructor(private folderService : FolderService,
    private route : ActivatedRoute,
    private router : Router,
    private authenticationService: AuthenticationService,
    private alertService : AlertService
    ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x); 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.folderId = params.get('folderId');
    });
    
    this.loading = true;

    this.sub = this.folderService.getById(this.folderId)
      .subscribe(folder => 
        {this.folder = folder},
        error =>{
            console.log(error);
            this.error = error;
        });
  }
  ngOnDestroy() : void {
    this.sub.unsubscribe();
  }

}
