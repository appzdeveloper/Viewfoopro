import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { APP_PROVIDERS } from './app.providers';
import { User } from './shared/interfaces';
import myGlobals = require('./globals');


@Component({
    moduleId: module.id,
    selector: 'app-container',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [APP_PROVIDERS]
})
export class AppComponent {

    loginUser: User;
    heroImageUrl = 'images/hero.png';

    constructor(private router: Router) {

        this.loginUser = JSON.parse(window.localStorage['user'] || '{}');
        if (!this.loginUser.id) {
            //this.router.navigate(['login']);
            
        } else {
            myGlobals.LoginUser = this.loginUser;
        }
    }


}


//Dynamic loading (old router but coming to new router)
// { 
//   path: '/customers/:id/...', 
//   name: 'Customer',  
//   loader: () => window['System'].import('app/+customer')
//                 .then((module: any) => module.CustomerComponent) 
// }
