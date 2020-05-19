import { Component, OnInit,} from '@angular/core';
import { User } from '../../_models';


@Component({ templateUrl: 'shared-storage.component.html',

            styleUrls: ['./shared-storage.component.css'] })


export class SharedStorageComponent implements OnInit {
    currentUser: User;

    constructor(

    ) {
    }

    ngOnInit() {
    }

}