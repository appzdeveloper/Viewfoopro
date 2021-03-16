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
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var auth_service_1 = require('../shared/services/auth.service');
var CustomValidators_1 = require('../shared/utils/CustomValidators');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/do');
var SignUpComponent = (function () {
    function SignUpComponent(builder, _router, authService, http) {
        this.builder = builder;
        this._router = _router;
        this.authService = authService;
        this.http = http;
        this.invalid = false;
        this.loading = false;
        this.invaliddomain = true;
        this.active = true;
        this.statusCode = 200;
        this.createForm();
    }
    SignUpComponent.prototype.ngOnInit = function () {
    };
    SignUpComponent.prototype.createForm = function () {
        this.firstname = new forms_1.FormControl("", forms_1.Validators.required);
        this.lastname = new forms_1.FormControl("", forms_1.Validators.required);
        this.email = new forms_1.FormControl("", forms_1.Validators.compose([forms_1.Validators.required, CustomValidators_1.CustomValidators.emailValidator]));
        this.subdomain = new forms_1.FormControl("", forms_1.Validators.required);
        this.password = new forms_1.FormControl("", forms_1.Validators.required);
        this.confirmpassword = new forms_1.FormControl("", forms_1.Validators.required);
        this.regform = this.builder.group({
            "firstname": this.firstname,
            "lastname": this.lastname,
            "email": this.email,
            "subdomain": this.subdomain,
            "password": this.password,
            confirmpassword: this.confirmpassword,
        }, { validator: CustomValidators_1.CustomValidators.matchingPasswords('password', 'confirmpassword') });
    };
    SignUpComponent.prototype.doSignup = function () {
        var _this = this;
        var formdata = this.regform.value;
        console.log(formdata);
        this.loading = true;
        this.authService.register(formdata)
            .subscribe(function (result) {
            _this.message = result.data;
            _this.active = false;
            _this.loading = false;
            _this.reset();
        }, function (error) {
            _this.message = error;
            _this.loading = false;
            console.log("RegisterComponent  fail: " + error);
        });
    };
    SignUpComponent.prototype.reset = function () {
        this.createForm();
    };
    SignUpComponent.prototype.gotoLogin = function () {
        this._router.navigate(['/login']);
    };
    SignUpComponent.prototype.chksubdomain = function (subdomain) {
        var _this = this;
        if (subdomain.length != 0) {
            this.authService.chksubdomain(subdomain)
                .subscribe(function (result) {
                _this.invaliddomain = false;
            }, function (error) {
                _this.domainmessage = error;
                _this.invaliddomain = true;
                console.log("subdomain  fail: " + error);
            });
        }
    };
    SignUpComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'signup',
            templateUrl: 'signup.component.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, auth_service_1.AuthService, http_1.Http])
    ], SignUpComponent);
    return SignUpComponent;
}());
exports.SignUpComponent = SignUpComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWdudXAvc2lnbnVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBQ2hELHVCQUF3QyxpQkFBaUIsQ0FBQyxDQUFBO0FBRTFELHFCQUErQixlQUFlLENBQUMsQ0FBQTtBQUcvQyxzQkFDSyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3RCLDZCQUE0QixpQ0FBaUMsQ0FBQyxDQUFBO0FBRzlELGlDQUErQixrQ0FBa0MsQ0FBQyxDQUFBO0FBRWxFLFFBQU8sdUJBQXVCLENBQUMsQ0FBQTtBQUMvQixRQUFPLHlCQUF5QixDQUFDLENBQUE7QUFDakMsUUFBTywyQkFBMkIsQ0FBQyxDQUFBO0FBRW5DLFFBQU8sc0JBQXNCLENBQUMsQ0FBQTtBQWE5QjtJQW1CSSx5QkFBb0IsT0FBb0IsRUFBVSxPQUFlLEVBQVUsV0FBd0IsRUFBVSxJQUFVO1FBQW5HLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBVnZILFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUd6QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGVBQVUsR0FBVyxHQUFHLENBQUM7UUFPckIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBRXRCLENBQUM7SUFSRCxrQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQVFELG9DQUFVLEdBQVY7UUFFSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksbUJBQVcsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksbUJBQVcsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUMs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RUMsQ0FBQztJQUNMLENBQUM7SUE5R0w7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsVUFBVSxFQUFFLENBQUMsZ0NBQXdCLENBQUM7U0FDekMsQ0FBQzs7dUJBQUE7SUEwR0Ysc0JBQUM7QUFBRCxDQXhHQSxBQXdHQyxJQURJO0FBdkdRLHVCQUFlLGtCQXVHdkIsQ0FBQSIsImZpbGUiOiJhcHAvc2lnbnVwL3NpZ251cC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVMsIFJvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbi8vaW1wb3J0IHtFcnJvck9ic2VydmFibGV9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IEhlYWRlcnMsIFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuLy9pbXBvcnQge0ZPUk1fRElSRUNUSVZFUywgRm9ybUJ1aWxkZXIsIENvbnRyb2wsIENvbnRyb2xHcm91cCwgVmFsaWRhdG9ycywgbmdmb3JtfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycywgRm9ybUJ1aWxkZXIsIFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUyB9XG5mcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi9nbG9iYWxzJyk7XG5pbXBvcnQge0N1c3RvbVZhbGlkYXRvcnN9IGZyb20gJy4uL3NoYXJlZC91dGlscy9DdXN0b21WYWxpZGF0b3JzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jYXRjaCc7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvdGhyb3cnO1xuLy9pbXBvcnQgJ3J4anMvUngnOyAgLy8gdXNlIHRoaXMgbGluZSBpZiB5b3Ugd2FudCB0byBiZSBsYXp5LCBvdGhlcndpc2U6XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2RvJzsgIC8vIGRlYnVnXG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcblxuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uLy4uL2dsb2JhbHMnKTtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ3NpZ251cCcsXG4gICAgdGVtcGxhdGVVcmw6ICdzaWdudXAuY29tcG9uZW50Lmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtSRUFDVElWRV9GT1JNX0RJUkVDVElWRVNdXG59KVxuXG5leHBvcnQgY2xhc3MgU2lnblVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGZpcnN0bmFtZTogRm9ybUNvbnRyb2w7XG4gICAgbGFzdG5hbWU6IEZvcm1Db250cm9sO1xuICAgIGVtYWlsOiBGb3JtQ29udHJvbDtcbiAgICBzdWJkb21haW46IEZvcm1Db250cm9sO1xuICAgIHBhc3N3b3JkOiBGb3JtQ29udHJvbDtcbiAgICBjb25maXJtcGFzc3dvcmQ6IEZvcm1Db250cm9sO1xuICAgIHJlZ2Zvcm06IEZvcm1Hcm91cDtcbiAgICBpbnZhbGlkOiBib29sZWFuID0gZmFsc2U7XG4gICAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gICAgcHVibGljIGRvbWFpbm1lc3NhZ2U6IHN0cmluZztcbiAgICBpbnZhbGlkZG9tYWluOiBib29sZWFuID0gdHJ1ZTtcbiAgICBhY3RpdmU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHN0YXR1c0NvZGU6IHN0cmluZyA9IDIwMDtcbiAgICBuZ09uSW5pdCgpIHtcblxuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJ1aWxkZXI6IEZvcm1CdWlsZGVyLCBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIHByaXZhdGUgaHR0cDogSHR0cCkge1xuXG5cbiAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XG5cbiAgICB9XG5cbiAgICBjcmVhdGVGb3JtKCkge1xuXG4gICAgICAgIHRoaXMuZmlyc3RuYW1lID0gbmV3IEZvcm1Db250cm9sKFwiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuXHRcdHRoaXMubGFzdG5hbWUgPSBuZXcgRm9ybUNvbnRyb2woXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG5cdFx0dGhpcy5lbWFpbCA9IG5ldyBGb3JtQ29udHJvbChcIlwiLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1ZhbGlkYXRvcnMucmVxdWlyZWQsIEN1c3RvbVZhbGlkYXRvcnMuZW1haWxWYWxpZGF0b3JdKSk7XG5cdFx0dGhpcy5zdWJkb21haW4gPSBuZXcgRm9ybUNvbnRyb2woXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG5cdFx0dGhpcy5wYXNzd29yZCA9IG5ldyBGb3JtQ29udHJvbChcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcblx0XHR0aGlzLmNvbmZpcm1wYXNzd29yZCA9IG5ldyBGb3JtQ29udHJvbChcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcblxuICAgICAgICB0aGlzLnJlZ2Zvcm0gPSB0aGlzLmJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgXCJmaXJzdG5hbWVcIjogdGhpcy5maXJzdG5hbWUsXG4gICAgICAgICAgICBcImxhc3RuYW1lXCI6IHRoaXMubGFzdG5hbWUsXG4gICAgICAgICAgICBcImVtYWlsXCI6IHRoaXMuZW1haWwsXG4gICAgICAgICAgICBcInN1YmRvbWFpblwiOiB0aGlzLnN1YmRvbWFpbixcbiAgICAgICAgICAgIFwicGFzc3dvcmRcIjogdGhpcy5wYXNzd29yZCxcbiAgICAgICAgICAgIGNvbmZpcm1wYXNzd29yZDogdGhpcy5jb25maXJtcGFzc3dvcmQsXG4gICAgICAgIH0sIHsgdmFsaWRhdG9yOiBDdXN0b21WYWxpZGF0b3JzLm1hdGNoaW5nUGFzc3dvcmRzKCdwYXNzd29yZCcsICdjb25maXJtcGFzc3dvcmQnKSB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZG9TaWdudXAoKSB7XG5cbiAgICAgICAgbGV0IGZvcm1kYXRhID0gdGhpcy5yZWdmb3JtLnZhbHVlO1xuICAgICAgICBjb25zb2xlLmxvZyhmb3JtZGF0YSk7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnJlZ2lzdGVyKGZvcm1kYXRhKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gcmVzdWx0LmRhdGFcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXJDb21wb25lbnQgIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xuXG4gICAgICAgIC8vdGhpcy5yZWdmb3JtLmNvbnRyb2xzW1wiZmlyc3RuYW1lXCJdLnVwZGF0ZVZhbHVlKFwiXCIpXG4gICAgICAgIC8vdGhpcy5yZWdmb3JtLmNvbnRyb2xzW1wiZmlyc3RuYW1lXCJdLnNldEVycm9ycyhudWxsKVxuICAgICAgICAvL3RoaXMucmVnZm9ybS5jb250cm9sc1tcImxhc3RuYW1lXCJdLnVwZGF0ZVZhbHVlKFwiXCIpXG4gICAgICAgIC8vdGhpcy5yZWdmb3JtLmNvbnRyb2xzW1wibGFzdG5hbWVcIl0uc2V0RXJyb3JzKG51bGwpXG4gICAgICAgIC8vdGhpcy5yZWdmb3JtLmNvbnRyb2xzW1wic3ViZG9tYWluXCJdLnVwZGF0ZVZhbHVlKFwiXCIpXG4gICAgICAgIC8vdGhpcy5yZWdmb3JtLmNvbnRyb2xzW1wic3ViZG9tYWluXCJdLnNldEVycm9ycyhudWxsKVxuICAgICAgICAvL3RoaXMucmVnZm9ybS5jb250cm9sc1tcImVtYWlsXCJdLnVwZGF0ZVZhbHVlKFwiXCIpXG4gICAgICAgIC8vdGhpcy5yZWdmb3JtLmNvbnRyb2xzW1wiZW1haWxcIl0uc2V0RXJyb3JzKG51bGwpXG4gICAgICAgIC8vdGhpcy5yZWdmb3JtLmNvbnRyb2xzW1wicGFzc3dvcmRcIl0udXBkYXRlVmFsdWUoXCJcIilcbiAgICAgICAgLy90aGlzLnJlZ2Zvcm0uY29udHJvbHNbXCJwYXNzd29yZFwiXS5zZXRFcnJvcnMobnVsbClcbiAgICAgICAgLy90aGlzLnJlZ2Zvcm0uY29udHJvbHNbXCJjcGFzc3dvcmRcIl0udXBkYXRlVmFsdWUoXCJcIilcbiAgICAgICAgLy90aGlzLnJlZ2Zvcm0uY29udHJvbHNbXCJjcGFzc3dvcmRcIl0uc2V0RXJyb3JzKG51bGwpXG4gICAgfVxuXG5cblxuICAgIGdvdG9Mb2dpbigpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xuICAgIH1cbiAgICBjaGtzdWJkb21haW4oc3ViZG9tYWluKSB7XG4gICAgICAgIGlmIChzdWJkb21haW4ubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2UuY2hrc3ViZG9tYWluKHN1YmRvbWFpbilcblx0XHRcdFx0LnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cdFx0XHRcdFx0Ly90aGlzLmRvbWFpbm1lc3NhZ2UgPSByZXN1bHQubWVzc2FnZVxuXHRcdFx0XHRcdHRoaXMuaW52YWxpZGRvbWFpbiA9IGZhbHNlO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQoZXJyb3I6IGFueSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuZG9tYWlubWVzc2FnZSA9IGVycm9yO1xuXHRcdFx0XHRcdHRoaXMuaW52YWxpZGRvbWFpbiA9IHRydWU7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJzdWJkb21haW4gIGZhaWw6IFwiICsgZXJyb3IpO1xuXHRcdFx0XHR9KTtcblxuICAgICAgICB9XG4gICAgfVxuIl19
