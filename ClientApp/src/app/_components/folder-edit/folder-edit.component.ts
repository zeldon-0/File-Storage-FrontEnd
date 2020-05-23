import { Component, OnInit} from '@angular/core';
import {Folder, User} from '../../_models';
import { FolderService, NotificationService } from '../../_services'
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder-edit',
  templateUrl: './folder-edit.component.html',
  styleUrls: ['./folder-edit.component.css']
})
export class FolderEditComponent implements OnInit {
  editForm: FormGroup;
  private folderId: string;
  folder : Folder; 
  private currentUser : User;
  constructor(private folderService : FolderService,
    private formBuilder: FormBuilder,
    private notificationService : NotificationService,
    private router: Router,
    private route: ActivatedRoute
    ) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if(this.currentUser == null){
        this.router.navigate(['/login/']);
      }  
     }

  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.folderId = params.get('folderId');
    });
    this.folderService.getById(this.folderId)
      .subscribe(
        folder => {
          this.folder = folder;
          this.editForm = this.formBuilder.group({
            name: [this.folder.name],
            description: [this.folder.description]
        });
        },
        error =>
        {
          this.notificationService.showError(error, "Error");
        });

  }

  onSubmit() {
  
    if (this.editForm.invalid) {
        return;
    }

    const folder = this.folder;
    folder.name = this.editForm.value.name;
    folder.description = this.editForm.value.description;

    this.folderService.update(folder)
    .subscribe(
        data => {
          this.router.navigate([`../folders/${this.folderId}`]);;
        },
        error => {
            this.notificationService.showError(error, "Error")
        });

  }
}
