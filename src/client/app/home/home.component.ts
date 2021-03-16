import {Component, OnInit} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import { User } from '../../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { Viewfoo } from '../shared/interfaces';
import { Container } from '../shared/interfaces';
import myGlobals = require('../globals');
import { GallaryViewComponent } from '../home/center-gallary-view/gallaryview.component';
import { ListViewComponent } from '../home/center-list-view/list.component';
import { TileViewComponent } from '../home/center-tile-view/tileview.component';

import { InfiniteScroll } from 'angular2-infinite-scroll/angular2-infinite-scroll';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html',
    directives: [GallaryViewComponent, ListViewComponent, TileViewComponent, InfiniteScroll]
})
export class HomeComponent implements OnInit {
    loading: boolean = false;

    constructor(private _router: Router, private authService: AuthService) {

    }

    viewfoolist: Viewfoo[] = [];
    username: string;

    isTile: boolean = true;
    isListing: boolean = false;
    isGallary: boolean = false;

    loginUser: any;
    
    viewfooTypeText: string = "View all ViewFoos";

    perpage: number = 20;
    pageno: number = 1;

    viewfootype: string = "all";

    totalcount: number = 0;

    viewfooloading: boolean = true;

    constructor(private router: Router) {
        this.loginUser = JSON.parse(window.localStorage['user'] || '{}');
    }

    ngOnInit() {
        let today = new Date();
        this.loginUser = myGlobals.LoginUser;
        let subscribeenddate = new Date(this.loginUser.subscriptionenddate);
        if (this.loginUser) {
            this.username = this.loginUser.firstname + " " + this.loginUser.lastname;

            if (subscribeenddate <= today) {
                myGlobals.LoginUser = this.loginUser;
                this._router.navigate(['/trialbilling']);
            }
            else {
                this.loading = true;
                this.loadviewfoo();
            }
        }
    }

    onClickViewfooType(vType: string) {
        if (vType == "all") {
            this.viewfooTypeText = "View all ViewFoos"
        } else if (vType == "public") {
            this.viewfooTypeText = "View All Public"
        } else if (vType == "private") {
            this.viewfooTypeText = "View All Private"
        } else if (vType == "draft") {
            this.viewfooTypeText = "View All Draft"
        }
        this.viewfootype = vType;
        this.pageno = 1;
        this.loadviewfoo();
    }

    loadviewfoo() {
        this.viewfooloading = true;
        this.authService.allviewfoolist(this.viewfootype, this.loginUser.id, this.perpage, this.pageno)
            .subscribe((result) => {

                // console.log("after page change");
                // console.log(result);

                myGlobals.allViewfoo = result.data.viewfoolist;
                this.totalcount = result.data.totalcount;

                if (this.pageno == 1) {
                    this.viewfoolist = [];
                }
                for (var i = 0; i < myGlobals.allViewfoo.length; i++) {
                    if (!myGlobals.allViewfoo[i].coverimage) {
                        myGlobals.allViewfoo[i].coverimage = "";
                    }
                    this.viewfoolist.push(myGlobals.allViewfoo[i]);
                }
                // console.log("viewfoolist");
                // console.log(this.viewfoolist);

                this.viewfooloading = false;

            }, (error: any) => {
                this.viewfooloading = false;
                console.log("viewfoo list fail: " + error);
            });

    }

    loadmoreviewfoo() {
        if (this.totalcount > this.viewfoolist.length) {
            this.pageno++;
            this.loadviewfoo();
        }
        //$("html, body").animate({ scrollTop: $(document).height() }, 1000);
    }


    addviewfoo() {
        this._router.navigate(['/addviewfoo']);
    }

    selecttemplate() {
        this._router.navigate(['/select_template']);
    }

    gotogallary(id) {
        let link = ['/gallary', id];
        this._router.navigate(link);
    }

    settemplateview(val) {
        if (val == 'masonry') {
            this.isTile = true;
            this.isListing = false;
            this.isGallary = false;
        }
        else if (val == 'gallary') {
            this.isTile = false;
            this.isListing = false;
            this.isGallary = true;
        }
        else if (val == 'tile') {
            this.isTile = false;
            this.isListing = true;
            this.isGallary = false;
        }
    }

    onDelViewfooHome($event) {
        console.log("onDelViewfooHome : " + $event);
        this.authService.viewfoodelete($event)
            .subscribe((result) => {

                if (result) {
                    console.log(result);
                    this.router.navigate(['/']);
                }
            }, (error: any) => {
                this.errorMsg = error;
                this.loading = false;

                console.log("viewfoo delete fail: " + error);
            });
    }

    /* InfiniteScroll Event */
    onScroll() {
        this.loadmoreviewfoo();
    }
}
