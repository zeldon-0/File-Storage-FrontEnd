import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from './_guards';
import { AdminGuard } from './_guards';

import { OwnStorageComponent} from './_components';
import { LoginComponent } from './_components';
import { RegisterComponent } from './_components';
import { FolderComponent } from './_components';
import { SharedUsersComponent } from './_components';
import { FolderFormComponent} from './_components';
import { FolderEditComponent} from './_components';
import { SharedStorageComponent} from './_components';
import { FileFormComponent} from './_components';
import { FileComponent} from './_components';
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
        ], canActivate: [AuthGuard] },
    { path: 'files/:fileId', component: FileComponent, 
        children: [
            {
                path: 'sharingInfo', 
                component: SharedUsersComponent
            }
        ], canActivate: [AuthGuard] },
    {path : 'newFolder', component: FolderFormComponent, canActivate: [AuthGuard]},
    {path : 'newFolder/:folderId', component: FolderFormComponent, canActivate: [AuthGuard]},
    {path : 'newFile', component: FileFormComponent, canActivate: [AuthGuard]},
    {path : 'newFile/:folderId', component: FileFormComponent, canActivate: [AuthGuard]},
    {path : 'editFolder/:folderId', component: FolderEditComponent, canActivate: [AuthGuard]},
    {path : 'editFile/:fileId', component: FileEditComponent, canActivate: [AuthGuard]},
    {path : 'editAccount', component: AccountEditComponent, canActivate: [AuthGuard]},
    {path : 'editAccount/:userId', component: AccountEditComponent, canActivate: [AuthGuard]},
    {path : 'changePassword', component: PasswordEditComponent, canActivate: [AuthGuard]},
    {path : 'users', component: UserListComponent, canActivate: [AuthGuard, AdminGuard]},
    {path : 'users/:userId', component: AccountComponent, canActivate: [AuthGuard, AdminGuard]},
    {path : 'shared', component: SharedStorageComponent, canActivate: [AuthGuard]},
    {path : 'account', component: AccountComponent, canActivate: [AuthGuard]},
    {path : 'userStorage/:userId', component: OwnStorageComponent, canActivate: [AuthGuard, AdminGuard]},
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);