import { Component, OnInit, Input } from '@angular/core';
import { FolderService } from '../../_services/folder.service';
import { Folder } from '../../_models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.css']
})
export class FolderListComponent implements OnInit {
  private folders : Folder[] ;
  private sub : Subscription = new Subscription();

  constructor(private folderService : FolderService) { }

  @Input() folder : Folder;

  ngOnInit() {
    if (this.folder!=null)
    {
      this.folders = this.folder.subfolders;
    }
    else
    {
    this.sub = this.folderService.getAll().subscribe(folders =>
      this.folders = folders);
    }
  }
  ngOnDestroy() : void {
    this.sub.unsubscribe();
  }


}
