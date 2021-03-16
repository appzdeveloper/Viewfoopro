"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var auth_service_1 = require('../shared/services/auth.service');
var forms_1 = require('@angular/forms');
var myGlobals = require('../globals');
var PublicHomepageSettingComponent = (function () {
    function PublicHomepageSettingComponent(router, builder, authService) {
        this.router = router;
        this.builder = builder;
        this.authService = authService;
        this.usersetting = {};
        this.setusersetting = false;
        this.logoname = new forms_1.FormControl("", forms_1.Validators.required);
        this.iscropperloading = false;
        this.flogoform = builder.group({
            "logoname": this.logoname
        });
    }
    PublicHomepageSettingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loginUser = myGlobals.LoginUser;
        this.authService.getusersetting(this.loginUser.id)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
                _this.usersetting = result.data;
                _this.setusersettingvalue(_this.usersetting);
                _this.setusersetting = true;
                console.log(_this.usersetting);
            }
        }, function (error) {
            _this.errorMsg = error;
            console.log("menu style change fail: " + error);
        });
        jscolor.init();
        this.cropLogo = new CropLogo($('#crop-logo'));
        $('.nav_bar').click(function () {
            $('.navigation').toggleClass('visible');
            $('body').toggleClass('opacity');
        });
        $(".CBmenustyle").change(function () {
            var checked = $(this).is(':checked');
            $(".CBmenustyle").prop('checked', false);
            if (checked) {
                $(this).prop('checked', true);
            }
        });
        $(".CBviewfoostyle").change(function () {
            var checked = $(this).is(':checked');
            $(".CBviewfoostyle").prop('checked', false);
            if (checked) {
                $(this).prop('checked', true);
            }
        });
    };
    PublicHomepageSettingComponent.prototype.setusersettingvalue = function (tmpusersetting) {
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
        if (tmpusersetting.menucolor == "#FFFFFF") {
            $("#radio1").prop('checked', true);
        }
        else if (tmpusersetting.menucolor == "#000000") {
            $("#radio2").prop('checked', true);
        }
        else {
            $("#colorinput").css("background-color", tmpusersetting.menucolor);
            $("#radio1").prop('checked', false);
            $("#radio2").prop('checked', false);
            $("#colormenu").prop('checked', true);
        }
        if (tmpusersetting.fontcolor == "#FFFFFF") {
            $("#radio3").prop('checked', true);
        }
        else if (tmpusersetting.fontcolor == "#000000") {
            $("#radio4").prop('checked', true);
        }
        else {
            $("#colorinput1").css("background-color", tmpusersetting.fontcolor);
            $("#radio3").prop('checked', false);
            $("#radio4").prop('checked', false);
            $("#colorfont").prop('checked', true);
        }
        this.logotype = tmpusersetting.islogo;
    };
    PublicHomepageSettingComponent.prototype.onCropperPopupDone = function () {
        var _this = this;
        var $image = this.cropLogo.$img;
        var croppedcanvas = $image.cropper('getCroppedCanvas');
        this.filename = croppedcanvas.toDataURL("image/png");
        console.log(this.filename);
        this.iscropperloading = true;
        $('#avatar-modal').modal('hide');
        var settingtype = "logoimage";
        this.authService.usersetting(this.loginUser.id, this.filename, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
            _this.iscropperloading = false;
        }, function (error) {
            _this.errorMsg = error;
            console.log("logo image update fail: " + error);
            _this.iscropperloading = false;
        });
    };
    PublicHomepageSettingComponent.prototype.changemenustyle = function (value) {
        var _this = this;
        this.menustyle = value;
        var settingtype = "menustyle";
        this.authService.usersetting(this.loginUser.id, this.menustyle, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            console.log("menu style change fail: " + error);
        });
    };
    PublicHomepageSettingComponent.prototype.changeviewfoostyle = function (value) {
        var _this = this;
        this.viewfoostyle = value;
        var settingtype = "viewfoostyle";
        this.authService.usersetting(this.loginUser.id, this.viewfoostyle, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            console.log("viewfoo style change fail: " + error);
        });
    };
    PublicHomepageSettingComponent.prototype.viewfoooption = function (val) {
        var _this = this;
        var settingtype = "viewfoooption";
        this.authService.usersetting(this.loginUser.id, val, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("viewfoo option update fail: " + error);
        });
    };
    PublicHomepageSettingComponent.prototype.allowsharing = function (val) {
        var _this = this;
        var settingtype = "allowsharing";
        this.authService.usersetting(this.loginUser.id, val, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            console.log("allow sharing  update fail: " + error);
        });
    };
    PublicHomepageSettingComponent.prototype.allowcomment = function (val) {
        var _this = this;
        var settingtype = "allowcomment";
        this.authService.usersetting(this.loginUser.id, val, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            console.log("allow comment update fail: " + error);
        });
    };
    PublicHomepageSettingComponent.prototype.allowselection = function (val) {
        var _this = this;
        var settingtype = "allowselection";
        this.authService.usersetting(this.loginUser.id, val, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            console.log("allow selection update fail: " + error);
        });
    };
    PublicHomepageSettingComponent.prototype.disablerightclick = function (val) {
        var _this = this;
        var settingtype = "disablerightmousebtn";
        this.authService.usersetting(this.loginUser.id, val, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            console.log("disable right click update fail: " + error);
        });
    };
    PublicHomepageSettingComponent.prototype.sharingphotofileinfo = function (val) {
        var _this = this;
        var settingtype = "sharingfileinfo";
        this.authService.usersetting(this.loginUser.id, val, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            console.log("sharing photo update fail: " + error);
        });
    };
    PublicHomepageSettingComponent.prototype.uploadlogo = function () {
        $('#avatar-modal').modal('show');
        this.logotype = 'image';
    };
    PublicHomepageSettingComponent.prototype.addlogoname = function (logoname) {
        var _this = this;
        var logoname = logoname;
        var settingtype = "addlogoname";
        this.authService.usersetting(this.loginUser.id, logoname, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            console.log("add logo name change fail: " + error);
        });
    };
    PublicHomepageSettingComponent.prototype.openlogonamepopup = function () {
        this.logotype = 'text';
    };
    PublicHomepageSettingComponent.prototype.socialmedialink = function (val, tempsettingtype) {
        var _this = this;
        var settingtype = tempsettingtype;
        var value = val;
        this.authService.usersetting(this.loginUser.id, value, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            console.log("link change fail: " + error);
        });
    };
    PublicHomepageSettingComponent.prototype.addfooter = function (value) {
        var _this = this;
        var settingtype = "addfooter";
        this.authService.usersetting(this.loginUser.id, value, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            console.log("footer change fail: " + error);
        });
    };
    PublicHomepageSettingComponent.prototype.changemenucolor = function (value) {
        var _this = this;
        var settingtype = "menucolor";
        var menucolor;
        if (value === "white") {
            this.menucolor = "#FFFFFF";
            $("#colormenu").css("background-color", '#000000');
        }
        else if (value === "black") {
            this.menucolor = "#000000";
            $("#colormenu").css("background-color", '#000000');
        }
        else {
            var color = $("#colormenu").val();
            this.menucolor = '#' + color;
            $("#colorinput").css("background-color", this.menucolor);
            $("#radio1").prop('checked', false);
            $("#radio2").prop('checked', false);
            $("#colormenu").prop('checked', true);
        }
        this.authService.usersetting(this.loginUser.id, this.menucolor, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            console.log("meu color change fail: " + error);
        });
    };
    PublicHomepageSettingComponent.prototype.changemenufontcolor = function (value) {
        var _this = this;
        var settingtype = "fontcolor";
        var fontcolor;
        if (value === "white") {
            this.fontcolor = "#FFFFFF";
            $("#colorfont").css("background-color", '#000000');
        }
        else if (value === "black") {
            this.fontcolor = "#000000";
            $("#colorfont").css("background-color", '#000000');
        }
        else {
            var color = $("#colorfont").val();
            this.fontcolor = '#' + color;
            $("#colorinput1").css("background-color", this.fontcolor);
            $("#radio3").prop('checked', false);
            $("#radio4").prop('checked', false);
            $("#colorfont").prop('checked', true);
        }
        this.authService.usersetting(this.loginUser.id, this.fontcolor, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            console.log("font color change fail: " + error);
        });
    };
    PublicHomepageSettingComponent.prototype.addmobilenumber = function (value) {
        var _this = this;
        var settingtype = "mobilenumber";
        this.authService.usersetting(this.loginUser.id, value, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            console.log("font color change fail: " + error);
        });
    };
    PublicHomepageSettingComponent.prototype.addofficenumber = function (value) {
        var _this = this;
        var settingtype = "officenumber";
        this.authService.usersetting(this.loginUser.id, value, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            console.log("font color change fail: " + error);
        });
    };
    PublicHomepageSettingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'publichomepagesetting',
            templateUrl: 'public_homepage_setting.component.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router, forms_1.FormBuilder, auth_service_1.AuthService])
    ], PublicHomepageSettingComponent);
    return PublicHomepageSettingComponent;
}());
exports.PublicHomepageSettingComponent = PublicHomepageSettingComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9wdWJsaWNfaG9tZXBhZ2Vfc2V0dGluZy9wdWJsaWNfaG9tZXBhZ2Vfc2V0dGluZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFnQyxlQUFlLENBQUMsQ0FBQTtBQUNoRCx1QkFBd0MsaUJBQWlCLENBQUMsQ0FBQTtBQUMxRCw2QkFBNEIsaUNBQWlDLENBQUMsQ0FBQTtBQUU5RCxzQkFBMEYsZ0JBQWdCLENBQUMsQ0FBQTtBQUMzRyxJQUFPLFNBQVMsV0FBVyxZQUFZLENBQUMsQ0FBQztBQVd6QztJQW9CSyx3Q0FBcUIsTUFBYyxFQUFTLE9BQW9CLEVBQVUsV0FBd0I7UUFBN0UsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQWQzRixnQkFBVyxHQUFTLEVBQUUsQ0FBQztRQVN2QixtQkFBYyxHQUFTLEtBQUssQ0FBQztRQUVyQyxhQUFRLEdBQWdCLElBQUksbUJBQVcsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVoRSxxQkFBZ0IsR0FBVyxLQUFLLENBQUM7UUFFOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQzNCLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUM1QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsaURBQVEsR0FBUjtRQUFBLGlCQTBEQztRQXhESSxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFHakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7YUFDbEQsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNkLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FB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QUFDLEVBQUUsVUFBQyxLQUFVO1lBQ1YsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQTtJQUdWLENBQUM7SUFDRCx3REFBZSxHQUFmLFVBQWdCLEtBQUs7UUFBckIsaUJBWUM7UUFYSSxJQUFJLFdBQVcsR0FBQyxjQUFjLENBQUM7UUFFN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLFdBQVcsQ0FBQzthQUMvRCxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQ2QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDLEVBQUUsVUFBQyxLQUFVO1lBQ1YsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQTtJQUNWLENBQUM7SUFqZUw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsV0FBVyxFQUFFLHdDQUF3QztZQUNwRCxVQUFVLEVBQUUsQ0FBQyxnQ0FBd0IsQ0FBQztTQUUxQyxDQUFDOztzQ0FBQTtJQThkQyxxQ0FBQztBQUFELENBNWRILEFBNGRJLElBQUE7QUE1ZFMsc0NBQThCLGlDQTRkdkMsQ0FBQSIsImZpbGUiOiJhcHAvcHVibGljX2hvbWVwYWdlX3NldHRpbmcvcHVibGljX2hvbWVwYWdlX3NldHRpbmcuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTLCBSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnMsIEZvcm1CdWlsZGVyLCBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vZ2xvYmFscycpO1xuaW1wb3J0IHtDdXN0b21WYWxpZGF0b3JzfSBmcm9tICcuLi9zaGFyZWQvdXRpbHMvQ3VzdG9tVmFsaWRhdG9ycyc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vLi4vZ2xvYmFscycpO1xuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ3B1YmxpY2hvbWVwYWdlc2V0dGluZycsXG4gICAgdGVtcGxhdGVVcmw6ICdwdWJsaWNfaG9tZXBhZ2Vfc2V0dGluZy5jb21wb25lbnQuaHRtbCdcbiAgICAgZGlyZWN0aXZlczogW1JFQUNUSVZFX0ZPUk1fRElSRUNUSVZFU11cblxufSlcblxuZXhwb3J0IGNsYXNzIFB1YmxpY0hvbWVwYWdlU2V0dGluZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgbG9naW5Vc2VyOiBVc2VyO1xuICAgIHB1YmxpYyBtZW51c3R5bGU6c3RyaW5nO1xuICAgIHB1YmxpYyB2aWV3Zm9vc3R5bGU6c3RyaW5nO1xuICAgIHB1YmxpYyBlcnJvck1zZzpzdHJpbmc7XG4gICAgcHVibGljIGZpbGVuYW1lOnN0cmluZztcbiAgICAgcHVibGljIHVzZXJzZXR0aW5nOiBVc2VyID0ge307XG4gICAgIHB1YmxpYyB0b3BuYXY6c3RyaW5nO1xuICAgICBwdWJsaWMgbGVmdG5hdjpzdHJpbmc7XG4gICAgIHB1YmxpYyBzZXRjb21tZW50OnN0cmluZztcbiAgICAgcHVibGljIHNldHNoYXJpbmc6c3RyaW5nO1xuICAgICBwdWJsaWMgc2V0c2VsZWN0aW9uOnN0cmluZztcbiAgICAgcHVibGljIHNldG1vdXNlYnRuY2xpY2s6c3RyaW5nO1xuICAgICBwdWJsaWMgc2V0c2hhcmluZ2ZpbGVpbmZvOnN0cmluZztcbiAgICAgcHVibGljIHNldHZpZXdmb29vcHRpb246c3RyaW5nO1xuICAgICBwdWJsaWMgc2V0dXNlcnNldHRpbmc6Ym9vbGVhbj1mYWxzZTtcbiAgICAgcHVibGljIGxvZ290eXBlOnN0cmluZztcbiAgICBsb2dvbmFtZTogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgZmxvZ29mb3JtOiBDb250cm9sR3JvdXA7XG4gICAgIGlzY3JvcHBlcmxvYWRpbmc6Ym9vbGVhbiA9IGZhbHNlO1xuICAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixwcml2YXRlIGJ1aWxkZXI6IEZvcm1CdWlsZGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xuICAgICAgICB0aGlzLmZsb2dvZm9ybSA9IGJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgXCJsb2dvbmFtZVwiOiB0aGlzLmxvZ29uYW1lXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgXG4gICAgICAgICB0aGlzLmxvZ2luVXNlciA9IG15R2xvYmFscy5Mb2dpblVzZXI7XG4vLyAgICAgICAgXG4gICAgICAgICBcbiAgICAgICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmdldHVzZXJzZXR0aW5nKHRoaXMubG9naW5Vc2VyLmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJzZXR0aW5nPXJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHVzZXJzZXR0aW5ndmFsdWUoIHRoaXMudXNlcnNldHRpbmcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHVzZXJzZXR0aW5nPXRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlcnNldHRpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtZW51IHN0eWxlIGNoYW5nZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgIFxuICAgICAgICAgICAganNjb2xvci5pbml0KCk7XG4gICAgICAgICB0aGlzLmNyb3BMb2dvID0gbmV3IENyb3BMb2dvKCQoJyNjcm9wLWxvZ28nKSk7XG4gICAgICAgICBcbiAgICAgICAgICBcbiAgICAgICAgICAkKCcubmF2X2JhcicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAkKCcubmF2aWdhdGlvbicpLnRvZ2dsZUNsYXNzKCd2aXNpYmxlJyk7XG4gICAgICAgICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnb3BhY2l0eScpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIFxuICAgICAgICAgJChcIi5DQm1lbnVzdHlsZVwiKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY2hlY2tlZCA9ICQodGhpcykuaXMoJzpjaGVja2VkJyk7XG4gICAgICAgICAgICAkKFwiLkNCbWVudXN0eWxlXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICQodGhpcykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgLy90aGlzLmltYWdlc2l6ZSA9IHRoaXMudmFsdWU7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICAkKFwiLkNCdmlld2Zvb3N0eWxlXCIpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICB2YXIgY2hlY2tlZCA9ICQodGhpcykuaXMoJzpjaGVja2VkJyk7XG4gICAgICAgICAgICAgJChcIi5DQnZpZXdmb29zdHlsZVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgIGlmIChjaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICQodGhpcykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgIC8vdGhpcy5pbWFnZXNpemUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4vLyAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2NvbG9yNycsIGZ1bmN0aW9uICgpIHtcbi8vLy8gICAgICAgIHZhciBvYmogPSB0aGlzO1xuLy8vLyAgICBpZiAoIW9iai5oYXNQaWNrZXIpIHtcbi8vLy8gICAgICAgIHZhciBwaWNrZXIgPSBuZXcganNjb2xvci5jb2xvcihvYmosIHt9KTsgIC8vXG4vLy8vICAgICAgICBvYmouaGFzUGlja2VyID0gdHJ1ZTtcbi8vLy8gICAgICAgIHBpY2tlci5zaG93UGlja2VyKCk7XG4vLyAgICAgICAgJCgnI2NvbG9yNycpLmNvbG9ycGlja2VyKCk7XG4vLyAgIC8vIH1cbi8vfSk7IFxuICAgIH1cblxuICAgIHNldHVzZXJzZXR0aW5ndmFsdWUodG1wdXNlcnNldHRpbmcpIHtcbiAgICAgICAgaWYgKHRtcHVzZXJzZXR0aW5nLmxvZ29pbWFnZSAhPSBcIlwiKSB7XG4gICAgICAgICAgICB0aGlzLmZpbGVuYW1lID0gbXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi91cGxvYWQvZ2FsbGVyeS9cIiArIHRtcHVzZXJzZXR0aW5nLmxvZ29pbWFnZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG1wdXNlcnNldHRpbmcubmF2cG9zaXRpb24gPT09IFwidG9wXCIpIHtcblxuICAgICAgICAgICAgdGhpcy50b3BuYXYgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sZWZ0bmF2ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRvcG5hdiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sZWZ0bmF2ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG1wdXNlcnNldHRpbmcudmlld2Zvb2Rpc3BsYXkgPT09IFwidGlsZVwiKSB7XG5cbiAgICAgICAgICAgIHRoaXMudGlsZXZpZXcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5nYWxsYXJ5dmlldyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5tYXNvbnJ5dmlldyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRtcHVzZXJzZXR0aW5nLnZpZXdmb29kaXNwbGF5ID09PSBcImdhbGxlcnlcIikge1xuICAgICAgICAgICAgdGhpcy50aWxldmlldyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5nYWxsYXJ5dmlldyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1hc29ucnl2aWV3ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodG1wdXNlcnNldHRpbmcudmlld2Zvb2Rpc3BsYXkgPT09IFwibWFzb25yeVwiKSB7XG4gICAgICAgICAgICB0aGlzLnRpbGV2aWV3ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmdhbGxhcnl2aWV3ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm1hc29ucnl2aWV3ID0gdHJ1ZTtcblxuICAgICAgICB9XG4gICAgICAgIGlmICh0bXB1c2Vyc2V0dGluZy5hbGxvd2NvbW1lbnQgPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgICB0aGlzLnNldGNvbW1lbnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0bXB1c2Vyc2V0dGluZy5hbGxvd3NoYXJpbmcgPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgICB0aGlzLnNldHNoYXJpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0bXB1c2Vyc2V0dGluZy5hbGxvd3NlbGVjdGlvbiA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0c2VsZWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG1wdXNlcnNldHRpbmcuZGlzYWJsZXJpZ2h0bW91c2VidG4gPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgICB0aGlzLnNldG1vdXNlYnRuY2xpY2sgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0bXB1c2Vyc2V0dGluZy5zaGFyaW5nZmlsZWluZm8gPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgICB0aGlzLnNldHNoYXJpbmdmaWxlaW5mbyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRtcHVzZXJzZXR0aW5nLnZpZXdmb29vcHRpb24gPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgICB0aGlzLnNldHZpZXdmb29vcHRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRtcHVzZXJzZXR0aW5nLm1lbnVjb2xvcj09XCIjRkZGRkZGXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgICAkKFwiI3JhZGlvMVwiKS5wcm9wKCdjaGVja2VkJyx0cnVlKTsgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0bXB1c2Vyc2V0dGluZy5tZW51Y29sb3I9PVwiIzAwMDAwMFwiKXtcbiAgICAgICAgICAgICAkKFwiI3JhZGlvMlwiKS5wcm9wKCdjaGVja2VkJyx0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgICAkKFwiI2NvbG9yaW5wdXRcIikuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCB0bXB1c2Vyc2V0dGluZy5tZW51Y29sb3IpO1xuICAgICAgICAgICAgICQoXCIjcmFkaW8xXCIpLnByb3AoJ2NoZWNrZWQnLGZhbHNlKTsgXG4gICAgICAgICAgICAgJChcIiNyYWRpbzJcIikucHJvcCgnY2hlY2tlZCcsZmFsc2UpO1xuICAgICAgICAgICAgICQoXCIjY29sb3JtZW51XCIpLnByb3AoJ2NoZWNrZWQnLHRydWUpO1xuICAgICAgICB9XG4gICAgICAgICAgICBpZih0bXB1c2Vyc2V0dGluZy5mb250Y29sb3I9PVwiI0ZGRkZGRlwiKVxuICAgICAgICB7XG4gICAgICAgICAgICAgJChcIiNyYWRpbzNcIikucHJvcCgnY2hlY2tlZCcsdHJ1ZSk7IFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodG1wdXNlcnNldHRpbmcuZm9udGNvbG9yPT1cIiMwMDAwMDBcIil7XG4gICAgICAgICAgICAgJChcIiNyYWRpbzRcIikucHJvcCgnY2hlY2tlZCcsdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICAgJChcIiNjb2xvcmlucHV0MVwiKS5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIHRtcHVzZXJzZXR0aW5nLmZvbnRjb2xvcik7XG4gICAgICAgICAgICAgJChcIiNyYWRpbzNcIikucHJvcCgnY2hlY2tlZCcsZmFsc2UpOyBcbiAgICAgICAgICAgICAkKFwiI3JhZGlvNFwiKS5wcm9wKCdjaGVja2VkJyxmYWxzZSk7XG4gICAgICAgICAgICAgJChcIiNjb2xvcmZvbnRcIikucHJvcCgnY2hlY2tlZCcsdHJ1ZSk7XG4gICAgICAgIH0gICBcbiAgICAgICAgdGhpcy5sb2dvdHlwZSA9IHRtcHVzZXJzZXR0aW5nLmlzbG9nbztcbiAgICAgICBcbiAgICB9XG5cbiAgICBcbiAgICBvbkNyb3BwZXJQb3B1cERvbmUoKSB7XG4gICAgICAgIHZhciAkaW1hZ2UgPSB0aGlzLmNyb3BMb2dvLiRpbWc7XG4gICAgICAgIHZhciBjcm9wcGVkY2FudmFzID0gJGltYWdlLmNyb3BwZXIoJ2dldENyb3BwZWRDYW52YXMnKTtcbiAgICAgICAgdGhpcy5maWxlbmFtZSA9IGNyb3BwZWRjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZpbGVuYW1lKTtcbiAgICAgICAgdGhpcy5pc2Nyb3BwZXJsb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgJCgnI2F2YXRhci1tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XG4gICAgICAgIGxldCBzZXR0aW5ndHlwZTogc3RyaW5nID0gXCJsb2dvaW1hZ2VcIjtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS51c2Vyc2V0dGluZyh0aGlzLmxvZ2luVXNlci5pZCwgdGhpcy5maWxlbmFtZSwgc2V0dGluZ3R5cGUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaXNjcm9wcGVybG9hZGluZyA9ZmFsc2U7XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICBcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvZ28gaW1hZ2UgdXBkYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNjcm9wcGVybG9hZGluZyA9ZmFsc2U7XG4gICAgICAgICAgICB9KVxuIFxuICAgIH1cbiAgICBjaGFuZ2VtZW51c3R5bGUodmFsdWUpe1xuICAgICAgICAgdGhpcy5tZW51c3R5bGUgPSB2YWx1ZTtcbiAgICAgICAgbGV0IHNldHRpbmd0eXBlOiBzdHJpbmcgPSBcIm1lbnVzdHlsZVwiO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnVzZXJzZXR0aW5nKHRoaXMubG9naW5Vc2VyLmlkLCB0aGlzLm1lbnVzdHlsZSwgc2V0dGluZ3R5cGUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICBcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1lbnUgc3R5bGUgY2hhbmdlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgICBcbiAgICB9XG4gICAgY2hhbmdldmlld2Zvb3N0eWxlKHZhbHVlKXtcbiAgICAgICAgdGhpcy52aWV3Zm9vc3R5bGUgPSB2YWx1ZTtcbiAgICBcbiAgICAgICAgbGV0IHNldHRpbmd0eXBlOiBzdHJpbmcgPSBcInZpZXdmb29zdHlsZVwiO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnVzZXJzZXR0aW5nKHRoaXMubG9naW5Vc2VyLmlkLCB0aGlzLnZpZXdmb29zdHlsZSwgc2V0dGluZ3R5cGUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICBcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpZXdmb28gc3R5bGUgY2hhbmdlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgXG4gICAgfVxuICAgIHZpZXdmb29vcHRpb24odmFsKXtcbiAgICAgICBcbiAgICAgICAgbGV0IHNldHRpbmd0eXBlOiBzdHJpbmcgPSBcInZpZXdmb29vcHRpb25cIjtcbiAgICBcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS51c2Vyc2V0dGluZyh0aGlzLmxvZ2luVXNlci5pZCwgdmFsLCBzZXR0aW5ndHlwZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlld2ZvbyBvcHRpb24gdXBkYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICB9XG4gICAgYWxsb3dzaGFyaW5nKHZhbCl7XG4gIFxuICAgICAgICBsZXQgc2V0dGluZ3R5cGU6IHN0cmluZyA9IFwiYWxsb3dzaGFyaW5nXCI7XG4gICAgXG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UudXNlcnNldHRpbmcodGhpcy5sb2dpblVzZXIuaWQsIHZhbCwgc2V0dGluZ3R5cGUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWxsb3cgc2hhcmluZyAgdXBkYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICB9XG4gICAgYWxsb3djb21tZW50KHZhbCl7XG4gICAgXG4gICAgICAgIGxldCBzZXR0aW5ndHlwZTogc3RyaW5nID0gXCJhbGxvd2NvbW1lbnRcIjtcbiAgICAgIFxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnVzZXJzZXR0aW5nKHRoaXMubG9naW5Vc2VyLmlkLCB2YWwsIHNldHRpbmd0eXBlKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFsbG93IGNvbW1lbnQgdXBkYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICB9XG4gICAgYWxsb3dzZWxlY3Rpb24odmFsKXtcbiBcbiAgICAgICAgbGV0IHNldHRpbmd0eXBlOiBzdHJpbmcgPSBcImFsbG93c2VsZWN0aW9uXCI7XG4gICAgICBcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS51c2Vyc2V0dGluZyh0aGlzLmxvZ2luVXNlci5pZCwgdmFsLCBzZXR0aW5ndHlwZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgIFxuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbGxvdyBzZWxlY3Rpb24gdXBkYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSkgXG4gICAgfVxuICAgIGRpc2FibGVyaWdodGNsaWNrKHZhbCl7XG4gICAgICBcbiAgICAgICAgbGV0IHNldHRpbmd0eXBlOiBzdHJpbmcgPSBcImRpc2FibGVyaWdodG1vdXNlYnRuXCI7XG4gICAgICBcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS51c2Vyc2V0dGluZyh0aGlzLmxvZ2luVXNlci5pZCwgdmFsLCBzZXR0aW5ndHlwZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgIFxuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkaXNhYmxlIHJpZ2h0IGNsaWNrIHVwZGF0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pIFxuICAgICAgICAgXG4gICAgfVxuICAgIHNoYXJpbmdwaG90b2ZpbGVpbmZvKHZhbCl7XG4gICAgIFxuICAgICAgICBsZXQgc2V0dGluZ3R5cGU6IHN0cmluZyA9IFwic2hhcmluZ2ZpbGVpbmZvXCI7XG4gICAgIFxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnVzZXJzZXR0aW5nKHRoaXMubG9naW5Vc2VyLmlkLCB2YWwsIHNldHRpbmd0eXBlKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgXG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNoYXJpbmcgcGhvdG8gdXBkYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSkgXG4gICAgfVxuICAgIHVwbG9hZGxvZ28oKXtcbiAgICAgICAgICAkKCcjYXZhdGFyLW1vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgICAgICAgICAgdGhpcy5sb2dvdHlwZSA9ICdpbWFnZSc7XG4gICAgfVxuICAgIGFkZGxvZ29uYW1lKGxvZ29uYW1lOnN0cmluZyl7XG4gICAgICBsZXQgbG9nb25hbWU9IGxvZ29uYW1lO1xuICAgICAgbGV0IHNldHRpbmd0eXBlOiBzdHJpbmcgPSBcImFkZGxvZ29uYW1lXCI7XG4gICBcbiAgICAgIHRoaXMuYXV0aFNlcnZpY2UudXNlcnNldHRpbmcodGhpcy5sb2dpblVzZXIuaWQsIGxvZ29uYW1lLCBzZXR0aW5ndHlwZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICBcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRkIGxvZ28gbmFtZSBjaGFuZ2UgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICBcbiAgICAgXG4gICAgfVxuICAgIG9wZW5sb2dvbmFtZXBvcHVwKCl7XG4gICAgICB0aGlzLmxvZ290eXBlID0gJ3RleHQnO1xuICAgICAgICAgXG4gICAgfVxuICAgc29jaWFsbWVkaWFsaW5rKHZhbCx0ZW1wc2V0dGluZ3R5cGUpe1xuICAgICAgIFxuICAgICAgICAgXG4gICAgICBsZXQgc2V0dGluZ3R5cGU6IHN0cmluZyA9IHRlbXBzZXR0aW5ndHlwZTtcbiAgICAgIGxldCB2YWx1ZTpTdHJpbmc9dmFsO1xuXG4gICAgICB0aGlzLmF1dGhTZXJ2aWNlLnVzZXJzZXR0aW5nKHRoaXMubG9naW5Vc2VyLmlkLHZhbHVlLHNldHRpbmd0eXBlKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGluayBjaGFuZ2UgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgXG4gICAgfVxuICAgIGFkZGZvb3Rlcih2YWx1ZSl7XG4gICAgICAgbGV0IHNldHRpbmd0eXBlOiBzdHJpbmcgPSBcImFkZGZvb3RlclwiO1xuICAgXG5cbiAgICAgIHRoaXMuYXV0aFNlcnZpY2UudXNlcnNldHRpbmcodGhpcy5sb2dpblVzZXIuaWQsdmFsdWUsc2V0dGluZ3R5cGUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb290ZXIgY2hhbmdlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgICBcbiAgICB9XG4gICAgY2hhbmdlbWVudWNvbG9yKHZhbHVlKXtcbiAgICAgICAgbGV0IHNldHRpbmd0eXBlOiBzdHJpbmcgPSBcIm1lbnVjb2xvclwiO1xuICAgICAgICAgbGV0IG1lbnVjb2xvcjtcbiAgICAgICAgaWYgKHZhbHVlID09PSBcIndoaXRlXCIpIHtcbiAgICAgICAgICAgIHRoaXMubWVudWNvbG9yID0gXCIjRkZGRkZGXCI7XG4gICAgICAgICAgICAgJChcIiNjb2xvcm1lbnVcIikuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCAnIzAwMDAwMCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBcImJsYWNrXCIpIHtcbiAgICAgICAgICAgIHRoaXMubWVudWNvbG9yID0gXCIjMDAwMDAwXCI7XG4gICAgICAgICAgICAgJChcIiNjb2xvcm1lbnVcIikuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCAnIzAwMDAwMCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgeyBcbiAgICAgICAgICAgICB2YXIgY29sb3IgPSAkKFwiI2NvbG9ybWVudVwiKS52YWwoKTtcbiAgICAgICAgICAgIHRoaXMubWVudWNvbG9yID0gJyMnICsgY29sb3I7XG4gICAgICAgICAgICAgJChcIiNjb2xvcmlucHV0XCIpLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgdGhpcy5tZW51Y29sb3IpO1xuICAgICAgICAgICAgICQoXCIjcmFkaW8xXCIpLnByb3AoJ2NoZWNrZWQnLGZhbHNlKTtcbiAgICAgICAgICAgICAkKFwiI3JhZGlvMlwiKS5wcm9wKCdjaGVja2VkJyxmYWxzZSk7XG4gICAgICAgICAgICAgJChcIiNjb2xvcm1lbnVcIikucHJvcCgnY2hlY2tlZCcsdHJ1ZSk7XG4gICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS51c2Vyc2V0dGluZyh0aGlzLmxvZ2luVXNlci5pZCx0aGlzLm1lbnVjb2xvcixzZXR0aW5ndHlwZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1ldSBjb2xvciBjaGFuZ2UgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICBcbiAgICB9XG4gICAgICAgIGNoYW5nZW1lbnVmb250Y29sb3IodmFsdWUpe1xuICAgICAgICBsZXQgc2V0dGluZ3R5cGU6IHN0cmluZyA9IFwiZm9udGNvbG9yXCI7XG4gICAgICAgICBsZXQgZm9udGNvbG9yO1xuICAgICAgICBpZiAodmFsdWUgPT09IFwid2hpdGVcIikge1xuICAgICAgICAgICAgdGhpcy5mb250Y29sb3IgPSBcIiNGRkZGRkZcIjtcbiAgICAgICAgJChcIiNjb2xvcmZvbnRcIikuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCAnIzAwMDAwMCcpO1xuICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBcImJsYWNrXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZm9udGNvbG9yID0gXCIjMDAwMDAwXCI7XG4gICAgICAgICAgICAkKFwiI2NvbG9yZm9udFwiKS5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsICcjMDAwMDAwJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY29sb3IgPSAkKFwiI2NvbG9yZm9udFwiKS52YWwoKTtcbiAgICAgICAgICAgIHRoaXMuZm9udGNvbG9yID0gJyMnICsgY29sb3I7XG4gICAgICAgICAgICAkKFwiI2NvbG9yaW5wdXQxXCIpLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgdGhpcy5mb250Y29sb3IpO1xuICAgICAgICAgICAgICQoXCIjcmFkaW8zXCIpLnByb3AoJ2NoZWNrZWQnLGZhbHNlKTtcbiAgICAgICAgICAgICAkKFwiI3JhZGlvNFwiKS5wcm9wKCdjaGVja2VkJyxmYWxzZSk7XG4gICAgICAgICAgICAgJChcIiNjb2xvcmZvbnRcIikucHJvcCgnY2hlY2tlZCcsdHJ1ZSk7XG4gICAgICAgIFxuICAgICAgICAgfVxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnVzZXJzZXR0aW5nKHRoaXMubG9naW5Vc2VyLmlkLHRoaXMuZm9udGNvbG9yLHNldHRpbmd0eXBlKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm9udCBjb2xvciBjaGFuZ2UgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICBcbiAgICB9XG4gICAgYWRkbW9iaWxlbnVtYmVyKHZhbHVlKXtcbiAgICAgICAgXG4gICAgICAgIGxldCBzZXR0aW5ndHlwZT1cIm1vYmlsZW51bWJlclwiO1xuICAgICAgICBcbiAgICAgICAgICAgdGhpcy5hdXRoU2VydmljZS51c2Vyc2V0dGluZyh0aGlzLmxvZ2luVXNlci5pZCx2YWx1ZSxzZXR0aW5ndHlwZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvbnQgY29sb3IgY2hhbmdlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cbiAgICBhZGRvZmZpY2VudW1iZXIodmFsdWUpe1xuICAgICAgICAgbGV0IHNldHRpbmd0eXBlPVwib2ZmaWNlbnVtYmVyXCI7XG4gICAgICAgIFxuICAgICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnVzZXJzZXR0aW5nKHRoaXMubG9naW5Vc2VyLmlkLHZhbHVlLHNldHRpbmd0eXBlKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm9udCBjb2xvciBjaGFuZ2UgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgIH1cbiAgICBcbiAgICAgICBcbiAgIH1cblxuXG4iXX0=
