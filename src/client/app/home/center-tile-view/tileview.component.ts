
import {Component, OnInit, NgZone, Input, Output, ElementRef,
    EventEmitter, Renderer, OnChanges, SimpleChange, ChangeDetectorRef, ViewChild}
from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import { User } from '../../shared/interfaces';
import { AuthService } from '../../shared/services/auth.service';
import { Viewfoo } from '../../shared/interfaces';
import { Container } from '../../shared/interfaces';
import {PaginationComponent} from '../../shared/pagination/pagination.component';
import myGlobals = require('../../globals');
import {CustomValidators} from '../../shared/utils/CustomValidators';
import { PasswordProtectModal } from '../../shared/widgets/passwordprotectmodal/passwordprotectmodal.component';
@Component({
    moduleId: module.id,
    selector: 'centertileview',
    templateUrl: 'tileview.component.html',
    directives: [PaginationComponent, REACTIVE_FORM_DIRECTIVES, CORE_DIRECTIVES,PasswordProtectModal]
})
export class TileViewComponent implements OnInit {

    @Input() public viewfoolist: any;
    @Output() private onDelViewfoo: EventEmitter<number> = new EventEmitter();
    viewfoocommentid: string;
   
    serviceUrl: string = myGlobals.serviceUrl + '/upload/gallery';
    imageUrl: string = myGlobals.imageUrl + '/upload/gallery';
    profileimageUrl: string = myGlobals.imageUrl + '/upload/profiles';
    public isEnable: boolean = true;
    commentaddloading: boolean = false;
    loginUser: any;
    viewfoocomments: any;
  
   
    viewfoocommenttext: FormControl = new FormControl("", Validators.required);
    viewfoocomment: FormGroup;
    //for passpwrd protected
    viewfoopassword: FormGroup;
    loading: boolean = false;
    password: FormControl = new FormControl("", Validators.required);
    confirmpassword: FormControl = new FormControl("", Validators.required);
    generatedpassword: FormControl;
    viewfoopasswordid:string;
    viewfoopasswordtype:string="autopassword";
    generateownpassword: boolean = true;
    chkmail:FormControl=false;
    chksms:FormControl=false;
    public checkemail:boolean=false;
    public checksms:boolean=false;
    public unlockviewfooid:string;
    public iserror:boolean=false;
    public checkunlocksms:boolean=false;
    //end of password protected
    
    constructor(private _router: Router, private authService: AuthService, private builder: FormBuilder) {
        this.loginUser = myGlobals.LoginUser;

        this.viewfoocomment = builder.group({
            "viewfoocommenttext": this.viewfoocommenttext
        });
        //for password protected
        this.viewfoopassword = builder.group({
            "password": this.password,
            "generatedpassword": this.generatedpassword,
            "chkmail":this.chkmail,
            "chksms":this.chksms,
            confirmpassword: this.confirmpassword,

        }, 
        { validator: CustomValidators.matchingPasswords('password', 'confirmpassword') });
        //end of password protected
    }

    ngOnInit() {

               $(".CBpasswordtype").change(function() {
                var checked = $(this).is(':checked');
                $(".CBpasswordtype").prop('checked', false);
                if (checked) {
                    $(this).prop('checked', true);
                    //this.imagesize = this.value;
                }
            });
        
         this.viewfoopassword.controls['chkmail'].updateValue(false);
          this.viewfoopassword.controls['chksms'].updateValue(false);
        let formdata = this.viewfoocomment.value;
       
        window.fbAsyncInit = function() {
            FB.init({
                appId: '1083168355107423',
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
    getComment(viewfooid:string){
       this.viewfoocomments=[];
       this.viewfoocommentid = viewfooid;
       this.authService.viewfoogetcomment(this.viewfoocommentid)
			.subscribe((result) => {
                            this.viewfoocomments=result.data;
			}, (error: any) => {
				this.errorMsg = error;
				console.log("viewfoo get fail: " + error);
			});
        
    }
    doComment(){
        this.commentaddloading = true;
        let commentdata = this.viewfoocommenttext.value;
        this.authService.viewfooaddcomment(this.loginUser.id,'viewfoo',commentdata,this.viewfoocommentid)
			.subscribe((result) => {
                            this.authService.viewfoogetcomment(this.viewfoocommentid)
                            .subscribe((result1) => {
                                if(result1){
                                    this.viewfoocomments=result1.data;
                                    this.resetform();
                                }
                            }, (error: any) => {
                                    this.errorMsg = error;
                                    console.log("viewfoo get fail: " + error);
                            });
                            this.commentaddloading = false;
			}, (error: any) => {
				console.log("viewfoo add fail: " + error);
                                this.commentaddloading = false;
			});
    }
    
    resetform(){      
        this.viewfoocomment.controls['viewfoocommenttext'].updateValue('');
    }
 
    openpopover(index:string){
        $("#sharing_"+index).toggle();
    }
    shareFb(id:string){
        let url='https://viewfoo.pro/viewfoodetail/'+id;      
            FB.ui(
                {                   
                method: 'share',
                name: 'viewfoo',
                link: url,
                caption: 'test',
                message: "test for viewfoo",
                picture: "",
                href: "https://viewfoo.pro/viewfoodetail/"+id
                }, function(response){});
    }
    
    //for password protected
    
    openpasswordpopup(id) {
        this.viewfoopasswordid = id;
        $('#passwordModal').modal('show');
        //this.generatepassword();
    }
    unlockviewfoo(id){
         this.viewfoopasswordid = id;
        $('#unlockpasswordModal').modal('show');
    }

    changeinviewfoolist(event: any) {
        	let id = event.id;
		let value :boolean= event.value;
           
        for (var i = 0; i < this.viewfoolist.length; i++) {
            if (this.viewfoolist[i].id == id) {
                this.viewfoolist[i].ispasswordprotected = value;
            }
        }
    }

    //end of password protected
}
