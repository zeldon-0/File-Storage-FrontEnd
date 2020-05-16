import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../_models';


@Component({ templateUrl: 'own-storage.component.html',

            styleUrls: ['./own-storage.component.css'] })


export class OwnStorageComponent implements OnInit, OnDestroy {
    currentUser: User;

    constructor(

    ) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {

    }

}