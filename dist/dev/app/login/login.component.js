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
var myGlobals = require('../globals');
var CustomValidators_1 = require('../shared/utils/CustomValidators');
var LoginComponent = (function () {
    function LoginComponent(builder, _router, authService) {
        this.builder = builder;
        this._router = _router;
        this.authService = authService;
        this.email = new forms_1.FormControl("", forms_1.Validators.compose([forms_1.Validators.required, CustomValidators_1.CustomValidators.emailValidator]));
        this.password = new forms_1.FormControl("", forms_1.Validators.required);
        this.invalid = false;
        this.loading = false;
        this.loginform = builder.group({
            "email": this.email,
            "password": this.password
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (myGlobals.LoginUser) {
            this._router.navigate(['/']);
        }
    };
    LoginComponent.prototype.doLogin = function () {
        var _this = this;
        var today = new Date();
        var formdata = this.loginform.value;
        console.log(formdata);
        this.loading = true;
        this.authService.login(formdata.email, formdata.password)
            .subscribe(function (result) {
            window.localStorage['user'] = JSON.stringify(result.data);
            _this.loginUser = result.data;
            console.log(_this.loginUser);
            myGlobals.LoginUser = _this.loginUser;
            _this._router.navigate(['/']);
            _this.loading = false;
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("LoginComponent login fail: " + error);
        });
    };
    LoginComponent.prototype.changemsgstatus = function () {
        this.invalid = false;
    };
    LoginComponent.prototype.gotoSignup = function () {
        this._router.navigate(['/signup']);
    };
    LoginComponent.prototype.gotofpass = function () {
        this._router.navigate(['/forgotpassword']);
    };
    LoginComponent.prototype.reset = function () {
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: 'login.component.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES],
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, auth_service_1.AuthService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sb2dpbi9sb2dpbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFnQyxlQUFlLENBQUMsQ0FBQTtBQUNoRCx1QkFBd0MsaUJBQWlCLENBQUMsQ0FBQTtBQUkxRCxzQkFDUyxnQkFBZ0IsQ0FBQyxDQUFBO0FBRTFCLDZCQUE0QixpQ0FBaUMsQ0FBQyxDQUFBO0FBRTlELElBQU8sU0FBUyxXQUFXLFlBQVksQ0FBQyxDQUFDO0FBQ3pDLGlDQUErQixrQ0FBa0MsQ0FBQyxDQUFBO0FBVWxFO0lBcUJJLHdCQUFvQixPQUFvQixFQUFVLE9BQWUsRUFBVSxXQUF3QjtRQUEvRSxZQUFPLEdBQVAsT0FBTyxDQUFhO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBakJuRyxVQUFLLEdBQWdCLElBQUksbUJBQVcsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsRUFBRSxtQ0FBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckgsYUFBUSxHQUFnQixJQUFJLG1CQUFXLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFJakUsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBWWpCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUMvQixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDbkIsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQzVCLENBQUMsQ0FBQztJQUVQLENBQUM7SUFkRCxpQ0FBUSxHQUFSO1FBRUksRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7SUFDTCxDQUFDO0lBVUQsZ0NBQU8sR0FBUDtRQUFBLGlCQTBCQztRQXpCTSxJQUFJLEtBQUssR0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3hCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDO2FBQ3BELFNBQVMsQ0FBQyxVQUFDLE1BQU07WUFDZCxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTFELEtBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1QixTQUFTLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUM7WUFPckMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRTdCLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUMsRUFBRSxVQUFDLEtBQVU7WUFDVixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFBO0lBQ1YsQ0FBQztJQUVELHdDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRUQsbUNBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0Qsa0NBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDRCw4QkFBSyxHQUFMO0lBV0EsQ0FBQztJQXRGTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLE9BQU87WUFDakIsV0FBVyxFQUFFLHNCQUFzQjtZQUNsQyxVQUFVLEVBQUUsQ0FBQyxnQ0FBd0IsQ0FBQztTQUUxQyxDQUFDOztzQkFBQTtJQWlGRixxQkFBQztBQUFELENBL0VBLEFBK0VDLElBQUE7QUEvRVksc0JBQWMsaUJBK0UxQixDQUFBIiwiZmlsZSI6ImFwcC9sb2dpbi9sb2dpbi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVMsIFJvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbi8vaW1wb3J0IHtGT1JNX0RJUkVDVElWRVMsIEZvcm1CdWlsZGVyLCBDb250cm9sLCBDb250cm9sR3JvdXAsIFZhbGlkYXRvcnMsIG5nZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbi8vaW1wb3J0IHtFcnJvck9ic2VydmFibGV9IGZyb20gJ3J4anMvUngnO1xuXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBWYWxpZGF0b3JzLCBGb3JtQnVpbGRlciwgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTIH0gXG4gICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuICAgIFxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vZ2xvYmFscycpO1xuaW1wb3J0IHtDdXN0b21WYWxpZGF0b3JzfSBmcm9tICcuLi9zaGFyZWQvdXRpbHMvQ3VzdG9tVmFsaWRhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdsb2dpbicsXG4gICAgdGVtcGxhdGVVcmw6ICdsb2dpbi5jb21wb25lbnQuaHRtbCcsXG4gICAgIGRpcmVjdGl2ZXM6IFtSRUFDVElWRV9GT1JNX0RJUkVDVElWRVNdLFxuXG59KVxuXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgbG9naW5Vc2VyOiBVc2VyO1xuICBcbiAgICBlbWFpbDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woXCJcIiwgVmFsaWRhdG9ycy5jb21wb3NlKFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBDdXN0b21WYWxpZGF0b3JzLmVtYWlsVmFsaWRhdG9yXSkpO1xuICAgIHBhc3N3b3JkOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbChcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICBsb2dpbmZvcm06IEZvcm1Hcm91cDtcblxuICAgIGVycm9yTXNnOiBzdHJpbmc7XG4gICAgaW52YWxpZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBcblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIGlmIChteUdsb2JhbHMuTG9naW5Vc2VyKSB7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvJ10pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBidWlsZGVyOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XG4gICAgICAgXG4gICAgICAgICAgICB0aGlzLmxvZ2luZm9ybSA9IGJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgXCJlbWFpbFwiOiB0aGlzLmVtYWlsLFxuICAgICAgICAgICAgXCJwYXNzd29yZFwiOiB0aGlzLnBhc3N3b3JkXG4gICAgICAgIH0pO1xuXG4gICAgfVxuICAgIGRvTG9naW4oKSB7XG4gICAgICAgICAgIGxldCB0b2RheT1uZXcgRGF0ZSgpO1xuICAgICAgICBsZXQgZm9ybWRhdGEgPSB0aGlzLmxvZ2luZm9ybS52YWx1ZTtcbiAgICAgICAgY29uc29sZS5sb2coZm9ybWRhdGEpO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmxvZ2luKGZvcm1kYXRhLmVtYWlsLCBmb3JtZGF0YS5wYXNzd29yZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ3VzZXInXSA9IEpTT04uc3RyaW5naWZ5KHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMubG9naW5Vc2VyID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5sb2dpblVzZXIpO1xuICAgICAgICAgICAgICAgIG15R2xvYmFscy5Mb2dpblVzZXIgPSB0aGlzLmxvZ2luVXNlcjtcbiAgICAgICAgICAgICAgIC8vIGxldCBzdWJzY3JpYmVlbmRkYXRlID0gbmV3IERhdGUodGhpcy5sb2dpblVzZXIuc3Vic2NyaXB0aW9uZW5kZGF0ZSk7XG4vLyAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICAgICBpZihzdWJzY3JpYmVlbmRkYXRlIDw9IHRvZGF5KXtcbi8vICAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvdHJpYWxiaWxsaW5nJ10pO1xuLy8gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgLy8gZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvJ10pO1xuICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dpbkNvbXBvbmVudCBsb2dpbiBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgY2hhbmdlbXNnc3RhdHVzKCkge1xuICAgICAgICB0aGlzLmludmFsaWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBnb3RvU2lnbnVwKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvc2lnbnVwJ10pO1xuICAgIH1cbiAgICBnb3RvZnBhc3MoKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9mb3Jnb3RwYXNzd29yZCddKTtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG5cbiAgICAgICAgLy90aGlzLmxvZ2luZm9ybS5jb250cm9scy5mb3JFYWNoKChuYW1lLCBjb250cm9sKSA9PiB7XG4gICAgICAgIC8vIGNvbnRyb2wudXBkYXRlVmFsdWUoJycpO1xuICAgICAgICAvLyBjb250cm9sLnNldEVycm9ycyhudWxsKTtcbiAgICAgICAgLy8gIH0pO1xuLy8gICAgICAgIHRoaXMubG9naW5mb3JtLmNvbnRyb2xzW1wiZW1haWxcIl0udXBkYXRlVmFsdWUoXCJcIilcbi8vICAgICAgICB0aGlzLmxvZ2luZm9ybS5jb250cm9sc1tcImVtYWlsXCJdLnNldEVycm9ycyhudWxsKVxuLy8gICAgICAgIHRoaXMubG9naW5mb3JtLmNvbnRyb2xzW1wicGFzc3dvcmRcIl0udXBkYXRlVmFsdWUoXCJcIilcbi8vICAgICAgICB0aGlzLmxvZ2luZm9ybS5jb250cm9sc1tcInBhc3N3b3JkXCJdLnNldEVycm9ycyhudWxsKVxuXG4gICAgfVxufVxuIl19
