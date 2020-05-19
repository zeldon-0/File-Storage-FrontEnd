import { Component, OnInit, Input } from '@angular/core';
import {File} from '../../_models';
import { FileService, NotificationService } from '../../_services'
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css']
})
export class FileFormComponent implements OnInit {
  fileForm: FormGroup;
  private folderId: string; 
  constructor(private fileService : FileService,
    private formBuilder: FormBuilder,
    private notificationService : NotificationService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.folderId = params.get('folderId');
    });

    this.fileForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required]
  });
  }

  onSubmit() {
  
    if (this.fileForm.invalid) {
        return;
    }

    const file = new File();
    file.name = this.fileForm.value.name;
    file.description = this.fileForm.value.description;
    file.url = this.fileForm.value.url;
    
    if (this.folderId)
    {
      this.fileService.postAtFolder(this.folderId, file)
      .subscribe(
          data => {
            this.router.navigate([`../files/${data.id}`]);;
          },
          error => {
              this.notificationService.showError(error, "Error")
          });
    }
    else{
      this.fileService.postAtRoot(file)
            .subscribe(
                data => {
                  this.router.navigate([`../files/${data.id}`]);;
                },
                error => {
                    this.notificationService.showError(error, "Error")
                });
    }
  }
}
