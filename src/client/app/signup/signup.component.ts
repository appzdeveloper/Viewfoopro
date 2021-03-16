import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
//import {ErrorObservable} from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, Response } from '@angular/http';
//import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators, ngform} from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES }
from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/interfaces';
import myGlobals = require('../globals');
import {CustomValidators} from '../shared/utils/CustomValidators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
//import 'rxjs/Rx';  // use this line if you want to be lazy, otherwise:
import 'rxjs/add/operator/do';  // debug

import { User } from '../interfaces';

import myGlobals = require('../../globals');

@Component({
    moduleId: module.id,
    selector: 'signup',
    templateUrl: 'signup.component.html',
    directives: [REACTIVE_FORM_DIRECTIVES]
})

export class SignUpComponent implements OnInit {

    firstname: FormControl;
    lastname: FormControl;
    email: FormControl;
    subdomain: FormControl;
    password: FormControl;
    confirmpassword: FormControl;
    regform: FormGroup;
    invalid: boolean = false;
    loading: boolean = false;
    public message: string;
    public domainmessage: string;
    invaliddomain: boolean = true;
    active: boolean = true;
    statusCode: string = 200;
    ngOnInit() {

    }
    constructor(private builder: FormBuilder, private _router: Router, private authService: AuthService, private http: Http) {


        this.createForm();

    }

    createForm() {

        this.firstname = new FormControl("", Validators.required);
		this.lastname = new FormControl("", Validators.required);
		this.email = new FormControl("", Validators.compose([Validators.required, CustomValidators.emailValidator]));
		this.subdomain = new FormControl("", Validators.required);
		this.password = new FormControl("", Validators.required);
		this.confirmpassword = new FormControl("", Validators.required);

        this.regform = this.builder.group({
            "firstname": this.firstname,
            "lastname": this.lastname,
            "email": this.email,
            "subdomain": this.subdomain,
            "password": this.password,
            confirmpassword: this.confirmpassword,
        }, { validator: CustomValidators.matchingPasswords('password', 'confirmpassword') }
        );
    }

    doSignup() {

        let formdata = this.regform.value;
        console.log(formdata);

        this.loading = true;

        this.authService.register(formdata)
            .subscribe((result) => {
                this.message = result.data
                this.active = false;
                this.loading = false;
                this.reset();
            },
            (error: any) => {
                this.message = error;
                this.loading = false;
                console.log("RegisterComponent  fail: " + error);
            });

    }
    reset() {
        this.createForm();

        //this.regform.controls["firstname"].updateValue("")
        //this.regform.controls["firstname"].setErrors(null)
        //this.regform.controls["lastname"].updateValue("")
        //this.regform.controls["lastname"].setErrors(null)
        //this.regform.controls["subdomain"].updateValue("")
        //this.regform.controls["subdomain"].setErrors(null)
        //this.regform.controls["email"].updateValue("")
        //this.regform.controls["email"].setErrors(null)
        //this.regform.controls["password"].updateValue("")
        //this.regform.controls["password"].setErrors(null)
        //this.regform.controls["cpassword"].updateValue("")
        //this.regform.controls["cpassword"].setErrors(null)
    }



    gotoLogin() {
        this._router.navigate(['/login']);
    }
    chksubdomain(subdomain) {
        if (subdomain.length != 0) {
            this.authService.chksubdomain(subdomain)
				.subscribe((result) => {
					//this.domainmessage = result.message
					this.invaliddomain = false;
				},
				(error: any) => {
					this.domainmessage = error;
					this.invaliddomain = true;
					console.log("subdomain  fail: " + error);
				});

        }
    }
