import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/interfaces';

import myGlobals = require('../globals');
import {CustomValidators} from '../shared/utils/CustomValidators';

import { Viewfoo, Folder } from '../shared/interfaces';
import { SidebarnavComponent } from './sidebar-nav/sidebar_nav.component';
import { TopbarnavComponent } from './topbar-nav/topbar_nav.component';

@Component({
    moduleId: module.id,
    selector: 'publicdashboard',
    templateUrl: 'publicdashboard.component.html',
	directives: [ROUTER_DIRECTIVES, SidebarnavComponent, TopbarnavComponent]
})
export class PublicDashboardComponent implements OnInit {
    subdomain: string;

    folderid: string;

    serviceUrl: string = myGlobals.serviceUrl + '/upload/gallery';
    imageUrl: string = myGlobals.imageUrl + '/upload/gallery';

    public userhomesettings: any = {};

    sub: any;


    folderlist: Folder[] = [];

    ngOnInit() {

    }


    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
        this.folderid = "0";

        console.log("PublicDashboardComponent constructor");
        
        this.sub = this.route.params.subscribe(params => {
            this.subdomain = params['subdomain'];

            this.getUserHomepageSettings();

			this.getfolderlist();

        });


    }

    getUserHomepageSettings() {
        this.authService.userpublichomesettings(this.subdomain)
            .subscribe((result: any) => {

                this.authService.publicViewfooChangeSource.next({
                    action: "publichomepagesetting",
                    data: result.data
                });

				this.userhomesettings = result.data;

                if (this.userhomesettings.disablerightmousebtn == 'true') {
                    // document.onmousedown = function(event) {
                    //     var status="Right Click Disabled";
                    //     if (event.button == 2) {
					// 		alert(status);
					// 		return false;
					// 	}
                    // };
                }

            }, (error: any) => {
                console.log("public homepage setting fail: " + error);
            });
    }

    getfolderlist() {
        this.authService.publicfolderlist(this.subdomain)
            .subscribe((result: any) => {

                if (result.data) {
					//console.log(result.data);
					this.folderlist = result.data;
                }


            }, (error: any) => {
                console.log("folder list fail: " + error);
            });
    }

    onFolderClick(fid: any) {

        this.authService.publicViewfooChangeSource.next({
            action: "onFolderClick",
            data: fid
        });

        this.folderid = fid;
    }



}
