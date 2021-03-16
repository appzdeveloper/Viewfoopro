import {Component, OnInit, Injectable} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';


import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/interfaces';
import myGlobals = require('../globals');


@Component({
    moduleId: module.id,
    selector: 'useractivation',
    templateUrl: 'useractivation.component.html'


})
@Injectable()
export class UserActivationComponent implements OnInit {
    private activelink: string;
    message: string;
    //private router: Router, current: RouteSegment, 
    constructor(private route: ActivatedRoute,
        private router: Router, private authService: AuthService) {

        this.sub = this.route.params.subscribe(params => {
            console.log(params);
            let id = params['id']; // (+) converts string 'id' to a number

            //console.log("useractivation id > " + id);
            this.authService.useractivation(id)
                .subscribe((result) => {
                    //console.log("useractivation result > " + result);
                    this.message = result.data;
                    this.loading = false;
                },
                (error: any) => {
                    this.message = error;
                    this.loading = false;                    
                });
        });

    }


    //    routerOnActivate(current: RouteSegment, prev?: RouteSegment,
    //        currTree?: RouteTree, prevTree?: RouteT) {
    //
    //
    //    }

    ngOnInit() {


    }

}