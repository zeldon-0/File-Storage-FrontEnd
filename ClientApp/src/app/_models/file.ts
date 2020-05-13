import {User} from './user';
export class File {
    id : string;
    folderId : string;
    name : string;
    description : string;
    url : string;
    owner : User;
    ownerId : number;
    shareStatus : number;
    usersWithAccess : User[];
}