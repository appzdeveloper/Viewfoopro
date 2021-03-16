import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/interfaces';
//import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators, ngform} from '@angular/common'
import { FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES }
from '@angular/forms';
import myGlobals = require('../globals');
import {CustomValidators} from '../shared/utils/CustomValidators';
@Component({
    moduleId: module.id,
    selector: 'viewprofile',
    templateUrl: 'viewprofile.component.html',
    directives: [REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class ViewProfileComponent implements OnInit {

    loginUser: User;

    name: FormControl;
    subdomain: FormControl;
    email: FormControl;
    timezone: FormControl;
    local: FormControl;
    language: FormControl;
    currency: FormControl;

    profileform: FormGroup;
    profiledata: profileData;
    public domainmessage:string;
    invaliddomain: boolean = true;
    invalid: boolean = false;
    loading: boolean = false;
    cropperloading: boolean = false;
    noprofile:boolean = false;
    filechanged: boolean = false;
    public message: string;
    public message: string;
    public url: string;
    active: boolean = true;
    statusCode: string = 200;

    cropAvtar: any;

    constructor(private builder: FormBuilder, private _router: Router, private authService: AuthService) {

        this.createForm();
        console.log("Is MyGlobal user > " + myGlobals.LoginUser);

    }
    createForm() {
        this.name = new FormControl('', Validators.required);
        this.email = new FormControl('', Validators.compose([Validators.required, CustomValidators.emailValidator]));
        this.subdomain = new FormControl('', Validators.required);
        this.timezone = new FormControl('', );
        this.local = new FormControl('', );
        this.language = new FormControl('', );
        this.currency = new FormControl('', );
        this.profileform = this.builder.group({
            name: this.name,
            email: this.email,
            subdomain: this.subdomain,
            timezone: this.timezone,
            local: this.local,
            language: this.language,
            currency: this.currency

        });

    }

    savecropimage() {
        var $image = $('#image');
        var cropBoxData;
        var canvasData;
        var croppedcanvas;
        cropBoxData = $image.cropper('getCropBoxData');
        canvasData = $image.cropper('getCanvasData');
        croppedcanvas = $image.cropper('getCroppedCanvas');
        //console.log(croppedcanvas);
        this.filename = croppedcanvas.toDataURL("image/png");
        //console.log(this.filename);
        this.loginUser = myGlobals.LoginUser;

        this.authService.profilebase64(this.filename, this.loginUser.id)
            .subscribe((result) => {

                if (result) {
                    //console.log(result.message);
                    this.url = result.profileData.ImageUrl;
                    this.filechanged = true;

                    setTimeout(function() {
                        this.filename = this.url;
                    }, 5000);
                    //this.filename = this.url;
                    //this.filename ="http://192.168.0.183:1337/upload/profiles/1466160907959.png";
                    //this.errorMsg = result.success.message;
                    //this.reset();
                } else {

                    this.filename = "uploads/user_icon.png";
                }

                this.loading = false;

            }, (error: any) => {
                this.errorMsg = error;
                this.loading = false;
                console.log("profile image upload fail: " + error);
            })

        $image.cropper('destroy');

        $("#frmBrowse")[0].reset();
        $('#myModal').modal('hide');
    }

    onCropperPopupDone() {
        var $image = this.cropAvtar.$img;
        var croppedcanvas = $image.cropper('getCroppedCanvas');
        this.filename = croppedcanvas.toDataURL("image/png");
        //var imgdata = = croppedcanvas.toDataURL();
        this.loginUser = myGlobals.LoginUser;

        this.cropperloading = true;
        this.authService.profilebase64(this.filename,this.loginUser.id)
            .subscribe((result) => {

                //console.log(result.message);
                if (result.data.profileimage) {
                    var self = this;
                    setTimeout(function() {
                        self.filename = myGlobals.imageUrl + "/upload/profiles/" + result.data.profileimage;
                        myGlobals.LoginUser.profileimage = result.data.profileimage;
                        window.localStorage['user'] = JSON.stringify(myGlobals.LoginUser);
                        self.authService.emitProfileChange();
                    }, 3000);

                } else {
                    this.filename = "uploads/user_icon.png";
                }
                this.loading = false;
                $('#avatar-modal').modal('hide');
                this.cropperloading = false;
            }, (error: any) => {
                this.errorMsg = error;
                this.loading = false;
                console.log("profile image upload fail: " + error);
                this.cropperloading = false;
            })
        //        console.log(this.filename);
        //        $("#frmBrowse")[0].reset();
        //        $('#avatar-modal').modal('hide');
    }


    ngOnInit() {

        this.cropAvtar = new CropAvatar($('#crop-avatar'));;

        this.loginUser = myGlobals.LoginUser;

        if (this.loginUser != null) {
            this.authService.viewprofile(this.loginUser.id)
                .subscribe((result) => {
                    if (result) {
                        console.log(result.data);

                        this.profileform.controls['name'].updateValue(result.data.firstname + " " + result.data.lastname);
                        this.profileform.controls['email'].updateValue(result.data.email);
                        this.profileform.controls['subdomain'].updateValue(result.data.subdomain + ".viewfoo.pro");
                        this.profileform.controls['timezone'].updateValue(result.data.timezone);
                        this.profileform.controls['local'].updateValue(result.data.local);
                        this.profileform.controls['language'].updateValue(result.data.language);
                        this.profileform.controls['currency'].updateValue(result.data.currency);
                        if (result.data.profileimage)
                            this.filename = myGlobals.imageUrl + "/upload/profiles/" + result.data.profileimage;
                        else

                            this.filename = "uploads/user_icon.png";

                    }

                }, (error: any) => {
                    this.errorMsg = error;
                    this.loading = false;
                    console.log(" view profile fail: " + error);
                });
        }

    }

    editprofile() {
        let formdata = this.profileform.value;

        formdata["id"] = this.loginUser.id;

        console.log(formdata);
        this.authService.editprofile(formdata)
            .subscribe((result) => {

                //myGlobals.LoginUser = result.data;
                myGlobals.LoginUser.firstname = result.data.firstname;
                myGlobals.LoginUser.lastname = result.data.lastname;
                myGlobals.LoginUser.email = result.data.email;
                myGlobals.LoginUser.subdomain = result.data.subdomain;
                myGlobals.LoginUser.timezone = result.data.timezone;
                myGlobals.LoginUser.local = result.data.local;
                myGlobals.LoginUser.currency = result.data.currency;
                myGlobals.LoginUser.profileimage = result.data.profileimage;

                window.localStorage['user'] = JSON.stringify(myGlobals.LoginUser);

            }, (error: any) => {
                this.errorMsg = error;
                this.loading = false;
                console.log(" view profile fail: " + error);
            });
    }
        chksubdomain(subdomain){
         this.invaliddomain = false;
         if(subdomain.length!=0)
        {
             var n = subdomain.indexOf(".viewfoo.pro");
             var sub = subdomain.substr(0, n);
             this.authService.chksubdomain(sub)
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

}
