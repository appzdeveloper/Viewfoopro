
import {Component, OnInit, NgZone, Input, Output, ElementRef,
    EventEmitter, Renderer, OnChanges, SimpleChange, ChangeDetectorRef, ViewChild}
from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {CORE_DIRECTIVES} from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { User, Viewfoo, Container } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import {CustomValidators} from '../../utils/CustomValidators';
import myGlobals = require('../../../globals');
@Component({
    moduleId: module.id,
    selector: 'sharemodal',
    templateUrl: 'sharemodal.component.html',
    directives: [REACTIVE_FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class ShareModalComponent implements OnInit {

    imageUrl: string = myGlobals.imageUrl + '/upload/gallery';
    profileimageUrl: string = myGlobals.imageUrl + '/upload/profiles';

    serviceUrl: string = myGlobals.serviceUrl;
    imageUrl: string = myGlobals.imageUrl + '/upload/gallery/';
    sub:string;
    subdomain:string;
    @Input() private get currViewfoo(): any {
        return this._currViewfoo;
    }
    public set currViewfoo(v: any) {
        this._currViewfoo = v;
    }

    @Input() private get currImage(): any {
        return this._currImage;
    }
    public set currImage(v: any) {
        this._currImage = v;
    }
    
    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
       
   
          
    }
    
    ngOnInit() {
         this.sub = this.router.routerState.parent(this.route).params.subscribe(params => {
            this.subdomain = params['subdomain'];

        });
       
        
        window.fbAsyncInit = function() {
			FB.init({
				appId: '1762042520748053',
				xfbml: true,
				version: 'v2.7'
			});
		};

		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) { return; }
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		} (document, 'script', 'facebook-jssdk'));
		// window.fbAsyncInit = function() {
		// 	FB.init({
		// 		appId: "1089726191119563",
		// 		xfbml: true,
		// 		version: 'v2.4'
		// 	});
        //
		// };
		// (function(d, s, id) {
		// 	var js, fjs = d.getElementsByTagName(s)[0];
		// 	if (d.getElementById(id)) { return; }
		// 	js = d.createElement(s); js.id = id;
		// 	js.src = "//connect.facebook.net/en_US/sdk.js";
		// 	fjs.parentNode.insertBefore(js, fjs);
		// } (document, 'script', 'facebook-jssdk'));

    }

    ngAfterViewInit() {
    }

    socialshare(social: string) {
       
		let social = social;
                let shareUrl = 'http://localhost:5555/users/'+this.subdomain;
                if (!$.isEmptyObject(this.currImage)) {
                    let viewfooid = this.currViewfoo.id;
                    let postdetail = this.currViewfoo.viewfootitle;
                    let img = this.imageUrl + this.currViewfoo.coverimage;
                    let tags = this.currViewfoo.tags;
                }
                if (!$.isEmptyObject(this.currViewfoo)) {
                    let viewfooid = this.currViewfoo.id;
                    let postdetail = this.currViewfoo.viewfootitle;
                    let img = this.imageUrl + this.currViewfoo.coverimage;
                    let tags = this.currViewfoo.tags;
                }
		console.log(this.currImage);
		console.log(this.currViewfoo);

		let width = 550; let height = 450;

		let left = 100;
		let top = 100;
		if (social == "fb") {
			let url = shareUrl + '/' + viewfooid;
            FB.ui(
                {
					method: 'share',
					name: 'viewfoo',
					link: url,
					caption: postdetail,
					message: postdetail,
					picture: img,
					href: shareUrl + '/' + viewfooid
                }, function(response) { });
		} else {
            if (social == "google") {
				let url = 'https://plus.google.com/share?url=' + shareUrl + '/' + viewfooid + '&description=' + postdetail + '&image=' + img;
			} else if (social == "tweeter") {
                                let url = 'https://twitter.com/intent/tweet?text=' + postdetail + '&url=' + shareUrl + '/' + viewfooid + '&hashtags=' + tags;
			} else if (social == "linkedin") {
				let url = '//www.linkedin.com/shareArticle?mini=true&url=' + shareUrl + '/' + viewfooid + '&title=' + postdetail;
			}

            window.open(url, '', 'left=' + left + ' , top=' + top + ', width=' + width + ', height=' + height + ', personalbar=0, toolbar=0, scrollbars=1, resizable=1');
		}
    }

}
