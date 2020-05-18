import { Routes, RouterModule } from '@angular/router';

import { OwnStorageComponent} from './_components';
import { LoginComponent } from './_components';
import { RegisterComponent } from './_components';
import { FolderComponent } from './_components';
import { SharedUsersComponent } from './_components';
import { AuthGuard } from './_guards';
import {FolderFormComponent} from './_components';
import {FolderEditComponent} from './_components';
import {SharedStorageComponent} from './_components';
import {FileFormComponent} from './_components';
import {FileComponent} from './_components';
import { FileEditComponent } from './_components';
import { AccountComponent } from './_components';
import { AccountEditComponent } from './_components';
import { PasswordEditComponent} from './_components';
import { UserListComponent} from './_components';

const appRoutes: Routes = [
    { path: '', component: OwnStorageComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'folders/:folderId', component: FolderComponent, 
        children: [
            {
                path: 'sharingInfo', 
                component: SharedUsersComponent
            }
        ] },
    { path: 'files/:fileId', component: FileComponent, 
        children: [
            {
                path: 'sharingInfo', 
                component: SharedUsersComponent
            }
        ] },
    {path : 'newFolder', component: FolderFormComponent},
    {path : 'newFolder/:folderId', component: FolderFormComponent},
    {path : 'newFile', component: FileFormComponent},
    {path : 'newFile/:folderId', component: FileFormComponent},
    {path : 'editFolder/:folderId', component: FolderEditComponent},
    {path : 'editFile/:fileId', component: FileEditComponent},
    {path : 'editAccount', component: AccountEditComponent},
    {path : 'editAccount/:userId', component: AccountEditComponent},
    {path : 'changePassword', component: PasswordEditComponent},
    {path : 'users', component: UserListComponent},
    {path : 'users/:userId', component: AccountComponent},
    {path : 'shared', component: SharedStorageComponent},
    {path : 'account', component: AccountComponent},
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);