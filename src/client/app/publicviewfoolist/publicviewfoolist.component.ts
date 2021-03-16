import {Component, OnInit} from '@angular/core';

import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/interfaces';
import { FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import myGlobals = require('../globals');
import { Viewfoo, Folder,Container } from '../shared/interfaces';

import { CommentModalComponent } from '../shared/widgets/commentmodal/commentmodal.component';
import { ShareModalComponent } from '../shared/widgets/sharemodal/sharemodal.component';
import { InfiniteScroll } from 'angular2-infinite-scroll/angular2-infinite-scroll';

@Component({
    moduleId: module.id,
    selector: 'publicviewfoolist',
    templateUrl: 'publicviewfoolist.component.html',
	directives: [ROUTER_DIRECTIVES, InfiniteScroll,CommentModalComponent,ShareModalComponent]
})
export class PublicViewfooListComponent implements OnInit {
    subdomain: string;
    viewfoolist: Viewfoo[] = [];
    folderid: string;

    imageUrl: string = myGlobals.imageUrl + '/upload/gallery';

    public userhomesettings: any = {};

    sub: any;

    isListing: boolean = false;
    isMasonry: boolean = false;
    isGallery: boolean = false;

    perpage: number = 20;
    pageno: number = 1;

    totalcount: number = 0;

    viewfooloading: boolean = false;

    currViewfooComment: Viewfoo = {};
    currViewfooShare:Viewfoo = {};
    currViewfooImageShare:Container = {};
    isModelCommentHiddenRegistered: boolean = false;
    isModelShareHiddenRegistered:boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {

        console.log("PublicViewfooListComponent constructor");
        this.folderid = "0";

        authService.publicViewfooChanged$.subscribe(
            item => {
                //console.log("PublicViewfooListComponent publicViewfooChanged "+JSON.stringify(item));
                if (item.action == "publichomepagesetting") {
                    // this.userhomesettings = item.data;
                    //
                    // if (this.userhomesettings.viewfoodisplay == 'gallery') {
					// 	this.onGallery();
					// } else if (this.userhomesettings.viewfoodisplay == 'tile') {
					// 	this.onListing()
					// } else if (this.userhomesettings.viewfoodisplay == 'masonry') {
					// 	this.onMasonry()
					// }
                } else if (item.action == "onFolderClick") {
                    this.pageno = 1;
                    this.folderid = item.data;

                    this.getPublicViewfoolist();
                }
                //this.refreshImage(item);
            });

        // this.getPublicViewfoolist();
    }

    ngOnInit() {
        this.sub = this.router.routerState.parent(this.route).params.subscribe(params => {
            this.subdomain = params['subdomain'];

            this.getPublicViewfoolist();
            this.getUserHomepageSettings();
        });
    }

    getUserHomepageSettings() {
        this.authService.userpublichomesettings(this.subdomain)
            .subscribe((result: any) => {

                // this.authService.publicViewfooChangeSource.next({
                //     action: "publichomepagesetting",
                //     data: result.data
                // });

				this.userhomesettings = result.data;
                if (this.userhomesettings.viewfoodisplay == 'gallery') {
                    this.onGallery();
                } else if (this.userhomesettings.viewfoodisplay == 'tile') {
                    this.onListing()
                } else if (this.userhomesettings.viewfoodisplay == 'masonry') {
                    this.onMasonry()
                }

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

    onListing() {
        this.isListing = true;
        this.isMasonry = false;
        this.isGallery = false;
    }

    onMasonry() {
        this.isListing = false;
        this.isMasonry = true;
        this.isGallery = false;
    }

    onGallery() {
        this.isListing = false;
        this.isMasonry = false;
        this.isGallery = true;
    }

    loadmoreviewfoo() {
        if (this.totalcount > this.viewfoolist.length) {
            this.pageno++;
			this.getPublicViewfoolist();
		}
	}

    getPublicViewfoolist() {
        console.log("public_viewfoo_list getPublicViewfoolist folderid: "
			+ this.folderid);
        this.viewfooloading = true;
        this.authService.publicviewfoo(this.subdomain, this.folderid, this.perpage, this.pageno)
            .subscribe((result: any) => {
                this.viewfooloading = false;

                this.totalcount = result.data.totalcount;
                if (this.pageno == 1) {
                    this.viewfoolist = [];
                }
                for (var i = 0; i < result.data.viewfoolist.length; i++) {
                    // if(!myGlobals.allViewfoo[i].coverimage) {
                    //     myGlobals.allViewfoo[i].coverimage = "";
                    // }
                    var objViewfoo: Viewfoo = result.data.viewfoolist[i];

                    // if(objViewfoo.thumbcoverimage) {
                    //     objViewfoo.thumbcoverimage = this.imageUrl+"/"+objViewfoo.thumbcoverimage;
                    // }
                    // else if(objViewfoo.coverimage) {
                    //     objViewfoo.thumbcoverimage = this.imageUrl+"/"+objViewfoo.coverimage;
                    // }
                    if(objViewfoo.thumbcoverimage) {
                        objViewfoo.thumbcoverimage = this.imageUrl+"/"+objViewfoo.thumbcoverimage;
                    }
                    if(objViewfoo.coverimage) {
                        objViewfoo.coverimage = this.imageUrl+"/"+objViewfoo.coverimage;
                    }
					this.viewfoolist.push(objViewfoo);
				}
				//this.viewfoolist = result.data[0].viewfoolist;
				//console.log(this.viewfoolist);

            }, (error: any) => {
                console.log("viewfoo list fail: " + error);
            });
    }

    onScroll() {
        this.loadmoreviewfoo();
    }

    onViewfooDetail(viewfooid: string) {
        console.log("onViewfooDetail : "+viewfooid);
        this.router.navigate([viewfooid], {relativeTo: this.route});
        // console.log("onViewfooDetail : "+viewfooid);
        // console.log(this.router);
        //this.router.navigate(["viewfoodetail/" + viewfooid]);
    }

    onViewfooComment(vfl: Viewfoo) {

        this.currViewfooComment = vfl;
        $('#commentphoto_modal').modal('show');
		if (!this.isModelCommentHiddenRegistered) {
                    	this.isModelCommentHiddenRegistered = true;
			$('#commentphoto_modal').on('hidden.bs.modal', function(e) {
				this.currViewfooComment = {};
			});
		}
    }

    onViewfooShare(vfl: Viewfoo) {

        this.currViewfooShare = vfl;
        this.currViewfooImageShare = {};
        $('#SelectPhotoModal').modal('show');
		if (!this.isModelShareHiddenRegistered) {
                    	this.isModelShareHiddenRegistered = true;
			$('#SelectPhotoModal').on('hidden.bs.modal', function(e) {
				this.currViewfooShare = {};
                                this.currViewfooImageShare = {};
			});
		}
    }


}
