
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
import {CustomValidators} from '../../shared/utils/CustomValidators';

import { CommentModalComponent } from '../../shared/widgets/commentmodal/commentmodal.component';
import { ShareModalComponent } from '../../shared/widgets/sharemodal/sharemodal.component';

@Component({
    moduleId: module.id,
    selector: 'centergallaryview',
    templateUrl: 'gallaryview.component.html',
    directives: [PaginationComponent, REACTIVE_FORM_DIRECTIVES, CORE_DIRECTIVES,CommentModalComponent,ShareModalComponent]
})
export class GallaryViewComponent implements OnInit {
	@Input() public viewfoolist: any;
	@Output() private onDelViewfoo: EventEmitter<number> = new EventEmitter();

    serviceUrl: string = myGlobals.serviceUrl + '/upload/gallery';
    imageUrl: string = myGlobals.imageUrl + '/upload/gallery';
    loginUser: any;
    loading: boolean = false;

    viewfoocommentid:string;
    profileimageUrl:string = myGlobals.imageUrl + '/upload/profiles';
    commentaddloading:boolean = false;
    viewfoocomments:any;
    viewfoocommenttext: FormControl = new FormControl("", Validators.required);
    viewfoocomment: FormGroup;
    //for passpwrd protected
    viewfoopassword1: FormGroup;
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
     public isEnable: boolean = true;
    //end of password protected

    //share and comment
    currViewfooComment: Viewfoo = {};
    currViewfooShare:Viewfoo = {};
    currViewfooImageShare:Container = {};
    isModelCommentHiddenRegistered: boolean = false;
    isModelShareHiddenRegistered:boolean = false;

    constructor(private _router: Router, private authService: AuthService,private builder: FormBuilder) {

        this.loginUser = myGlobals.LoginUser;
        this.viewfoocomment = builder.group({
           "viewfoocommenttext": this.viewfoocommenttext
        });
          //for password protected
        this.viewfoopassword1 = builder.group({
            "password": this.password,
            "generatedpassword": this.generatedpassword,
            "chkmail":this.chkmail,
            "chksms":this.chksms,
            "confirmpassword": this.confirmpassword
        },
        { validator: CustomValidators.matchingPasswords('password', 'confirmpassword') });
        //end of password protected

    }

    ngOnInit() {
          this.viewfoopassword1.controls['chkmail'].updateValue(false);
          this.viewfoopassword1.controls['chksms'].updateValue(false);
          let formdata = this.viewfoocomment.value;
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
    //for password protected
    openpasswordpopup(id) {
        
        this.viewfoopasswordid = id;
        this.generatepassword();
    }

    generatepassword() {
        this.isloading = true;
        this.viewfoopassword1.controls['generatedpassword'].setErrors(null);
        this.viewfoopassword1.controls['confirmpassword'].setErrors(null);
        this.viewfoopassword1.controls['password'].setErrors(null);
        this.authService.generaterandompw()
            .subscribe((result) => {
                if (result) {

                    this.viewfoopassword1.controls['generatedpassword'].updateValue(result.data);
                    this.isloading = false;
                }
            }, (error: any) => {
                this.errorMsg = error;
                this.isloading = false;
                console.log("password generate fail: " + error);
            });
    }
    changepasswordtype(val) {
            
        if (val == 'own') {
            this.generateownpassword = false;
            this.viewfoopasswordtype = "yourpassword";
        }
        else if (val == 'generate') {
            this.generateownpassword = true;
            this.viewfoopasswordtype = "autopassword";
            this.viewfoopassword1.controls['generatedpassword'].setErrors(null);
            this.viewfoopassword1.controls['confirmpassword'].setErrors(null);
            this.viewfoopassword1.controls['password'].setErrors(null);
        }
    }
    updateviewfoopasswprd() {
         this.isloading = true;
        let formdata = this.viewfoopassword1.value;
        formdata["viewfoopasswordtype"] = this.viewfoopasswordtype;
        formdata["id"] = this.viewfoopasswordid;
        formdata["ispasswordprotected"] = true;
        
        if (this.viewfoopasswordtype == "autopassword") {

            formdata["viewfoopassword"] = formdata.generatedpassword;
        }
        else if (this.viewfoopasswordtype == "yourpassword") {
            
            formdata["viewfoopassword"] = formdata.password;
        }
        
        this.authService.passwordprotectedviefoo(formdata)
            .subscribe((result) => {
                if (result) {
                
                    this.changeinviewfoolist(this.viewfoopasswordid, true);
                     this.isloading = false;
                    this.resetpasswordform();
                    //$('#passwordModal').hide();
                    $("#passwordModal .close").click();
                }
            }, (error: any) => {
                this.errorMsg = error;
                 this.isloading = false;
                console.log("password update fail: " + error);
            });
    }

    changeinviewfoolist(id, value) {

        for (var i = 0; i < this.viewfoolist.length; i++) {
            if (this.viewfoolist[i].id == id) {
                this.viewfoolist[i].ispasswordprotected = value;
            }
        }
    }
    unlockpassword(unlockpw:HTMLInputElement) {
        this.isloading=true;
        this.iserror = false;
        this.authService.unlockviewfoo(this.unlockviewfooid, unlockpw.value)
            .subscribe((result) => {
                if (result) {
                  
                    this.changeinviewfoolist(this.unlockviewfooid, false);
                      this.iserror=true;
                      unlockpw.value=null;
                      this.isloading=false;
                   // $('#unlockpasswordModal').hide();
                     $("#unlockpasswordModal .close").click();
                }
            }, (error: any) => {
                this.iserror=true;
                this.errorMsg = error;
                this.isloading=false;
                console.log("password update fail: " + error);
            });
    }
    resetpasswordform() {
        this.viewfoopassword1.controls['confirmpassword'].updateValue('');
        this.viewfoopassword1.controls['password'].updateValue('');
        this.viewfoopassword1.controls['generatedpassword'].setErrors(null);
        this.viewfoopassword1.controls['confirmpassword'].setErrors(null);
    }
    sendpassword() {
        this.isloading = true;
         this.iserror = false;
        this.authService.forgotviewfoopassword(this.unlockviewfooid, this.checkunlocksms)
            .subscribe((result) => {
                if (result) {
                
                     this.isloading = false;
                     this.iserror = true;
                     this.errorMsg = result.data;
                }
            }, (error: any) => {
                this.iserror = true;
                this.errorMsg = error;
                this.isloading = false;
                console.log("password sending fail: " + error);
            });
    }
    //end of password protected
    
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
