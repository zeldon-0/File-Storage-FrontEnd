import { Component, OnInit } from '@angular/core';
import { FolderService } from '../../_services/folder.service';
import { Folder } from '../../_models';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  private folder : Folder;
  private sub : Subscription = new Subscription();
  private folderId : string;

  constructor(private folderService : FolderService,
    private route : ActivatedRoute,
    private router : Router) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.folderId = params.get('folderId');
    });

    this.sub = this.folderService.getById(this.folderId)
      .subscribe(folder => this.folder = folder);
  }
  ngOnDestroy() : void {
    this.sub.unsubscribe();
  }

}
