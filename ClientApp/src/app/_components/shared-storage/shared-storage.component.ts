import { Component, OnInit,} from '@angular/core';
import { User } from '../../_models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({ templateUrl: 'shared-storage.component.html',

            styleUrls: ['./shared-storage.component.css'] })


export class SharedStorageComponent implements OnInit {
    currentUser: User;

    constructor(
        private router: Router
    ) {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if(this.currentUser == null){
            this.router.navigate(['/login/']);
        }
    }

    ngOnInit() {
    }

}