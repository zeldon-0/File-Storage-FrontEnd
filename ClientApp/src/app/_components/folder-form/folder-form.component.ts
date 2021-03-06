import { Component, OnInit, Input } from '@angular/core';
import {Folder, User} from '../../_models';
import { FolderService, NotificationService } from '../../_services'
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder-form',
  templateUrl: './folder-form.component.html',
  styleUrls: ['./folder-form.component.css']
})
export class FolderFormComponent implements OnInit {
  folderForm: FormGroup;
  private folderId: string; 
  private currentUser: User;
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

    this.folderForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
  });
  }

  onSubmit() {
  
    if (this.folderForm.invalid) {
        return;
    }

    const folder = new Folder();
    folder.name = this.folderForm.value.name;
    folder.description = this.folderForm.value.description;
    
    if (this.folderId)
    {
      this.folderService.postSubfolder(this.folderId, folder)
      .subscribe(
          data => {
            this.router.navigate([`../folders/${data.id}`]);;
          },
          error => {
              this.notificationService.showError(error, "Error")
          });
    }
    else{
      this.folderService.postFolder(folder)
            .subscribe(
                data => {
                  this.router.navigate([`../folders/${data.id}`]);;
                },
                error => {
                    this.notificationService.showError(error, "Error")
                });
    }
  }
}
