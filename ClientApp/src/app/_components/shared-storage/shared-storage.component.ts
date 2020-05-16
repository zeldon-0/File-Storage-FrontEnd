import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../_models';


@Component({ templateUrl: 'shared-storage.component.html',

            styleUrls: ['./shared-storage.component.css'] })


export class SharedStorageComponent implements OnInit, OnDestroy {
    currentUser: User;

    constructor(

    ) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {

    }

}