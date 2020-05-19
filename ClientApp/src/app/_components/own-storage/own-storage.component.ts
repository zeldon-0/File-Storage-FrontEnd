import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({ templateUrl: 'own-storage.component.html',

            styleUrls: ['./own-storage.component.css'] })


export class OwnStorageComponent implements OnInit{
    userId: string;

    constructor(
        private route: ActivatedRoute
    ) {
        this.route.paramMap.subscribe(params => {
            this.userId = params.get('userId');
        });
    }

    ngOnInit() {

        
    }


}