import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/interfaces';
//import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators, ngform, DatePipe} from '@angular/common'
import { FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES } 
    from '@angular/forms';
import myGlobals = require('../globals');
import {CustomValidators} from '../shared/utils/CustomValidators';

import {CustomValidators} from '../shared/utils/CustomValidators';
@Component({
    moduleId: module.id,
    selector: 'publichomepagesetting',
    templateUrl: 'trial_billing.component.html',
     directives: [REACTIVE_FORM_DIRECTIVES]

})

export class TrialBillingComponent implements OnInit {
 
    date: Date;
    subenddate: Date;
    subscriptionttype:string;
    day: number;
    loginUser: User;
     email: FormControl = new FormControl("", Validators.compose([Validators.required, CustomValidators.emailValidator]));
     loading: boolean = false;
    fpassform: ControlGroup;
    istrial:boolean=false;
    invoicedetail:[];
    public paymentdetail:Any;
    public paymenttype:string;
    constructor(private builder: FormBuilder,private _router: Router, private authService: AuthService) {
      this.date = new Date();
         this.fpassform = builder.group({
            "email": this.email
        });
     
    }

    ngOnInit() {
        this.loginUser = myGlobals.LoginUser;
        console.log(this.loginUser);
        this.subscriptionttype=this.loginUser.subscription;
        if( this.subscriptionttype=='trial'){
            this.istrial=true; 
        }
        this.calculatedays();
        this.getbillingdetail();
      
    }
    
    getbillingdetail(){
   
        this.authService.userbillingdetail(this.loginUser.id)
            .subscribe((result) => {
                    console.log(result);
                    this.invoicedetail=result.invoicedetail;
                    this.paymentdetail=result.paymentdetail;
                    this.paymenttype=result.paymenttype;
            },
            (error: any) => {
                this.message = error;
                this.loading = false;
                console.log("send mail fail: " + error);
            });
        
    }
    
   
    calculatedays() {
        this.date = new Date();
        this.subenddate = new Date(this.loginUser.subscriptionenddate);
        if (this.subenddate < this.date) {
            this.day = 0;
           
        }
        else {
            let diff = (this.subenddate) - (this.date);
            this.day = Math.round(diff / 86400000);
        }
    }
    billingdetail() {
    
            this._router.navigate(['/billingdetail']);
    }
    tellfriend(){
         $('#friendModal').modal('show');
    }
    sendmail(){
        this.loading = true;
        let formdata = this.fpassform.value;
        
        this.authService.tellafriend(formdata.email,this.loginUser.id)
            .subscribe((result) => {
                this.message = result.message;
                 this.loading = false;
            },
            (error: any) => {
                this.message = error;
                this.loading = false;
                console.log("send mail fail: " + error);
            });
    }
    sendpromocode(code: string) {

        this.authService.validatepromocode(code, this.loginUser.id)
            .subscribe((result) => {
                this.promomessage = result.message;
                this.loading = false;
            },
            (error: any) => {
                this.promomessage = error;
                this.loading = false;
                console.log("send promocode fail: " + error);
            });
    }
    cancelsubscription() {
        this.loading = true;
        this.authService.cancelsubscription(this.loginUser.id)
            .subscribe((result) => {
                console.log(result);
           
                this.istrial = true;
                this.loading = false;
                console.log(result.userdetail[0]);
                if (result.userdetail) {
                    window.localStorage['user'] = JSON.stringify(result.userdetail[0]);
                    this.loginUser = result.userdetail[0];
                    myGlobals.LoginUser = this.loginUser;
                    console.log("after cncel");
                    console.log(this.loginUser);
                }
                //this.calculatedays();
            },
            (error: any) => {
                console.log("cancel subscription fail: " + error);
            });
    }

}

