
import {Component, OnInit, NgZone, Input, Output, ElementRef,
    EventEmitter, Renderer, OnChanges, SimpleChange, ChangeDetectorRef, ViewChild}
from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import { User } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { Viewfoo } from '../..interfaces';
import { Container } from '../..interfaces';
import myGlobals = require('../../../globals');
import {CustomValidators} from '../../utils/CustomValidators';

@Component({
    moduleId: module.id,
    selector: 'passwordprotectmodal',
    templateUrl: 'passwordprotectmodal.component.html',
    directives: [ REACTIVE_FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class PasswordProtectModal implements OnInit {
    
    @Output() private onchangeviewfoo: EventEmitter<string> = new EventEmitter();
    @Input() public currViewfooid: any;
    viewfoopassword: FormGroup;
    loading: boolean = false;
    password: FormControl = new FormControl("", Validators.required);
    confirmpassword: FormControl = new FormControl("", Validators.required);
    generatedpassword: FormControl;
    viewfoopasswordid: string;
    viewfoopasswordtype: string = "autopassword";
    generateownpassword: boolean = true;
    chkmail: FormControl = false;
    chksms: FormControl = false;
    public checkemail: boolean = false;
    public checksms: boolean = false;
    public unlockviewfooid: string;
    public iserror: boolean = false;
    public checkunlocksms: boolean = false;

    constructor(private _router: Router, private authService: AuthService, private builder: FormBuilder) {
        this.loginUser = myGlobals.LoginUser;

        //for password protected
        this.viewfoopassword = builder.group({
            "password": this.password,
            "generatedpassword": this.generatedpassword,
            "chkmail": this.chkmail,
            "chksms": this.chksms,
            confirmpassword: this.confirmpassword,

        }, { validator: CustomValidators.matchingPasswords('password', 'confirmpassword') });
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
        this.generatepassword();
    }
    
    generatepassword() {
         
        this.isloading = true;
        this.viewfoopassword.controls['generatedpassword'].setErrors(null);
        this.viewfoopassword.controls['confirmpassword'].setErrors(null);
        this.viewfoopassword.controls['password'].setErrors(null);
        this.authService.generaterandompw()
            .subscribe((result) => {
                if (result) {

                    this.viewfoopassword.controls['generatedpassword'].updateValue(result.data);
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
            this.viewfoopassword.controls['generatedpassword'].setErrors(null);
            this.viewfoopassword.controls['confirmpassword'].setErrors(null);
            this.viewfoopassword.controls['password'].setErrors(null);
        }
    }
    updateviewfoopasswprd() {
        this.isloading = true;
        let formdata = this.viewfoopassword.value;
        formdata["viewfoopasswordtype"] = this.viewfoopasswordtype;
        formdata["id"] = this.currViewfooid;
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
                  this.changeviewfoo(this.currViewfooid, true);
                    this.isloading = false;
                    this.resetpasswordform();
                    //$('#passwordModal').hide();
                   // $("#passwordModal .close").click();
                      $("#passwordModal").modal("hide");
                    
                     
                }
            }, (error: any) => {
                this.errorMsg = error;
                this.isloading = false;
                console.log("password update fail: " + error);
            });
    }
    changeviewfoo(id,value){
           this.item = { id: id, value: value};
            this.onchangeviewfoo.emit(this.item);
    
    }

//    changeinviewfoolist(id, value) {
//
//        for (var i = 0; i < this.viewfoolist.length; i++) {
//            if (this.viewfoolist[i].id == id) {
//                this.viewfoolist[i].ispasswordprotected = value;
//            }
//        }
//    }
    unlockpassword(unlockpw: HTMLInputElement) {
       
        this.isloading = true;
        this.iserror = false;
        this.authService.unlockviewfoo(this.currViewfooid, unlockpw.value)
            .subscribe((result) => {
                if (result) {

                    this.changeviewfoo(this.currViewfooid, false);
                    this.iserror = true;
                    unlockpw.value = null;
                    this.isloading = false;
                    //$('#unlockpasswordModal').hide();
                    //$("#unlockpasswordModal .close").click();
                     $("#unlockpasswordModal").modal("hide");
                }
            }, (error: any) => {
                this.iserror = true;
                this.errorMsg = error;
                this.isloading = false;
                console.log("password update fail: " + error);
            });
    }
    resetpasswordform() {
        this.viewfoopassword.controls['confirmpassword'].updateValue('');
        this.viewfoopassword.controls['password'].updateValue('');
        this.viewfoopassword.controls['generatedpassword'].setErrors(null);
        this.viewfoopassword.controls['confirmpassword'].setErrors(null);
        this.viewfoopassword.controls['password'].setErrors(null);
        

    }
    sendpassword() {
        this.isloading = true;
        this.iserror = false;
        this.authService.forgotviewfoopassword(this.currViewfooid, this.checkunlocksms)
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
}