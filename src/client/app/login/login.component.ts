import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
//import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators, ngform} from '@angular/common';
//import {ErrorObservable} from 'rxjs/Rx';

import { FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES } 
    from '@angular/forms';
    
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/interfaces';
import myGlobals = require('../globals');
import {CustomValidators} from '../shared/utils/CustomValidators';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
     directives: [REACTIVE_FORM_DIRECTIVES],

})

export class LoginComponent implements OnInit {

    loginUser: User;
  
    email: FormControl = new FormControl("", Validators.compose([Validators.required, CustomValidators.emailValidator]));
    password: FormControl = new FormControl("", Validators.required);
    loginform: FormGroup;

    errorMsg: string;
    invalid: boolean = false;

    loading: boolean = false;
  

    ngOnInit() {

        if (myGlobals.LoginUser) {
            this._router.navigate(['/']);
        }
    }

    constructor(private builder: FormBuilder, private _router: Router, private authService: AuthService) {
       
            this.loginform = builder.group({
            "email": this.email,
            "password": this.password
        });

    }
    doLogin() {
           let today=new Date();
        let formdata = this.loginform.value;
        console.log(formdata);
        this.loading = true;
        this.authService.login(formdata.email, formdata.password)
            .subscribe((result) => {
                window.localStorage['user'] = JSON.stringify(result.data);
               
                this.loginUser = result.data;
                console.log(this.loginUser);
                myGlobals.LoginUser = this.loginUser;
               // let subscribeenddate = new Date(this.loginUser.subscriptionenddate);
//              
//                if(subscribeenddate <= today){
//                 this._router.navigate(['/trialbilling']);
//                }
               // else{
                this._router.navigate(['/']);
               // }
                this.loading = false;
            }, (error: any) => {
                this.errorMsg = error;
                this.loading = false;
                console.log("LoginComponent login fail: " + error);
            })
    }

    changemsgstatus() {
        this.invalid = false;
    }

    gotoSignup() {
        this._router.navigate(['/signup']);
    }
    gotofpass() {
        this._router.navigate(['/forgotpassword']);
    }
    reset() {

        //this.loginform.controls.forEach((name, control) => {
        // control.updateValue('');
        // control.setErrors(null);
        //  });
//        this.loginform.controls["email"].updateValue("")
//        this.loginform.controls["email"].setErrors(null)
//        this.loginform.controls["password"].updateValue("")
//        this.loginform.controls["password"].setErrors(null)

    }
}
