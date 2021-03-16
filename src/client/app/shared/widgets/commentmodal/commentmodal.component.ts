
import {Component, OnInit, NgZone, Input, Output, ElementRef,
    EventEmitter, Renderer, OnChanges, SimpleChange, ChangeDetectorRef, ViewChild}
from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { User, Viewfoo, Container } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import {CustomValidators} from '../../utils/CustomValidators';
import myGlobals = require('../../../globals');
@Component({
    moduleId: module.id,
    selector: 'commentmodal',
    templateUrl: 'commentmodal.component.html',
    directives: [REACTIVE_FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class CommentModalComponent implements OnInit {

    //@ViewChild('imgblock') imgblock: ElementRef;

    //@Input() public currViewfoo: string;
    viewfoocommentid: string;
    //@Input() public commenttype: string;

    imageUrl: string = myGlobals.imageUrl + '/upload/gallery';
    profileimageUrl: string = myGlobals.imageUrl + '/upload/profiles';
    public isEnable: boolean = true;
    commentaddloading: boolean = false;
    viewfoocomments: any;

    loading: boolean = false;

    viewfoocommenttext: FormControl = new FormControl("", Validators.required);
    viewfoocommentname: FormControl = new FormControl("", Validators.required);
    viewfoocommentemail: FormControl = new FormControl("", Validators.compose([Validators.required, CustomValidators.emailValidator]));

    viewfoocomment: FormGroup;
    //@Output() private onContainerDelete: EventEmitter<string> = new EventEmitter();

    serviceUrl: string = myGlobals.serviceUrl;
    imageUrl: string = myGlobals.imageUrl + '/upload/gallery/';

    loginUser: any;
    offlineuser: any;

    constructor(zone: NgZone, private _changeDetectionRef: ChangeDetectorRef,
        public elementRef: ElementRef,
        private authService: AuthService, private builder: FormBuilder) {

        this.viewfoocomment = builder.group({
			"viewfoocommenttext": this.viewfoocommenttext,
			"viewfoocommentname": this.viewfoocommentname,
			"viewfoocommentemail": this.viewfoocommentemail
        });

        this.loginUser = myGlobals.LoginUser;

        if(window.localStorage['offlineuser']) {
            this.offlineuser = JSON.parse(window.localStorage['offlineuser']);
        }


    }
    @Input() private get commenttype(): any {
        return this._commenttype;
    }
    public set commenttype(v: any) {
        this._commenttype = v;
        //alert("Commenttype set : "+v);
        //this.getComment(this._currViewfoo);
    }

	@Input() private get currViewfoo(): any {
        return this._currViewfoo;
    }
    public set currViewfoo(v: any) {
        this._currViewfoo = v;
        if (this._currViewfoo.id != undefined) {
            this.getComment(this._currViewfoo, '');
        }
    }

    @Input() private get currImage(): any {
        return this._currImage;
    }
    public set currImage(v: any) {
        this._currImage = v;
        if (this._currImage.id != undefined) {
            this.getComment('', this._currImage);
        }
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    getComment(currentviewfoo: any, currentimage: any) {

        if(this.loginUser) {
            this.viewfoocommentname.updateValue(this.loginUser.firstname+" "+this.loginUser.lastname);

            this.viewfoocommentemail.updateValue(this.loginUser.email);
        } else if(this.offlineuser) {
            this.viewfoocommentname.updateValue(this.offlineuser.username);
            this.viewfoocommentemail.updateValue(this.offlineuser.email);
        }
        //

		this.viewfoocomments = [];

		if (currentviewfoo.id != undefined) {
			let viewfooid = currentviewfoo.id;

		} else {
			let viewfooid = '';
		}

		if (currentimage.id != undefined) {
			let viewfooid = currentimage.viewfooid;
			let imageid = currentimage.id;
		} else {
			let imageid = '';
		}



		this.loading = true;
		this.authService.viewfoogetcomment(viewfooid, imageid)
			.subscribe((result) => {
				console.log(currentviewfoo.id);
				this.viewfoocomments = result.data;
				this.loading = false;
			}, (error: any) => {
				this.errorMsg = error;
				console.log("viewfoo get fail: " + error);
				this.loading = false;
			});

    }

    doComment() {

        var offlineuser = {
            username: this.viewfoocommentname.value,
            email: this.viewfoocommentemail.value
        }
        window.localStorage['offlineuser'] = JSON.stringify(offlineuser);

        let currViewfoo = this.currViewfoo;
        let currImage = this.currImage;

        this.commentaddloading = true;

        //this.loading = true;

        let commentdata = this.viewfoocommenttext.value;
        let commentname = this.viewfoocommentname.value;
        let commentemail = this.viewfoocommentemail.value;

        let userid = this.loginUser != undefined ? this.loginUser.id : '';

        console.log(this.currViewfoo);
        console.log(this.currImage);

        if (currViewfoo != undefined) {
            let viewfooid = currViewfoo.id;
        } else {
            let viewfooid = '';
        }

        if (currImage != undefined) {
            if (currImage.id != undefined) {
                let viewfooid = currImage.viewfooid;
                let imageid = currImage.id;
            }
        } else {
            let imageid = '';
        }

        console.log(viewfooid);
        console.log(imageid);
        this.authService.viewfooaddcomment('comment', userid, commentdata, commentname, commentemail, viewfooid, imageid)
			.subscribe((result) => {
				this.authService.viewfoogetcomment(viewfooid, imageid)
					.subscribe((result1) => {
						if (result1) {
							this.viewfoocomments = result1.data;
							//this.resetform();
                            this.viewfoocommenttext.updateValue("");
                            //this.viewfoocomment.reset();
						}
					}, (error: any) => {
						this.errorMsg = error;
						console.log("viewfoo get fail: " + error);
					});
				this.commentaddloading = false;
				//this.loading = false;
			}, (error: any) => {
				console.log("viewfoo add fail: " + error);
				this.commentaddloading = false;
				//this.loading = false;
			});

    }

    resetform() {
		this.viewfoocomment = this.builder.group({
			"viewfoocommenttext": '',
			"viewfoocommentname": this.viewfoocommentname,
			"viewfoocommentemail": this.viewfoocommentemail
        });

    }
}
