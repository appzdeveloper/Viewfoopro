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
    selector: 'publichomepagesetting',
    templateUrl: 'public_homepage_setting.component.html'
     directives: [REACTIVE_FORM_DIRECTIVES]

})

export class PublicHomepageSettingComponent implements OnInit {
    loginUser: User;
    public menustyle:string;
    public viewfoostyle:string;
    public errorMsg:string;
    public filename:string;
     public usersetting: User = {};
     public topnav:string;
     public leftnav:string;
     public setcomment:string;
     public setsharing:string;
     public setselection:string;
     public setmousebtnclick:string;
     public setsharingfileinfo:string;
     public setviewfoooption:string;
     public setusersetting:boolean=false;
     public logotype:string;
    logoname: FormControl = new FormControl("", Validators.required);
    flogoform: ControlGroup;
     iscropperloading:boolean = false;
     constructor( private router: Router,private builder: FormBuilder, private authService: AuthService) {
        this.flogoform = builder.group({
            "logoname": this.logoname
        });
    }
    
    ngOnInit() {
        
         this.loginUser = myGlobals.LoginUser;
//        
         
             this.authService.getusersetting(this.loginUser.id)
            .subscribe((result) => {
                if (result) {
                    console.log(result);
                    this.usersetting=result.data;
                    this.setusersettingvalue( this.usersetting);
                    this.setusersetting=true;
                    console.log(this.usersetting);
                }
            }, (error: any) => {
                this.errorMsg = error;
      
                console.log("menu style change fail: " + error);
            })
           
            jscolor.init();
         this.cropLogo = new CropLogo($('#crop-logo'));
         
          
          $('.nav_bar').click(function() {
              $('.navigation').toggleClass('visible');
              $('body').toggleClass('opacity');
          });
          
         $(".CBmenustyle").change(function() {
            var checked = $(this).is(':checked');
            $(".CBmenustyle").prop('checked', false);
            if (checked) {
                $(this).prop('checked', true);

                //this.imagesize = this.value;

            }
        });
         $(".CBviewfoostyle").change(function() {
             var checked = $(this).is(':checked');
             $(".CBviewfoostyle").prop('checked', false);
             if (checked) {
                 $(this).prop('checked', true);

                 //this.imagesize = this.value;

             }
         });
//    $(document).on('click', '#color7', function () {
////        var obj = this;
////    if (!obj.hasPicker) {
////        var picker = new jscolor.color(obj, {});  //
////        obj.hasPicker = true;
////        picker.showPicker();
//        $('#color7').colorpicker();
//   // }
//}); 
    }

