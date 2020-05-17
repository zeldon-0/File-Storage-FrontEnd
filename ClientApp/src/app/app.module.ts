import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend


import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { FolderFormComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { OwnStorageComponent } from './_components';
import { LoginComponent } from './_components';
import { RegisterComponent } from './_components';
import { FolderListComponent } from './_components';
import { FolderComponent } from './_components';
import { FolderEditComponent } from './_components';
import { SharedUsersComponent } from './_components';
import { SharingFormComponent } from './_components';
import { SharedFoldersComponent } from './_components';
import { SharedStorageComponent } from './_components';
import { FileListComponent } from './_components';
import { FileFormComponent } from './_components';
import { FileComponent } from './_components';
import { FileEditComponent } from './_components';
import { SharedFilesComponent } from './_components';
import { AccountComponent } from './_components';
import { AccountEditComponent } from './_components';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        routing
    ],
    declarations: [
        AppComponent,
        OwnStorageComponent,
        LoginComponent,
        RegisterComponent,
        FolderListComponent,
        FolderComponent,
        SharedUsersComponent,
        SharingFormComponent,
        FolderFormComponent,
        FolderEditComponent,
        SharedFoldersComponent,
        SharedStorageComponent,
        FileListComponent,
        FileFormComponent,
        FileComponent,
        FileEditComponent,
        SharedFilesComponent,
        AccountComponent,
        AccountEditComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    ],
    bootstrap: [AppComponent]
})

export class AppModule { }


