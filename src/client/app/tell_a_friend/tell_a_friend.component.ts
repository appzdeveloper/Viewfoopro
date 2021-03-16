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
    selector: 'tellafriend',
    templateUrl: 'tell_a_friend.component.html'
     directives: [REACTIVE_FORM_DIRECTIVES]

})

export class TellAFriendComponent implements OnInit{
    loginUser: User;
    errorMsg: string;
    successMsg:sting;
    emailAddresses: FormControl = new FormControl("",Validators.required);
    mailbody: FormControl = new FormControl("", Validators.required);
    tellafriendform: FormGroup;
    public isEnable:boolean = true;
    tellafriendlist:any;
     constructor( private router: Router,private builder: FormBuilder, private authService: AuthService) {      
        self =this;
        this.loginUser = myGlobals.LoginUser;
        this.tellafriendform = builder.group({
            "emailAddresses": this.emailAddresses,
            "mailbody": `Hi\n\
             I\’ve been using ViewFoo Pro.I highly recommended it if you\’d like to make the best photo galleries and websites.Get 2 months free, using this link: \n\

http://viewfoo.pro/users/`+this.loginUser.subdomain+`\n\

Cheers,
`+this.loginUser.firstname+` `+this.loginUser.lastname;
        });
    }
    
    ngOnInit() {
        self =this;
         this.loginUser = myGlobals.LoginUser;
         let formdata = this.tellafriendform.value;
         
         this.authService.getTellafriendlist(this.loginUser.id)
                    .subscribe((result) => {
                        if (result) {
                            this.tellafriendlist = result.data;
                            console.log(' fsdf ':this.tellafriendlist.length);
                        }
                    }, (error: any) => {
                        this.errorMsg = error;
                        console.log('Could not get Tell a friend invitation list');
                    })
         
    }
    
    doSendMail(){
       let formdata = this.tellafriendform.value;
       var emaildata = formdata.mailbody;
       var test=emaildata.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');
       var test1 = test.replace(/ /g,'&nbsp;');
       var test2 = '<p style="text-align:left;color:#555;font-size:14px;padding-top:130px;padding-left:10px;padding-right:10px;"><br>'+test1+'</p>';
       var emailaddress = this.emailAddresses.value;
       this.isEnable=false;
       this.errorMsg = '';
       this.successMsg= '';
       console.log(test2);
       
       this.authService.sendMail(emailaddress,test2,this.loginUser.id)
                    .subscribe((result) => {
                        if (result) {
                            this.isEnable = true;
                            this.successMsg = 'Invites sent to '+emailaddress+'.Check back soon to see if they have joined yet.';
                            this.resetform();
                            
                            this.authService.getTellafriendlist(this.loginUser.id)
                            .subscribe((result) => {
                                if (result) {
                                    this.tellafriendlist = result.data;

                                }
                            }, (error: any) => {
                                this.errorMsg = error;
                                console.log('Could not get Tell a friend invitation list');
                            })
                        }
                    }, (error: any) => {
                        this.errorMsg = error;
                        this.isEnable = true;
                    })
    }
    resetform(){
         this.tellafriendform = this.builder.group({
            "emailAddresses": '',
            "mailbody": `Hi\n\
             I\’ve been using ViewFoo Pro.I highly recommended it if you\’d like to make the best photo galleries and websites.Get 2 months free, using this link: \n\

http://viewfoo.pro/users/`+this.loginUser.subdomain+`\n\

Cheers,
`+this.loginUser.firstname+` `+this.loginUser.lastname;
        });
    }
   
}