import { Component, OnInit} from '@angular/core';
import { File } from '../../_models';
import { FileService, NotificationService } from '../../_services'
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-file-edit',
  templateUrl: './file-edit.component.html',
  styleUrls: ['./file-edit.component.css']
})
export class FileEditComponent implements OnInit {
  editForm: FormGroup;
  private fileId: string;
  file : File; 
  constructor(private fileService : FileService,
    private formBuilder: FormBuilder,
    private notificationService : NotificationService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.fileId = params.get('fileId');
    });
    this.fileService.getById(this.fileId)
      .subscribe(
        file => {
          this.file = file;
          this.editForm = this.formBuilder.group({
            name: [this.file.name],
            description: [this.file.description],
            url: [this.file.url]
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

    const file = this.file;
    file.name = this.editForm.value.name;
    file.description = this.editForm.value.description;
    file.url = this.editForm.value.url;

    this.fileService.update(file)
    .subscribe(
        data => {
          this.router.navigate([`../files/${this.fileId}`]);;
        },
        error => {
            this.notificationService.showError(error, "Error")
        });

  }

}
