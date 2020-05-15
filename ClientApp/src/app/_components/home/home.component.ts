import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../../_models';
import { UserService, AuthenticationService} from '../../_services';

@Component({ templateUrl: 'home.component.html',

            styleUrls: ['./home.component.css'] })


            export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;

    constructor(

    ) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {

    }

}