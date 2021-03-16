import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
//import {ErrorObservable} from 'rxjs/Rx';
//import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators, ngform} from '@angular/common';

import { FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES } 
    from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/interfaces';
import myGlobals = require('../globals');
import {CustomValidators} from '../shared/utils/CustomValidators';


@Component({
    moduleId: module.id,
    selector: 'forgotpassword',
    templateUrl: 'forgotpassword.component.html',
    directives: [REACTIVE_FORM_DIRECTIVES],

})

export class ForgotPasswordComponent implements OnInit {


   email: FormControl = new FormControl("", Validators.compose([Validators.required, CustomValidators.emailValidator]));
    fpassform: FormGroup;
    
    loading: boolean = false;
    
    constructor(private builder: FormBuilder, private _router: Router, private authService: AuthService) {
        this.fpassform = builder.group({
            "email": this.email,
            "password": this.password
        });

    }
    forgotPassword() {
         this.loading = true;
        let formdata = this.fpassform.value;
        this.authService.forgotpassword(formdata.email)
            .subscribe((result) => {
                this.message = result.data;
                 this.loading = false;
            },
            (error: any) => {
                this.message = error;
                this.loading = false;
                console.log("send mail fail: " + error);
            });

    }


    gotologin() {
        this._router.navigate(['/login']);
    }
}
