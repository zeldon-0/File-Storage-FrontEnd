import { Component, OnInit, Input } from '@angular/core';
import {Folder, File, User} from '../../_models';
import { SharingService, NotificationService } from '../../_services'
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sharing-form',
  templateUrl: './sharing-form.component.html',
  styleUrls: ['./sharing-form.component.css']
})

export class SharingFormComponent implements OnInit {
  folders : Folder[] ;
  sharingForm: FormGroup;
  private currentUser: User;
  constructor(private sharingService : SharingService,
    private formBuilder: FormBuilder,
    private notificationService : NotificationService,
    private router: Router
    ) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if(this.currentUser == null){
          this.router.navigate(['/login/']);
      }
     }

    @Input() folder : Folder;
    @Input() file : File;
  
  ngOnInit() {
    this.sharingForm = this.formBuilder.group({
      userName: ['', Validators.required]
  });
  }

  onSubmit() {
  
    if (this.sharingForm.invalid) {
        return;
    }
    if (this.file != null)
    {
      this.sharingService.shareFile(this.file.id, this.sharingForm.value.userName)
          .subscribe(
              data => {
                this.notificationService.showSuccess(
                  `Successfully shared the file with ${this.sharingForm.value.userName}`, "Success");
              },
              error => {
                  this.notificationService.showError(error, "Error")
              });
    }
    else if (this.folder!= null)
    {
      this.sharingService.shareFolder(this.folder.id, this.sharingForm.value.userName)
      .subscribe(
          data => {
            this.notificationService.showSuccess(
              `Successfully shared the folder with ${this.sharingForm.value.userName}`, "Success");
          },
          error => {
              this.notificationService.showError(error, "Error")
          });
    }
    else
    {
      this.notificationService.showError("Could not get a resource to share.", "Error")
    }
  }

}