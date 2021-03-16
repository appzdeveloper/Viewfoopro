import {Component, OnInit, NgZone, Input, Output, ElementRef,
    EventEmitter, Renderer, OnChanges, SimpleChange, ChangeDetectorRef, ViewChild}
from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {CORE_DIRECTIVES} from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { User } from '../../shared/interfaces';
import { AuthService } from '../../shared/services/auth.service';
import { Viewfoo } from '../../shared/interfaces';
import { Container } from '../../shared/interfaces';
import {PaginationComponent} from '../../shared/pagination/pagination.component';
import myGlobals = require('../../globals');
import { CommentModalComponent } from '../../shared/widgets/commentmodal/commentmodal.component';
import { ShareModalComponent } from '../../shared/widgets/sharemodal/sharemodal.component';

@Component({
    moduleId: module.id,
    selector: 'centerlistview',
    templateUrl: 'list.component.html',
    directives: [PaginationComponent, REACTIVE_FORM_DIRECTIVES, CORE_DIRECTIVES,CommentModalComponent,ShareModalComponent]
})
export class ListViewComponent implements OnInit {

	@Input() public viewfoolist: any;
    @Output() private onDelViewfoo: EventEmitter<number> = new EventEmitter();
    viewfoocommentid:string;
    serviceUrl: string = myGlobals.serviceUrl + '/upload/gallery';
    imageUrl: string = myGlobals.imageUrl + '/upload/gallery';
    profileimageUrl:string = myGlobals.imageUrl + '/upload/profiles';
    public isEnable:boolean = true;
    commentaddloading:boolean = false;
    loginUser: any;
    viewfoocomments:any;
    loading: boolean = false;
     
    //share and comment
    currViewfooComment: Viewfoo = {};
    currViewfooShare:Viewfoo = {};
    currViewfooImageShare:Container = {};
    isModelCommentHiddenRegistered: boolean = false;
    isModelShareHiddenRegistered:boolean = false;

    viewfoocommenttext: FormControl = new FormControl("", Validators.required);
    viewfoocomment: FormGroup;
    constructor(private _router: Router, private authService: AuthService,private builder: FormBuilder) {
        this.loginUser = myGlobals.LoginUser;
        
        this.viewfoocomment = builder.group({
           "viewfoocommenttext": this.viewfoocommenttext
        });
    }

    ngOnInit() {
        let formdata = this.viewfoocomment.value;
        console.log(this.viewfoolist);
         window.fbAsyncInit = function () {
		FB.init({
                    appId:"1089726191119563",
                    xfbml: true,
                    version: 'v2.4'
                });
                
            };
         (function(d, s, id) {
             var js, fjs = d.getElementsByTagName(s)[0];
             if (d.getElementById(id)) { return; }
             js = d.createElement(s); js.id = id;
             js.src = "//connect.facebook.net/en_US/sdk.js";
             fjs.parentNode.insertBefore(js, fjs);
         } (document, 'script', 'facebook-jssdk'));
         
            
    }

    gotogallary(viewfooid: any) {
        let link = ['/viewfoodetail', viewfooid];
        this._router.navigate(link);
    }

    onEditViewfoo(viewfooid: any) {
        let link = ['/gallary', viewfooid];
        this._router.navigate(link);
    }

    onDeleteViewfoo(viewfooid: any, viewfooindex) {
        //this.onDelViewfoo.emit(viewfooid);
        this.loading = true;
        this.authService.viewfoodelete(viewfooid)
			.subscribe((result) => {

                this.loading = false;
                this.viewfoolist.splice(viewfooindex, 1);

			}, (error: any) => {
				this.errorMsg = error;
				this.loading = false;

				console.log("viewfoo delete fail: " + error);
			});
    }
    
        //viewfoo share & comment
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

