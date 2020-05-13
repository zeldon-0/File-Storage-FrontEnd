import {User} from './user';
import {File} from './file';
export class Folder {
    id : string;
    parentId : string;
    name : string;
    description : string;
    owner : User;
    ownerId : number;
    subfolders : Folder[];
    files : File[];
    shareStatus : number;
    usersWithAccess : User[];
}