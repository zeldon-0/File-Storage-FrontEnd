import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models';


@Component({ templateUrl: 'own-storage.component.html',

            styleUrls: ['./own-storage.component.css'] })


export class OwnStorageComponent implements OnInit{
    userId: string;
    private currentUser: User;
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if(this.currentUser == null){
            this.router.navigate(['/login/']);
        }
        this.route.paramMap.subscribe(params => {
            this.userId = params.get('userId');
        });
    }

    ngOnInit() {

        
    }


}