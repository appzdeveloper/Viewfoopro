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
var forms_1 = require('@angular/forms');
var auth_service_1 = require('../shared/services/auth.service');
var CustomValidators_1 = require('../shared/utils/CustomValidators');
var ForgotPasswordComponent = (function () {
    function ForgotPasswordComponent(builder, _router, authService) {
        this.builder = builder;
        this._router = _router;
        this.authService = authService;
        this.email = new forms_1.FormControl("", forms_1.Validators.compose([forms_1.Validators.required, CustomValidators_1.CustomValidators.emailValidator]));
        this.loading = false;
        this.fpassform = builder.group({
            "email": this.email,
            "password": this.password
        });
    }
    ForgotPasswordComponent.prototype.forgotPassword = function () {
        var _this = this;
        this.loading = true;
        var formdata = this.fpassform.value;
        this.authService.forgotpassword(formdata.email)
            .subscribe(function (result) {
            _this.message = result.data;
            _this.loading = false;
        }, function (error) {
            _this.message = error;
            _this.loading = false;
            console.log("send mail fail: " + error);
        });
    };
    ForgotPasswordComponent.prototype.gotologin = function () {
        this._router.navigate(['/login']);
    };
    ForgotPasswordComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'forgotpassword',
            templateUrl: 'forgotpassword.component.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES],
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, auth_service_1.AuthService])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());
exports.ForgotPasswordComponent = ForgotPasswordComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9mb3Jnb3RwYXNzd29yZC9mb3Jnb3RwYXNzd29yZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFnQyxlQUFlLENBQUMsQ0FBQTtBQUNoRCx1QkFBd0MsaUJBQWlCLENBQUMsQ0FBQTtBQUkxRCxzQkFDUyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQzFCLDZCQUE0QixpQ0FBaUMsQ0FBQyxDQUFBO0FBRzlELGlDQUErQixrQ0FBa0MsQ0FBQyxDQUFBO0FBV2xFO0lBUUksaUNBQW9CLE9BQW9CLEVBQVUsT0FBZSxFQUFVLFdBQXdCO1FBQS9FLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFMcEcsVUFBSyxHQUFnQixJQUFJLG1CQUFXLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsa0JBQVUsQ0FBQyxRQUFRLEVBQUUsbUNBQWdCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBR3BILFlBQU8sR0FBWSxLQUFLLENBQUM7UUFHckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQzNCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSztZQUNuQixVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDNUIsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUNELGdEQUFjLEdBQWQ7UUFBQSxpQkFjQztRQWJJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7YUFDMUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNkLEtBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUMxQixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDLEVBQ0QsVUFBQyxLQUFVO1lBQ1AsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUVYLENBQUM7SUFHRCwyQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUExQ0w7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxVQUFVLEVBQUUsQ0FBQyxnQ0FBd0IsQ0FBQztTQUV6QyxDQUFDOzsrQkFBQTtJQXFDRiw4QkFBQztBQUFELENBbkNBLEFBbUNDLElBQUE7QUFuQ1ksK0JBQXVCLDBCQW1DbkMsQ0FBQSIsImZpbGUiOiJhcHAvZm9yZ290cGFzc3dvcmQvZm9yZ290cGFzc3dvcmQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTLCBSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG4vL2ltcG9ydCB7RXJyb3JPYnNlcnZhYmxlfSBmcm9tICdyeGpzL1J4Jztcbi8vaW1wb3J0IHtGT1JNX0RJUkVDVElWRVMsIEZvcm1CdWlsZGVyLCBDb250cm9sLCBDb250cm9sR3JvdXAsIFZhbGlkYXRvcnMsIG5nZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycywgRm9ybUJ1aWxkZXIsIFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUyB9IFxuICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uL2dsb2JhbHMnKTtcbmltcG9ydCB7Q3VzdG9tVmFsaWRhdG9yc30gZnJvbSAnLi4vc2hhcmVkL3V0aWxzL0N1c3RvbVZhbGlkYXRvcnMnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdmb3Jnb3RwYXNzd29yZCcsXG4gICAgdGVtcGxhdGVVcmw6ICdmb3Jnb3RwYXNzd29yZC5jb21wb25lbnQuaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW1JFQUNUSVZFX0ZPUk1fRElSRUNUSVZFU10sXG5cbn0pXG5cbmV4cG9ydCBjbGFzcyBGb3Jnb3RQYXNzd29yZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblxuICAgZW1haWw6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKFwiXCIsIFZhbGlkYXRvcnMuY29tcG9zZShbVmFsaWRhdG9ycy5yZXF1aXJlZCwgQ3VzdG9tVmFsaWRhdG9ycy5lbWFpbFZhbGlkYXRvcl0pKTtcbiAgICBmcGFzc2Zvcm06IEZvcm1Hcm91cDtcbiAgICBcbiAgICBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBidWlsZGVyOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuZnBhc3Nmb3JtID0gYnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICBcImVtYWlsXCI6IHRoaXMuZW1haWwsXG4gICAgICAgICAgICBcInBhc3N3b3JkXCI6IHRoaXMucGFzc3dvcmRcbiAgICAgICAgfSk7XG5cbiAgICB9XG4gICAgZm9yZ290UGFzc3dvcmQoKSB7XG4gICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICBsZXQgZm9ybWRhdGEgPSB0aGlzLmZwYXNzZm9ybS52YWx1ZTtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5mb3Jnb3RwYXNzd29yZChmb3JtZGF0YS5lbWFpbClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZCBtYWlsIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG5cblxuICAgIGdvdG9sb2dpbigpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xuICAgIH1cbn1cbiJdfQ==
