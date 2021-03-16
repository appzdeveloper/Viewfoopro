import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/interfaces';
import { FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import myGlobals = require('../globals');
import {CustomValidators} from '../shared/utils/CustomValidators';
import myGlobals = require('../../globals');
@Component({
    moduleId: module.id,
    selector: 'realtimenotification',
    templateUrl: 'real_time_notification.component.html'
     directives: [REACTIVE_FORM_DIRECTIVES]

})

export class RealtimenotificationComponent implements OnInit {
    usersetting:any;
    mobilenumber:string;
    sharenotification:boolean;
    shareemailnotification:string;
    sharemobilenotification:string;
    sharebothnotification:string;
    sharephotonotification:boolean;
    sharephotoemailnotification:string;
    sharephotomobilenotification:string;
    sharephotobothnotification:string;
    photoselectnotification:boolean;
    photoselectemailnotification:string;
    photoselectmobilenotification:string;
    photoselectbothnotification:string;
    chatnotification:boolean;
    chatemailnotification:string;
    chatmobilenotification:string;
    chatbothnotification:string;
    newsnotification:boolean;
    newsemailnotification:string;
    newsmobilenotification:string;
    newsbothnotification:string;
    chatorcommenttype:string;
    photoselectiontype:string;
    phototype:string;
    sharingtype:string;
    viewfoonewstype:string;
    isloading:boolean = false;
    constructor( private router: Router,private builder: FormBuilder, private authService: AuthService) {
//        this.flogoform = builder.group({
//            "logoname": this.logoname
//        });
    }
    ngOnInit() {
        this.isloading = true;
        
         $(".CBSharing").change(function() {
             var checked = $(this).is(':checked');
             $(".CBSharing").prop('checked', false);
             if (checked) {
                 $(this).prop('checked', true);
             }
         });
         $(".CBsharephoto").change(function() {
             var checked = $(this).is(':checked');
             $(".CBsharephoto").prop('checked', false);
             if (checked) {
                 $(this).prop('checked', true);
             }
         });
           $(".CBphotoselect").change(function() {
             var checked = $(this).is(':checked');
             $(".CBphotoselect").prop('checked', false);
             if (checked) {
                 $(this).prop('checked', true);
             }
         });
         
         $(".CBchat").change(function() {
             var checked = $(this).is(':checked');
             $(".CBchat").prop('checked', false);
             if (checked) {
                 $(this).prop('checked', true);
             }
         });
         $(".CBnews").change(function() {
             var checked = $(this).is(':checked');
             $(".CBnews").prop('checked', false);
             if (checked) {
                 $(this).prop('checked', true);
             }
         });
         
         this.loginUser = myGlobals.LoginUser;
         console.log(this.loginUser.id);
         this.authService.getrealtimenotificationsetting(this.loginUser.id)
            .subscribe((result) => {
                if (result) {
                    this.usersetting=result.data;
                    this.setSettingData(this.usersetting);
                }
                this.isloading = false;
            }, (error: any) => {
                this.errorMsg = error;
      
                console.log("real time notification fail: " + error);
                this.isloading = false;
            })
           
          console.log(this.countrycode);  
    }
    ngAfterViewInit() {
                jQuery(document).ready(function () {
                    jQuery('.nav_bar').click(function () {
                        jQuery('.navigation').toggleClass('visible');
                        jQuery('body').toggleClass('opacity');
                    });
                });
	}
    changeSetting(settingType:string,val:any){
        console.log(settingType+'  '+val);
       let settingType = settingType;
       console.log(this.sharenotification);
        this.authService.realtimenotificationsetting(this.loginUser.id, val, settingType)
            .subscribe((result) => {
                if (result) {
                    console.log(result);
                }
            }, (error: any) => {
                this.errorMsg = error;
                this.loading = false;

                console.log("viewfoo option update fail: " + error);
            })
       
    }
    setSettingData(settings:any){
        console.log(settings);
        this.mobilenumber = settings.mobilenumber;
        this.sharenotification = settings.issharing; 
        this.sharephotonotification = settings.isphoto; 
        this.photoselectnotification = settings.isphotoselection; 
        this.chatnotification = settings.ischatorcomment; 
        this.newsnotification = settings.isviewfoonews; 
        this.photoselectiontype = settings.photoselectiontype;
        this.phototype = settings.phototype;
        this.sharingtype = settings.sharingtype;
        this.viewfoonewstype = settings.viewfoonewstype;
        this.chatorcommenttype = settings.chatorcommenttype;
    }
}