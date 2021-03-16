import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import {TopNavComponent} from '../topnav/topnav.component';
import { User } from './shared/interfaces';
import myGlobals = require('../globals');

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    //encapsulation: ViewEncapsulation.None,
    directives: [ROUTER_DIRECTIVES, TopNavComponent] //
})
export class DashboardComponent implements OnInit {

    loginUser: User;
    istrial:boolean=false;
    constructor(private router: Router) {
        this.loginUser = JSON.parse(window.localStorage['user'] || '{}');
        if (!this.loginUser.id) {
            this.router.navigate(['/login']);
        }
        else {
            this.istrial = false;
            myGlobals.LoginUser = this.loginUser;
        }
    }

    ngOnInit() {
          myGlobals.LoginUser = this.loginUser;
        let today = new Date();
        let subscribeenddate = new Date(this.loginUser.subscriptionenddate);
      
        if (subscribeenddate < today) {
            this.day = 0;
            myGlobals.LoginUser = this.loginUser;
            this.istrial = true;
           
            this.router.navigate(['/trialbilling']);
        }
        else {
            this.istrial = false;
            myGlobals.LoginUser = this.loginUser;
            let diff = (subscribeenddate) - (today);
            this.day = Math.round(diff / 86400000);
        }

    }
}
