import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import { AuthService } from '../shared/services/auth.service';
import myGlobals = require('../globals');

@Component({
    moduleId: module.id,
    selector: 'emailnotification',
    templateUrl: 'select_template.component.html',
    directives: [ROUTER_DIRECTIVES]

})

export class SelectTemplateComponent implements OnInit {

    constructor(private _router: Router, private authService: AuthService) {
        this.loginUser = myGlobals.LoginUser;
    }
    ngOnInit() {


    }

    fullscreen() {
        //this._router.navigate(['/fullscreen_template']);
        this.containertype = "image";
        this.createViewfoo();
    }
    gallary() {
        //this._router.navigate(['/gallary']);
        this.containertype = "gallery";
        this.createViewfoo();
    }

    landscape() {
//        this._router.navigate(['/landscape']);
        this.containertype = "landscape";
        this.createViewfoo();
    }
    carousel() {

        this.containertype = "carousel";
        this.createViewfoo();
    }
    portrait() {
//        this._router.navigate(['/portrait']);
        this.containertype = "portrait1";
        this.createViewfoo();
    }
    portrait2() {
//        this._router.navigate(['/portrait2']);
        this.containertype = "portrait2";
        this.createViewfoo();
    }
    masonry() {
//        this._router.navigate(['/masonry']);
        this.containertype = "massonary";
        this.createViewfoo();

    }
    square() {
//        this._router.navigate(['/square']);
        this.containertype = "square1";
        this.createViewfoo();
    }
    square2() {
//        this._router.navigate(['/square2']);
        this.containertype = "square2";
        this.createViewfoo();
    }

    createViewfoo() {
        this.authService.viewfoocreate(this.containertype, this.loginUser.id)
            .subscribe((result) => {
                this._router.navigate(['/gallary/' + result.data.id]);
            }, (error: any) => {
                this.errorMsg = error;
                this.loading = false;
                //console.log("viewfoo create fail: " + error);
            });
    }
}
