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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var auth_service_1 = require('../../shared/services/auth.service');
var pagination_component_1 = require('../../shared/pagination/pagination.component');
var myGlobals = require('../../globals');
var CustomValidators_1 = require('../../shared/utils/CustomValidators');
var passwordprotectmodal_component_1 = require('../../shared/widgets/passwordprotectmodal/passwordprotectmodal.component');
var TileViewComponent = (function () {
    function TileViewComponent(_router, authService, builder) {
        this._router = _router;
        this.authService = authService;
        this.builder = builder;
        this.onDelViewfoo = new core_1.EventEmitter();
        this.serviceUrl = myGlobals.serviceUrl + '/upload/gallery';
        this.imageUrl = myGlobals.imageUrl + '/upload/gallery';
        this.profileimageUrl = myGlobals.imageUrl + '/upload/profiles';
        this.isEnable = true;
        this.commentaddloading = false;
        this.viewfoocommenttext = new forms_1.FormControl("", forms_1.Validators.required);
        this.loading = false;
        this.password = new forms_1.FormControl("", forms_1.Validators.required);
        this.confirmpassword = new forms_1.FormControl("", forms_1.Validators.required);
        this.viewfoopasswordtype = "autopassword";
        this.generateownpassword = true;
        this.chkmail = false;
        this.chksms = false;
        this.checkemail = false;
        this.checksms = false;
        this.iserror = false;
        this.checkunlocksms = false;
        this.loginUser = myGlobals.LoginUser;
        this.viewfoocomment = builder.group({
            "viewfoocommenttext": this.viewfoocommenttext
        });
        this.viewfoopassword = builder.group({
            "password": this.password,
            "generatedpassword": this.generatedpassword,
            "chkmail": this.chkmail,
            "chksms": this.chksms,
            confirmpassword: this.confirmpassword,
        }, { validator: CustomValidators_1.CustomValidators.matchingPasswords('password', 'confirmpassword') });
    }
    TileViewComponent.prototype.ngOnInit = function () {
        $(".CBpasswordtype").change(function () {
            var checked = $(this).is(':checked');
            $(".CBpasswordtype").prop('checked', false);
            if (checked) {
                $(this).prop('checked', true);
            }
        });
        this.viewfoopassword.controls['chkmail'].updateValue(false);
        this.viewfoopassword.controls['chksms'].updateValue(false);
        var formdata = this.viewfoocomment.value;
        window.fbAsyncInit = function () {
            FB.init({
                appId: '1083168355107423',
                xfbml: true,
                version: 'v2.7'
            });
        };
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    };
    TileViewComponent.prototype.gotogallary = function (viewfooid) {
        var link = ['/viewfoodetail', viewfooid];
        this._router.navigate(link);
    };
    TileViewComponent.prototype.onEditViewfoo = function (viewfooid) {
        var link = ['/gallary', viewfooid];
        this._router.navigate(link);
    };
    TileViewComponent.prototype.onDeleteViewfoo = function (viewfooid, viewfooindex) {
        var _this = this;
        this.loading = true;
        this.authService.viewfoodelete(viewfooid)
            .subscribe(function (result) {
            _this.loading = false;
            _this.viewfoolist.splice(viewfooindex, 1);
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("viewfoo delete fail: " + error);
        });
    };
    TileViewComponent.prototype.getComment = function (viewfooid) {
        var _this = this;
        this.viewfoocomments = [];
        this.viewfoocommentid = viewfooid;
        this.authService.viewfoogetcomment(this.viewfoocommentid)
            .subscribe(function (result) {
            _this.viewfoocomments = result.data;
        }, function (error) {
            _this.errorMsg = error;
            console.log("viewfoo get fail: " + error);
        });
    };
    TileViewComponent.prototype.doComment = function () {
        var _this = this;
        this.commentaddloading = true;
        var commentdata = this.viewfoocommenttext.value;
        this.authService.viewfooaddcomment(this.loginUser.id, 'viewfoo', commentdata, this.viewfoocommentid)
            .subscribe(function (result) {
            _this.authService.viewfoogetcomment(_this.viewfoocommentid)
                .subscribe(function (result1) {
                if (result1) {
                    _this.viewfoocomments = result1.data;
                    _this.resetform();
                }
            }, function (error) {
                _this.errorMsg = error;
                console.log("viewfoo get fail: " + error);
            });
            _this.commentaddloading = false;
        }, function (error) {
            console.log("viewfoo add fail: " + error);
            _this.commentaddloading = false;
        });
    };
    TileViewComponent.prototype.resetform = function () {
        this.viewfoocomment.controls['viewfoocommenttext'].updateValue('');
    };
    TileViewComponent.prototype.openpopover = function (index) {
        $("#sharing_" + index).toggle();
    };
    TileViewComponent.prototype.shareFb = function (id) {
        var url = 'https://viewfoo.pro/viewfoodetail/' + id;
        FB.ui({
            method: 'share',
            name: 'viewfoo',
            link: url,
            caption: 'test',
            message: "test for viewfoo",
            picture: "",
            href: "https://viewfoo.pro/viewfoodetail/" + id
        }, function (response) { });
    };
    TileViewComponent.prototype.openpasswordpopup = function (id) {
        this.viewfoopasswordid = id;
        $('#passwordModal').modal('show');
    };
    TileViewComponent.prototype.unlockviewfoo = function (id) {
        this.viewfoopasswordid = id;
        $('#unlockpasswordModal').modal('show');
    };
    TileViewComponent.prototype.changeinviewfoolist = function (event) {
        var id = event.id;
        var value = event.value;
        for (var i = 0; i < this.viewfoolist.length; i++) {
            if (this.viewfoolist[i].id == id) {
                this.viewfoolist[i].ispasswordprotected = value;
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TileViewComponent.prototype, "viewfoolist", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TileViewComponent.prototype, "onDelViewfoo", void 0);
    TileViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'centertileview',
            templateUrl: 'tileview.component.html',
            directives: [pagination_component_1.PaginationComponent, forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, passwordprotectmodal_component_1.PasswordProtectModal]
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService, forms_1.FormBuilder])
    ], TileViewComponent);
    return TileViewComponent;
}());
exports.TileViewComponent = TileViewComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2NlbnRlci10aWxlLXZpZXcvdGlsZXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxxQkFFSyxlQUFlLENBQUMsQ0FBQTtBQUNyQix1QkFBOEIsaUJBQWlCLENBQUMsQ0FBQTtBQUNoRCxzQkFBMEYsZ0JBQWdCLENBQUMsQ0FBQTtBQUMzRyx1QkFBZ0QsaUJBQWlCLENBQUMsQ0FBQTtBQUVsRSw2QkFBNEIsb0NBQW9DLENBQUMsQ0FBQTtBQUdqRSxxQ0FBa0MsOENBQThDLENBQUMsQ0FBQTtBQUNqRixJQUFPLFNBQVMsV0FBVyxlQUFlLENBQUMsQ0FBQztBQUM1QyxpQ0FBK0IscUNBQXFDLENBQUMsQ0FBQTtBQUNyRSwrQ0FBcUMsMEVBQTBFLENBQUMsQ0FBQTtBQU9oSDtJQW1DSSwyQkFBb0IsT0FBZSxFQUFVLFdBQXdCLEVBQVUsT0FBb0I7UUFBL0UsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBYTtRQWhDakYsaUJBQVksR0FBeUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFHMUUsZUFBVSxHQUFXLFNBQVMsQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUM7UUFDOUQsYUFBUSxHQUFXLFNBQVMsQ0FBQyxRQUFRLEdBQUcsaUJBQWlCLENBQUM7UUFDMUQsb0JBQWUsR0FBVyxTQUFTLENBQUMsUUFBUSxHQUFHLGtCQUFrQixDQUFDO1FBQzNELGFBQVEsR0FBWSxJQUFJLENBQUM7UUFDaEMsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBS25DLHVCQUFrQixHQUFnQixJQUFJLG1CQUFXLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFJM0UsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixhQUFRLEdBQWdCLElBQUksbUJBQVcsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENB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QixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCwrQ0FBbUIsR0FBbkIsVUFBb0IsS0FBVTtRQUN6QixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQ3pCLElBQUksS0FBSyxHQUFXLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFFMUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQy9DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1lBQ3BELENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQTNMRDtRQUFDLFlBQUssRUFBRTs7MERBQUE7SUFDUjtRQUFDLGFBQU0sRUFBRTs7MkRBQUE7SUFUYjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFVBQVUsRUFBRSxDQUFDLDBDQUFtQixFQUFFLGdDQUF3QixFQUFFLHdCQUFlLEVBQUMscURBQW9CLENBQUM7U0FDcEcsQ0FBQzs7eUJBQUE7SUFpTUYsd0JBQUM7QUFBRCxDQWhNQSxBQWdNQyxJQUFBO0FBaE1ZLHlCQUFpQixvQkFnTTdCLENBQUEiLCJmaWxlIjoiYXBwL2hvbWUvY2VudGVyLXRpbGUtdmlldy90aWxldmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZH1cbmZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBWYWxpZGF0b3JzLCBGb3JtQnVpbGRlciwgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtSb3V0ZXMsIFJvdXRlciwgUk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdmb28gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQge1BhZ2luYXRpb25Db21wb25lbnR9IGZyb20gJy4uLy4uL3NoYXJlZC9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50JztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi8uLi9nbG9iYWxzJyk7XG5pbXBvcnQge0N1c3RvbVZhbGlkYXRvcnN9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy9DdXN0b21WYWxpZGF0b3JzJztcbmltcG9ydCB7IFBhc3N3b3JkUHJvdGVjdE1vZGFsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3dpZGdldHMvcGFzc3dvcmRwcm90ZWN0bW9kYWwvcGFzc3dvcmRwcm90ZWN0bW9kYWwuY29tcG9uZW50JztcbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdjZW50ZXJ0aWxldmlldycsXG4gICAgdGVtcGxhdGVVcmw6ICd0aWxldmlldy5jb21wb25lbnQuaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW1BhZ2luYXRpb25Db21wb25lbnQsIFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUywgQ09SRV9ESVJFQ1RJVkVTLFBhc3N3b3JkUHJvdGVjdE1vZGFsXVxufSlcbmV4cG9ydCBjbGFzcyBUaWxlVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgdmlld2Zvb2xpc3Q6IGFueTtcbiAgICBAT3V0cHV0KCkgcHJpdmF0ZSBvbkRlbFZpZXdmb286IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHZpZXdmb29jb21tZW50aWQ6IHN0cmluZztcbiAgIFxuICAgIHNlcnZpY2VVcmw6IHN0cmluZyA9IG15R2xvYmFscy5zZXJ2aWNlVXJsICsgJy91cGxvYWQvZ2FsbGVyeSc7XG4gICAgaW1hZ2VVcmw6IHN0cmluZyA9IG15R2xvYmFscy5pbWFnZVVybCArICcvdXBsb2FkL2dhbGxlcnknO1xuICAgIHByb2ZpbGVpbWFnZVVybDogc3RyaW5nID0gbXlHbG9iYWxzLmltYWdlVXJsICsgJy91cGxvYWQvcHJvZmlsZXMnO1xuICAgIHB1YmxpYyBpc0VuYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgY29tbWVudGFkZGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBsb2dpblVzZXI6IGFueTtcbiAgICB2aWV3Zm9vY29tbWVudHM6IGFueTtcbiAgXG4gICBcbiAgICB2aWV3Zm9vY29tbWVudHRleHQ6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKFwiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgIHZpZXdmb29jb21tZW50OiBGb3JtR3JvdXA7XG4gICAgLy9mb3IgcGFzc3B3cmQgcHJvdGVjdGVkXG4gICAgdmlld2Zvb3Bhc3N3b3JkOiBGb3JtR3JvdXA7XG4gICAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHBhc3N3b3JkOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbChcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICBjb25maXJtcGFzc3dvcmQ6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKFwiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgIGdlbmVyYXRlZHBhc3N3b3JkOiBGb3JtQ29udHJvbDtcbiAgICB2aWV3Zm9vcGFzc3dvcmRpZDpzdHJpbmc7XG4gICAgdmlld2Zvb3Bhc3N3b3JkdHlwZTpzdHJpbmc9XCJhdXRvcGFzc3dvcmRcIjtcbiAgICBnZW5lcmF0ZW93bnBhc3N3b3JkOiBib29sZWFuID0gdHJ1ZTtcbiAgICBjaGttYWlsOkZvcm1Db250cm9sPWZhbHNlO1xuICAgIGNoa3NtczpGb3JtQ29udHJvbD1mYWxzZTtcbiAgICBwdWJsaWMgY2hlY2tlbWFpbDpib29sZWFuPWZhbHNlO1xuICAgIHB1YmxpYyBjaGVja3Ntczpib29sZWFuPWZhbHNlO1xuICAgIHB1YmxpYyB1bmxvY2t2aWV3Zm9vaWQ6c3RyaW5nO1xuICAgIHB1YmxpYyBpc2Vycm9yOmJvb2xlYW49ZmFsc2U7XG4gICAgcHVibGljIGNoZWNrdW5sb2Nrc21zOmJvb2xlYW49ZmFsc2U7XG4gICAgLy9lbmQgb2YgcGFzc3dvcmQgcHJvdGVjdGVkXG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIGJ1aWxkZXI6IEZvcm1CdWlsZGVyKSB7XG4gICAgICAgIHRoaXMubG9naW5Vc2VyID0gbXlHbG9iYWxzLkxvZ2luVXNlcjtcblxuICAgICAgICB0aGlzLnZpZXdmb29jb21tZW50ID0gYnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICBcInZpZXdmb29jb21tZW50dGV4dFwiOiB0aGlzLnZpZXdmb29jb21tZW50dGV4dFxuICAgICAgICB9KTtcbiAgICAgICAgLy9mb3IgcGFzc3dvcmQgcHJvdGVjdGVkXG4gICAgICAgIHRoaXMudmlld2Zvb3Bhc3N3b3JkID0gYnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICBcInBhc3N3b3JkXCI6IHRoaXMucGFzc3dvcmQsXG4gICAgICAgICAgICBcImdlbmVyYXRlZHBhc3N3b3JkXCI6IHRoaXMuZ2VuZXJhdGVkcGFzc3dvcmQsXG4gICAgICAgICAgICBcImNoa21haWxcIjp0aGlzLmNoa21haWwsXG4gICAgICAgICAgICBcImNoa3Ntc1wiOnRoaXMuY2hrc21zLFxuICAgICAgICAgICAgY29uZmlybXBhc3N3b3JkOiB0aGlzLmNvbmZpcm1wYXNzd29yZCxcblxuICAgICAgICB9LCBcbiAgICAgICAgeyB2YWxpZGF0b3I6IEN1c3RvbVZhbGlkYXRvcnMubWF0Y2hpbmdQYXNzd29yZHMoJ3Bhc3N3b3JkJywgJ2NvbmZpcm1wYXNzd29yZCcpIH0pO1xuICAgICAgICAvL2VuZCBvZiBwYXNzd29yZCBwcm90ZWN0ZWRcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICAgICAgICAgJChcIi5DQnBhc3N3b3JkdHlwZVwiKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoZWNrZWQgPSAkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICQoXCIuQ0JwYXNzd29yZHR5cGVcIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmltYWdlc2l6ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgdGhpcy52aWV3Zm9vcGFzc3dvcmQuY29udHJvbHNbJ2Noa21haWwnXS51cGRhdGVWYWx1ZShmYWxzZSk7XG4gICAgICAgICAgdGhpcy52aWV3Zm9vcGFzc3dvcmQuY29udHJvbHNbJ2Noa3NtcyddLnVwZGF0ZVZhbHVlKGZhbHNlKTtcbiAgICAgICAgbGV0IGZvcm1kYXRhID0gdGhpcy52aWV3Zm9vY29tbWVudC52YWx1ZTtcbiAgICAgICBcbiAgICAgICAgd2luZG93LmZiQXN5bmNJbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBGQi5pbml0KHtcbiAgICAgICAgICAgICAgICBhcHBJZDogJzEwODMxNjgzNTUxMDc0MjMnLFxuICAgICAgICAgICAgICAgIHhmYm1sOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZlcnNpb246ICd2Mi43J1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfTtcbiAgICAgICAgIChmdW5jdGlvbihkLCBzLCBpZCkge1xuICAgICAgICAgICAgIHZhciBqcywgZmpzID0gZC5nZXRFbGVtZW50c0J5VGFnTmFtZShzKVswXTtcbiAgICAgICAgICAgICBpZiAoZC5nZXRFbGVtZW50QnlJZChpZCkpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICAganMgPSBkLmNyZWF0ZUVsZW1lbnQocyk7IGpzLmlkID0gaWQ7XG4gICAgICAgICAgICAganMuc3JjID0gXCIvL2Nvbm5lY3QuZmFjZWJvb2submV0L2VuX1VTL3Nkay5qc1wiO1xuICAgICAgICAgICAgIGZqcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShqcywgZmpzKTtcbiAgICAgICAgIH0gKGRvY3VtZW50LCAnc2NyaXB0JywgJ2ZhY2Vib29rLWpzc2RrJykpO1xuICAgICBcbiAgICB9XG5cbiAgICBnb3RvZ2FsbGFyeSh2aWV3Zm9vaWQ6IGFueSkge1xuICAgICAgICBsZXQgbGluayA9IFsnL3ZpZXdmb29kZXRhaWwnLCB2aWV3Zm9vaWRdO1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUobGluayk7XG4gICAgfVxuXG4gICAgb25FZGl0Vmlld2Zvbyh2aWV3Zm9vaWQ6IGFueSkge1xuICAgICAgICBsZXQgbGluayA9IFsnL2dhbGxhcnknLCB2aWV3Zm9vaWRdO1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUobGluayk7XG4gICAgfVxuXG4gICAgb25EZWxldGVWaWV3Zm9vKHZpZXdmb29pZDogYW55LCB2aWV3Zm9vaW5kZXgpIHtcbiAgICAgICAgLy90aGlzLm9uRGVsVmlld2Zvby5lbWl0KHZpZXdmb29pZCk7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb2RlbGV0ZSh2aWV3Zm9vaWQpXG5cdFx0XHQuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcblxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld2Zvb2xpc3Quc3BsaWNlKHZpZXdmb29pbmRleCwgMSk7XG5cblx0XHRcdH0sIChlcnJvcjogYW55KSA9PiB7XG5cdFx0XHRcdHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcblx0XHRcdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cblx0XHRcdFx0Y29uc29sZS5sb2coXCJ2aWV3Zm9vIGRlbGV0ZSBmYWlsOiBcIiArIGVycm9yKTtcblx0XHRcdH0pO1xuICAgIH1cbiAgICBnZXRDb21tZW50KHZpZXdmb29pZDpzdHJpbmcpe1xuICAgICAgIHRoaXMudmlld2Zvb2NvbW1lbnRzPVtdO1xuICAgICAgIHRoaXMudmlld2Zvb2NvbW1lbnRpZCA9IHZpZXdmb29pZDtcbiAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb29nZXRjb21tZW50KHRoaXMudmlld2Zvb2NvbW1lbnRpZClcblx0XHRcdC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlld2Zvb2NvbW1lbnRzPXJlc3VsdC5kYXRhO1xuXHRcdFx0fSwgKGVycm9yOiBhbnkpID0+IHtcblx0XHRcdFx0dGhpcy5lcnJvck1zZyA9IGVycm9yO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcInZpZXdmb28gZ2V0IGZhaWw6IFwiICsgZXJyb3IpO1xuXHRcdFx0fSk7XG4gICAgICAgIFxuICAgIH1cbiAgICBkb0NvbW1lbnQoKXtcbiAgICAgICAgdGhpcy5jb21tZW50YWRkbG9hZGluZyA9IHRydWU7XG4gICAgICAgIGxldCBjb21tZW50ZGF0YSA9IHRoaXMudmlld2Zvb2NvbW1lbnR0ZXh0LnZhbHVlO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb29hZGRjb21tZW50KHRoaXMubG9naW5Vc2VyLmlkLCd2aWV3Zm9vJyxjb21tZW50ZGF0YSx0aGlzLnZpZXdmb29jb21tZW50aWQpXG5cdFx0XHQuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb29nZXRjb21tZW50KHRoaXMudmlld2Zvb2NvbW1lbnRpZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQxKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Zm9vY29tbWVudHM9cmVzdWx0MS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldGZvcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpZXdmb28gZ2V0IGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbWVudGFkZGxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdH0sIChlcnJvcjogYW55KSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwidmlld2ZvbyBhZGQgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbWVudGFkZGxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdH0pO1xuICAgIH1cbiAgICBcbiAgICByZXNldGZvcm0oKXsgICAgICBcbiAgICAgICAgdGhpcy52aWV3Zm9vY29tbWVudC5jb250cm9sc1sndmlld2Zvb2NvbW1lbnR0ZXh0J10udXBkYXRlVmFsdWUoJycpO1xuICAgIH1cbiBcbiAgICBvcGVucG9wb3ZlcihpbmRleDpzdHJpbmcpe1xuICAgICAgICAkKFwiI3NoYXJpbmdfXCIraW5kZXgpLnRvZ2dsZSgpO1xuICAgIH1cbiAgICBzaGFyZUZiKGlkOnN0cmluZyl7XG4gICAgICAgIGxldCB1cmw9J2h0dHBzOi8vdmlld2Zvby5wcm8vdmlld2Zvb2RldGFpbC8nK2lkOyAgICAgIFxuICAgICAgICAgICAgRkIudWkoXG4gICAgICAgICAgICAgICAgeyAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdzaGFyZScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3ZpZXdmb28nLFxuICAgICAgICAgICAgICAgIGxpbms6IHVybCxcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiAndGVzdCcsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJ0ZXN0IGZvciB2aWV3Zm9vXCIsXG4gICAgICAgICAgICAgICAgcGljdHVyZTogXCJcIixcbiAgICAgICAgICAgICAgICBocmVmOiBcImh0dHBzOi8vdmlld2Zvby5wcm8vdmlld2Zvb2RldGFpbC9cIitpZFxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKXt9KTtcbiAgICB9XG4gICAgXG4gICAgLy9mb3IgcGFzc3dvcmQgcHJvdGVjdGVkXG4gICAgXG4gICAgb3BlbnBhc3N3b3JkcG9wdXAoaWQpIHtcbiAgICAgICAgdGhpcy52aWV3Zm9vcGFzc3dvcmRpZCA9IGlkO1xuICAgICAgICAkKCcjcGFzc3dvcmRNb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG4gICAgICAgIC8vdGhpcy5nZW5lcmF0ZXBhc3N3b3JkKCk7XG4gICAgfVxuICAgIHVubG9ja3ZpZXdmb28oaWQpe1xuICAgICAgICAgdGhpcy52aWV3Zm9vcGFzc3dvcmRpZCA9IGlkO1xuICAgICAgICAkKCcjdW5sb2NrcGFzc3dvcmRNb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG4gICAgfVxuXG4gICAgY2hhbmdlaW52aWV3Zm9vbGlzdChldmVudDogYW55KSB7XG4gICAgICAgIFx0bGV0IGlkID0gZXZlbnQuaWQ7XG5cdFx0bGV0IHZhbHVlIDpib29sZWFuPSBldmVudC52YWx1ZTtcbiAgICAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy52aWV3Zm9vbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudmlld2Zvb2xpc3RbaV0uaWQgPT0gaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdmb29saXN0W2ldLmlzcGFzc3dvcmRwcm90ZWN0ZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vZW5kIG9mIHBhc3N3b3JkIHByb3RlY3RlZFxufVxuIl19