    setusersettingvalue(tmpusersetting) {
        if (tmpusersetting.logoimage != "") {
            this.filename = myGlobals.serviceUrl + "/upload/gallery/" + tmpusersetting.logoimage;
        }
        if (tmpusersetting.navposition === "top") {

            this.topnav = true;
            this.leftnav = false;
        }
        else {
            this.topnav = false;
            this.leftnav = true;
        }
        if (tmpusersetting.viewfoodisplay === "tile") {

            this.tileview = true;
            this.gallaryview = false;
            this.masonryview = false;
        }
        else if (tmpusersetting.viewfoodisplay === "gallery") {
            this.tileview = false;
            this.gallaryview = true;
            this.masonryview = false;
        }
        else if (tmpusersetting.viewfoodisplay === "masonry") {
            this.tileview = false;
            this.gallaryview = false;
            this.masonryview = true;

        }
        if (tmpusersetting.allowcomment === "true") {
            this.setcomment = true;
        }
        if (tmpusersetting.allowsharing === "true") {
            this.setsharing = true;
        }
        if (tmpusersetting.allowselection === "true") {
            this.setselection = true;
        }
        if (tmpusersetting.disablerightmousebtn === "true") {
            this.setmousebtnclick = true;
        }
        if (tmpusersetting.sharingfileinfo === "true") {
            this.setsharingfileinfo = true;
        }
        if (tmpusersetting.viewfoooption === "true") {
            this.setviewfoooption = true;
        }
        if(tmpusersetting.menucolor=="#FFFFFF")
        {
             $("#radio1").prop('checked',true); 
        }
        else if(tmpusersetting.menucolor=="#000000"){
             $("#radio2").prop('checked',true);
        }
        else
        {
             $("#colorinput").css("background-color", tmpusersetting.menucolor);
             $("#radio1").prop('checked',false); 
             $("#radio2").prop('checked',false);
             $("#colormenu").prop('checked',true);
        }
            if(tmpusersetting.fontcolor=="#FFFFFF")
        {
             $("#radio3").prop('checked',true); 
        }
        else if(tmpusersetting.fontcolor=="#000000"){
             $("#radio4").prop('checked',true);
        }
        else
        {
             $("#colorinput1").css("background-color", tmpusersetting.fontcolor);
             $("#radio3").prop('checked',false); 
             $("#radio4").prop('checked',false);
             $("#colorfont").prop('checked',true);
        }   
        this.logotype = tmpusersetting.islogo;
       
    }

    
    onCropperPopupDone() {
        var $image = this.cropLogo.$img;
        var croppedcanvas = $image.cropper('getCroppedCanvas');
        this.filename = croppedcanvas.toDataURL("image/png");
        console.log(this.filename);
        this.iscropperloading = true;
        $('#avatar-modal').modal('hide');
        let settingtype: string = "logoimage";
        this.authService.usersetting(this.loginUser.id, this.filename, settingtype)
            .subscribe((result) => {
                if (result) {
                    console.log(result);
                }
                this.iscropperloading =false;
            }, (error: any) => {
                this.errorMsg = error;
    
                console.log("logo image update fail: " + error);
                this.iscropperloading =false;
            })
 
    }
    changemenustyle(value){
         this.menustyle = value;
        let settingtype: string = "menustyle";
        this.authService.usersetting(this.loginUser.id, this.menustyle, settingtype)
            .subscribe((result) => {
                if (result) {
                    console.log(result);
                }
            }, (error: any) => {
                this.errorMsg = error;
      
                console.log("menu style change fail: " + error);
            })
       
    }
    changeviewfoostyle(value){
        this.viewfoostyle = value;
    
        let settingtype: string = "viewfoostyle";
        this.authService.usersetting(this.loginUser.id, this.viewfoostyle, settingtype)
            .subscribe((result) => {
                if (result) {
                    console.log(result);
                }
            }, (error: any) => {
                this.errorMsg = error;
      
                console.log("viewfoo style change fail: " + error);
            })
     
    }
    viewfoooption(val){
       
        let settingtype: string = "viewfoooption";
    
        this.authService.usersetting(this.loginUser.id, val, settingtype)
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
    allowsharing(val){
  
        let settingtype: string = "allowsharing";
    
        this.authService.usersetting(this.loginUser.id, val, settingtype)
            .subscribe((result) => {
                if (result) {

                    console.log(result);
                }
            }, (error: any) => {
                this.errorMsg = error;
             

                console.log("allow sharing  update fail: " + error);
            })
    }
    allowcomment(val){
    
        let settingtype: string = "allowcomment";
      
        this.authService.usersetting(this.loginUser.id, val, settingtype)
            .subscribe((result) => {
                if (result) {

                    console.log(result);
                }
            }, (error: any) => {
                this.errorMsg = error;
                

                console.log("allow comment update fail: " + error);
            })
    }
    allowselection(val){
 
        let settingtype: string = "allowselection";
      
        this.authService.usersetting(this.loginUser.id, val, settingtype)
            .subscribe((result) => {
                if (result) {

                    console.log(result);
                }
            }, (error: any) => {
                this.errorMsg = error;
       

                console.log("allow selection update fail: " + error);
            }) 
    }
    disablerightclick(val){
      
        let settingtype: string = "disablerightmousebtn";
      
        this.authService.usersetting(this.loginUser.id, val, settingtype)
            .subscribe((result) => {
                if (result) {

                    console.log(result);
                }
            }, (error: any) => {
                this.errorMsg = error;
       

                console.log("disable right click update fail: " + error);
            }) 
         
    }
    sharingphotofileinfo(val){
     
        let settingtype: string = "sharingfileinfo";
     
        this.authService.usersetting(this.loginUser.id, val, settingtype)
            .subscribe((result) => {
                if (result) {

                    console.log(result);
                }
            }, (error: any) => {
                this.errorMsg = error;
       

                console.log("sharing photo update fail: " + error);
            }) 
    }
    uploadlogo(){
          $('#avatar-modal').modal('show');
           this.logotype = 'image';
    }
    addlogoname(logoname:string){
      let logoname= logoname;
      let settingtype: string = "addlogoname";
   
      this.authService.usersetting(this.loginUser.id, logoname, settingtype)
            .subscribe((result) => {
                if (result) {
                    console.log(result);
                }
            }, (error: any) => {
                this.errorMsg = error;
       

                console.log("add logo name change fail: " + error);
            })
     
     
    }
    openlogonamepopup(){
      this.logotype = 'text';
         
    }
   socialmedialink(val,tempsettingtype){
       
         
      let settingtype: string = tempsettingtype;
      let value:String=val;

      this.authService.usersetting(this.loginUser.id,value,settingtype)
            .subscribe((result) => {
                if (result) {
                    console.log(result);
                }
            }, (error: any) => {
                this.errorMsg = error;
                console.log("link change fail: " + error);
            })
   
    }
    addfooter(value){
       let settingtype: string = "addfooter";
   

      this.authService.usersetting(this.loginUser.id,value,settingtype)
            .subscribe((result) => {
                if (result) {
                    console.log(result);
                }
            }, (error: any) => {
                this.errorMsg = error;
                console.log("footer change fail: " + error);
            })
       
    }
    changemenucolor(value){
        let settingtype: string = "menucolor";
         let menucolor;
        if (value === "white") {
            this.menucolor = "#FFFFFF";
             $("#colormenu").css("background-color", '#000000');
        }
        else if (value === "black") {
            this.menucolor = "#000000";
             $("#colormenu").css("background-color", '#000000');
        }
        else
        { 
             var color = $("#colormenu").val();
            this.menucolor = '#' + color;
             $("#colorinput").css("background-color", this.menucolor);
             $("#radio1").prop('checked',false);
             $("#radio2").prop('checked',false);
             $("#colormenu").prop('checked',true);
       
        }
        this.authService.usersetting(this.loginUser.id,this.menucolor,settingtype)
            .subscribe((result) => {
                if (result) {
                    console.log(result);
                }
            }, (error: any) => {
                this.errorMsg = error;
                console.log("meu color change fail: " + error);
            })
        
    }
        changemenufontcolor(value){
        let settingtype: string = "fontcolor";
         let fontcolor;
        if (value === "white") {
            this.fontcolor = "#FFFFFF";
        $("#colorfont").css("background-color", '#000000');
       
        }
        else if (value === "black") {
            this.fontcolor = "#000000";
            $("#colorfont").css("background-color", '#000000');
        }
        else
        {
            var color = $("#colorfont").val();
            this.fontcolor = '#' + color;
            $("#colorinput1").css("background-color", this.fontcolor);
             $("#radio3").prop('checked',false);
             $("#radio4").prop('checked',false);
             $("#colorfont").prop('checked',true);
        
         }
        this.authService.usersetting(this.loginUser.id,this.fontcolor,settingtype)
            .subscribe((result) => {
                if (result) {
                    console.log(result);
                }
            }, (error: any) => {
                this.errorMsg = error;
                console.log("font color change fail: " + error);
            })
        
    }
    addmobilenumber(value){
        
        let settingtype="mobilenumber";
        
           this.authService.usersetting(this.loginUser.id,value,settingtype)
            .subscribe((result) => {
                if (result) {
                    console.log(result);
                }
            }, (error: any) => {
                this.errorMsg = error;
                console.log("font color change fail: " + error);
            })
        
        
    }
    addofficenumber(value){
         let settingtype="officenumber";
        
           this.authService.usersetting(this.loginUser.id,value,settingtype)
            .subscribe((result) => {
                if (result) {
                    console.log(result);
                }
            }, (error: any) => {
                this.errorMsg = error;
                console.log("font color change fail: " + error);
            })
    }
    
       
   }


