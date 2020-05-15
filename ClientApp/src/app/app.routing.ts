import { Routes, RouterModule } from '@angular/router';

import { HomeComponent, NewFolderComponent } from './_components';
import { LoginComponent } from './_components';
import { RegisterComponent } from './_components';
import { FolderComponent } from './_components';
import { SharedUsersComponent } from './_components';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'folders/:folderId', component: FolderComponent, 
        children: [
            {
                path: 'sharingInfo', 
                component: SharedUsersComponent
            }
        ] },
    {path : 'newFolder', component: NewFolderComponent},
    {path : 'newFolder/:folderId', component: NewFolderComponent},
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);