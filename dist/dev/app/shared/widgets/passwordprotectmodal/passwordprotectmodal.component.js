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
var auth_service_1 = require('../../services/auth.service');
var myGlobals = require('../../../globals');
var CustomValidators_1 = require('../../utils/CustomValidators');
var PasswordProtectModal = (function () {
    function PasswordProtectModal(_router, authService, builder) {
        this._router = _router;
        this.authService = authService;
        this.builder = builder;
        this.onchangeviewfoo = new core_1.EventEmitter();
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
        this.viewfoopassword = builder.group({
            "password": this.password,
            "generatedpassword": this.generatedpassword,
            "chkmail": this.chkmail,
            "chksms": this.chksms,
            confirmpassword: this.confirmpassword,
        }, { validator: CustomValidators_1.CustomValidators.matchingPasswords('password', 'confirmpassword') });
    }
    PasswordProtectModal.prototype.ngOnInit = function () {
        $(".CBpasswordtype").change(function () {
            var checked = $(this).is(':checked');
            $(".CBpasswordtype").prop('checked', false);
            if (checked) {
                $(this).prop('checked', true);
            }
        });
        this.viewfoopassword.controls['chkmail'].updateValue(false);
        this.viewfoopassword.controls['chksms'].updateValue(false);
        this.generatepassword();
    };
    PasswordProtectModal.prototype.generatepassword = function () {
        var _this = this;
        this.isloading = true;
        this.viewfoopassword.controls['generatedpassword'].setErrors(null);
        this.viewfoopassword.controls['confirmpassword'].setErrors(null);
        this.viewfoopassword.controls['password'].setErrors(null);
        this.authService.generaterandompw()
            .subscribe(function (result) {
            if (result) {
                _this.viewfoopassword.controls['generatedpassword'].updateValue(result.data);
                _this.isloading = false;
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.isloading = false;
            console.log("password generate fail: " + error);
        });
    };
    PasswordProtectModal.prototype.changepasswordtype = function (val) {
        if (val == 'own') {
            this.generateownpassword = false;
            this.viewfoopasswordtype = "yourpassword";
        }
        else if (val == 'generate') {
            this.generateownpassword = true;
            this.viewfoopasswordtype = "autopassword";
            this.viewfoopassword.controls['generatedpassword'].setErrors(null);
            this.viewfoopassword.controls['confirmpassword'].setErrors(null);
            this.viewfoopassword.controls['password'].setErrors(null);
        }
    };
    PasswordProtectModal.prototype.updateviewfoopasswprd = function () {
        var _this = this;
        this.isloading = true;
        var formdata = this.viewfoopassword.value;
        formdata["viewfoopasswordtype"] = this.viewfoopasswordtype;
        formdata["id"] = this.currViewfooid;
        formdata["ispasswordprotected"] = true;
        if (this.viewfoopasswordtype == "autopassword") {
            formdata["viewfoopassword"] = formdata.generatedpassword;
        }
        else if (this.viewfoopasswordtype == "yourpassword") {
            formdata["viewfoopassword"] = formdata.password;
        }
        this.authService.passwordprotectedviefoo(formdata)
            .subscribe(function (result) {
            if (result) {
                _this.changeviewfoo(_this.currViewfooid, true);
                _this.isloading = false;
                _this.resetpasswordform();
                $("#passwordModal").modal("hide");
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.isloading = false;
            console.log("password update fail: " + error);
        });
    };
    PasswordProtectModal.prototype.changeviewfoo = function (id, value) {
        this.item = { id: id, value: value };
        this.onchangeviewfoo.emit(this.item);
    };
    PasswordProtectModal.prototype.unlockpassword = function (unlockpw) {
        var _this = this;
        this.isloading = true;
        this.iserror = false;
        this.authService.unlockviewfoo(this.currViewfooid, unlockpw.value)
            .subscribe(function (result) {
            if (result) {
                _this.changeviewfoo(_this.currViewfooid, false);
                _this.iserror = true;
                unlockpw.value = null;
                _this.isloading = false;
                $("#unlockpasswordModal").modal("hide");
            }
        }, function (error) {
            _this.iserror = true;
            _this.errorMsg = error;
            _this.isloading = false;
            console.log("password update fail: " + error);
        });
    };
    PasswordProtectModal.prototype.resetpasswordform = function () {
        this.viewfoopassword.controls['confirmpassword'].updateValue('');
        this.viewfoopassword.controls['password'].updateValue('');
        this.viewfoopassword.controls['generatedpassword'].setErrors(null);
        this.viewfoopassword.controls['confirmpassword'].setErrors(null);
        this.viewfoopassword.controls['password'].setErrors(null);
    };
    PasswordProtectModal.prototype.sendpassword = function () {
        var _this = this;
        this.isloading = true;
        this.iserror = false;
        this.authService.forgotviewfoopassword(this.currViewfooid, this.checkunlocksms)
            .subscribe(function (result) {
            if (result) {
                _this.isloading = false;
                _this.iserror = true;
                _this.errorMsg = result.data;
            }
        }, function (error) {
            _this.iserror = true;
            _this.errorMsg = error;
            _this.isloading = false;
            console.log("password sending fail: " + error);
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PasswordProtectModal.prototype, "onchangeviewfoo", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PasswordProtectModal.prototype, "currViewfooid", void 0);
    PasswordProtectModal = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'passwordprotectmodal',
            templateUrl: 'passwordprotectmodal.component.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService, forms_1.FormBuilder])
    ], PasswordProtectModal);
    return PasswordProtectModal;
}());
exports.PasswordProtectModal = PasswordProtectModal;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvd2lkZ2V0cy9wYXNzd29yZHByb3RlY3Rtb2RhbC9wYXNzd29yZHByb3RlY3Rtb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHFCQUVLLGVBQWUsQ0FBQyxDQUFBO0FBQ3JCLHVCQUE4QixpQkFBaUIsQ0FBQyxDQUFBO0FBQ2hELHNCQUEwRixnQkFBZ0IsQ0FBQyxDQUFBO0FBQzNHLHVCQUFnRCxpQkFBaUIsQ0FBQyxDQUFBO0FBRWxFLDZCQUE0Qiw2QkFBNkIsQ0FBQyxDQUFBO0FBRzFELElBQU8sU0FBUyxXQUFXLGtCQUFrQixDQUFDLENBQUM7QUFDL0MsaUNBQStCLDhCQUE4QixDQUFDLENBQUE7QUFROUQ7SUFvQkksOEJBQW9CLE9BQWUsRUFBVSxXQUF3QixFQUFVLE9BQW9CO1FBQS9FLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFsQmpGLG9CQUFlLEdBQXlCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRzdFLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsYUFBUSxHQUFnQixJQUFJLG1CQUFXLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakUsb0JBQWUsR0FBZ0IsSUFBSSxtQkFBVyxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBR3hFLHdCQUFtQixHQUFXLGNBQWMsQ0FBQztRQUM3Qyx3QkFBbUIsR0FBWSxJQUFJLENBQUM7UUFDcEMsWUFBTyxHQUFnQixLQUFLLENBQUM7UUFDN0IsV0FBTSxHQUFnQixLQUFLLENBQUM7UUFDckIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBRTFCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFHbkMsSUFB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cHJvdGVjdG1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgTmdab25lLCBJbnB1dCwgT3V0cHV0LCBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlLCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0NoaWxkfVxuZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NPUkVfRElSRUNUSVZFU30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnMsIEZvcm1CdWlsZGVyLCBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1JvdXRlcywgUm91dGVyLCBST1VURVJfRElSRUNUSVZFU30gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdmb28gfSBmcm9tICcuLi8uLmludGVyZmFjZXMnO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSAnLi4vLi5pbnRlcmZhY2VzJztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi8uLi8uLi9nbG9iYWxzJyk7XG5pbXBvcnQge0N1c3RvbVZhbGlkYXRvcnN9IGZyb20gJy4uLy4uL3V0aWxzL0N1c3RvbVZhbGlkYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAncGFzc3dvcmRwcm90ZWN0bW9kYWwnLFxuICAgIHRlbXBsYXRlVXJsOiAncGFzc3dvcmRwcm90ZWN0bW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFsgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTLCBDT1JFX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkUHJvdGVjdE1vZGFsIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBcbiAgICBAT3V0cHV0KCkgcHJpdmF0ZSBvbmNoYW5nZXZpZXdmb286IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjdXJyVmlld2Zvb2lkOiBhbnk7XG4gICAgdmlld2Zvb3Bhc3N3b3JkOiBGb3JtR3JvdXA7XG4gICAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHBhc3N3b3JkOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbChcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICBjb25maXJtcGFzc3dvcmQ6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKFwiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgIGdlbmVyYXRlZHBhc3N3b3JkOiBGb3JtQ29udHJvbDtcbiAgICB2aWV3Zm9vcGFzc3dvcmRpZDogc3RyaW5nO1xuICAgIHZpZXdmb29wYXNzd29yZHR5cGU6IHN0cmluZyA9IFwiYXV0b3Bhc3N3b3JkXCI7XG4gICAgZ2VuZXJhdGVvd25wYXNzd29yZDogYm9vbGVhbiA9IHRydWU7XG4gICAgY2hrbWFpbDogRm9ybUNvbnRyb2wgPSBmYWxzZTtcbiAgICBjaGtzbXM6IEZvcm1Db250cm9sID0gZmFsc2U7XG4gICAgcHVibGljIGNoZWNrZW1haWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgY2hlY2tzbXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgdW5sb2Nrdmlld2Zvb2lkOiBzdHJpbmc7XG4gICAgcHVibGljIGlzZXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgY2hlY2t1bmxvY2tzbXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBidWlsZGVyOiBGb3JtQnVpbGRlcikge1xuICAgICAgICB0aGlzLmxvZ2luVXNlciA9IG15R2xvYmFscy5Mb2dpblVzZXI7XG5cbiAgICAgICAgLy9mb3IgcGFzc3dvcmQgcHJvdGVjdGVkXG4gICAgICAgIHRoaXMudmlld2Zvb3Bhc3N3b3JkID0gYnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICBcInBhc3N3b3JkXCI6IHRoaXMucGFzc3dvcmQsXG4gICAgICAgICAgICBcImdlbmVyYXRlZHBhc3N3b3JkXCI6IHRoaXMuZ2VuZXJhdGVkcGFzc3dvcmQsXG4gICAgICAgICAgICBcImNoa21haWxcIjogdGhpcy5jaGttYWlsLFxuICAgICAgICAgICAgXCJjaGtzbXNcIjogdGhpcy5jaGtzbXMsXG4gICAgICAgICAgICBjb25maXJtcGFzc3dvcmQ6IHRoaXMuY29uZmlybXBhc3N3b3JkLFxuXG4gICAgICAgIH0sIHsgdmFsaWRhdG9yOiBDdXN0b21WYWxpZGF0b3JzLm1hdGNoaW5nUGFzc3dvcmRzKCdwYXNzd29yZCcsICdjb25maXJtcGFzc3dvcmQnKSB9KTtcbiAgICAgICAgLy9lbmQgb2YgcGFzc3dvcmQgcHJvdGVjdGVkXG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgXG4gICAgICAgICQoXCIuQ0JwYXNzd29yZHR5cGVcIikuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNoZWNrZWQgPSAkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgICAgICAgJChcIi5DQnBhc3N3b3JkdHlwZVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMuaW1hZ2VzaXplID0gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmlld2Zvb3Bhc3N3b3JkLmNvbnRyb2xzWydjaGttYWlsJ10udXBkYXRlVmFsdWUoZmFsc2UpO1xuICAgICAgICB0aGlzLnZpZXdmb29wYXNzd29yZC5jb250cm9sc1snY2hrc21zJ10udXBkYXRlVmFsdWUoZmFsc2UpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlcGFzc3dvcmQoKTtcbiAgICB9XG4gICAgXG4gICAgZ2VuZXJhdGVwYXNzd29yZCgpIHtcbiAgICAgICAgIFxuICAgICAgICB0aGlzLmlzbG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMudmlld2Zvb3Bhc3N3b3JkLmNvbnRyb2xzWydnZW5lcmF0ZWRwYXNzd29yZCddLnNldEVycm9ycyhudWxsKTtcbiAgICAgICAgdGhpcy52aWV3Zm9vcGFzc3dvcmQuY29udHJvbHNbJ2NvbmZpcm1wYXNzd29yZCddLnNldEVycm9ycyhudWxsKTtcbiAgICAgICAgdGhpcy52aWV3Zm9vcGFzc3dvcmQuY29udHJvbHNbJ3Bhc3N3b3JkJ10uc2V0RXJyb3JzKG51bGwpO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmdlbmVyYXRlcmFuZG9tcHcoKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld2Zvb3Bhc3N3b3JkLmNvbnRyb2xzWydnZW5lcmF0ZWRwYXNzd29yZCddLnVwZGF0ZVZhbHVlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmlzbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGFzc3dvcmQgZ2VuZXJhdGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgY2hhbmdlcGFzc3dvcmR0eXBlKHZhbCkge1xuICAgICAgIFxuICAgICAgICBpZiAodmFsID09ICdvd24nKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlb3ducGFzc3dvcmQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudmlld2Zvb3Bhc3N3b3JkdHlwZSA9IFwieW91cnBhc3N3b3JkXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsID09ICdnZW5lcmF0ZScpIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVvd25wYXNzd29yZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnZpZXdmb29wYXNzd29yZHR5cGUgPSBcImF1dG9wYXNzd29yZFwiO1xuICAgICAgICAgICAgdGhpcy52aWV3Zm9vcGFzc3dvcmQuY29udHJvbHNbJ2dlbmVyYXRlZHBhc3N3b3JkJ10uc2V0RXJyb3JzKG51bGwpO1xuICAgICAgICAgICAgdGhpcy52aWV3Zm9vcGFzc3dvcmQuY29udHJvbHNbJ2NvbmZpcm1wYXNzd29yZCddLnNldEVycm9ycyhudWxsKTtcbiAgICAgICAgICAgIHRoaXMudmlld2Zvb3Bhc3N3b3JkLmNvbnRyb2xzWydwYXNzd29yZCddLnNldEVycm9ycyhudWxsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGV2aWV3Zm9vcGFzc3dwcmQoKSB7XG4gICAgICAgIHRoaXMuaXNsb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgbGV0IGZvcm1kYXRhID0gdGhpcy52aWV3Zm9vcGFzc3dvcmQudmFsdWU7XG4gICAgICAgIGZvcm1kYXRhW1widmlld2Zvb3Bhc3N3b3JkdHlwZVwiXSA9IHRoaXMudmlld2Zvb3Bhc3N3b3JkdHlwZTtcbiAgICAgICAgZm9ybWRhdGFbXCJpZFwiXSA9IHRoaXMuY3VyclZpZXdmb29pZDtcbiAgICAgICAgZm9ybWRhdGFbXCJpc3Bhc3N3b3JkcHJvdGVjdGVkXCJdID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy52aWV3Zm9vcGFzc3dvcmR0eXBlID09IFwiYXV0b3Bhc3N3b3JkXCIpIHtcblxuICAgICAgICAgICAgZm9ybWRhdGFbXCJ2aWV3Zm9vcGFzc3dvcmRcIl0gPSBmb3JtZGF0YS5nZW5lcmF0ZWRwYXNzd29yZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnZpZXdmb29wYXNzd29yZHR5cGUgPT0gXCJ5b3VycGFzc3dvcmRcIikge1xuXG4gICAgICAgICAgICBmb3JtZGF0YVtcInZpZXdmb29wYXNzd29yZFwiXSA9IGZvcm1kYXRhLnBhc3N3b3JkO1xuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnBhc3N3b3JkcHJvdGVjdGVkdmllZm9vKGZvcm1kYXRhKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2V2aWV3Zm9vKHRoaXMuY3VyclZpZXdmb29pZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRwYXNzd29yZGZvcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgLy8kKCcjcGFzc3dvcmRNb2RhbCcpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAvLyAkKFwiI3Bhc3N3b3JkTW9kYWwgLmNsb3NlXCIpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgJChcIiNwYXNzd29yZE1vZGFsXCIpLm1vZGFsKFwiaGlkZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmlzbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGFzc3dvcmQgdXBkYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIGNoYW5nZXZpZXdmb28oaWQsdmFsdWUpe1xuICAgICAgICAgICB0aGlzLml0ZW0gPSB7IGlkOiBpZCwgdmFsdWU6IHZhbHVlfTtcbiAgICAgICAgICAgIHRoaXMub25jaGFuZ2V2aWV3Zm9vLmVtaXQodGhpcy5pdGVtKTtcbiAgICBcbiAgICB9XG5cbi8vICAgIGNoYW5nZWludmlld2Zvb2xpc3QoaWQsIHZhbHVlKSB7XG4vL1xuLy8gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy52aWV3Zm9vbGlzdC5sZW5ndGg7IGkrKykge1xuLy8gICAgICAgICAgICBpZiAodGhpcy52aWV3Zm9vbGlzdFtpXS5pZCA9PSBpZCkge1xuLy8gICAgICAgICAgICAgICAgdGhpcy52aWV3Zm9vbGlzdFtpXS5pc3Bhc3N3b3JkcHJvdGVjdGVkID0gdmFsdWU7XG4vLyAgICAgICAgICAgIH1cbi8vICAgICAgICB9XG4vLyAgICB9XG4gICAgdW5sb2NrcGFzc3dvcmQodW5sb2NrcHc6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICBcbiAgICAgICAgdGhpcy5pc2xvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzZXJyb3IgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS51bmxvY2t2aWV3Zm9vKHRoaXMuY3VyclZpZXdmb29pZCwgdW5sb2NrcHcudmFsdWUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2V2aWV3Zm9vKHRoaXMuY3VyclZpZXdmb29pZCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzZXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB1bmxvY2twdy52YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIC8vJCgnI3VubG9ja3Bhc3N3b3JkTW9kYWwnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vJChcIiN1bmxvY2twYXNzd29yZE1vZGFsIC5jbG9zZVwiKS5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICAgJChcIiN1bmxvY2twYXNzd29yZE1vZGFsXCIpLm1vZGFsKFwiaGlkZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNlcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwYXNzd29yZCB1cGRhdGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVzZXRwYXNzd29yZGZvcm0oKSB7XG4gICAgICAgIHRoaXMudmlld2Zvb3Bhc3N3b3JkLmNvbnRyb2xzWydjb25maXJtcGFzc3dvcmQnXS51cGRhdGVWYWx1ZSgnJyk7XG4gICAgICAgIHRoaXMudmlld2Zvb3Bhc3N3b3JkLmNvbnRyb2xzWydwYXNzd29yZCddLnVwZGF0ZVZhbHVlKCcnKTtcbiAgICAgICAgdGhpcy52aWV3Zm9vcGFzc3dvcmQuY29udHJvbHNbJ2dlbmVyYXRlZHBhc3N3b3JkJ10uc2V0RXJyb3JzKG51bGwpO1xuICAgICAgICB0aGlzLnZpZXdmb29wYXNzd29yZC5jb250cm9sc1snY29uZmlybXBhc3N3b3JkJ10uc2V0RXJyb3JzKG51bGwpO1xuICAgICAgICB0aGlzLnZpZXdmb29wYXNzd29yZC5jb250cm9sc1sncGFzc3dvcmQnXS5zZXRFcnJvcnMobnVsbCk7XG4gICAgICAgIFxuXG4gICAgfVxuICAgIHNlbmRwYXNzd29yZCgpIHtcbiAgICAgICAgdGhpcy5pc2xvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzZXJyb3IgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5mb3Jnb3R2aWV3Zm9vcGFzc3dvcmQodGhpcy5jdXJyVmlld2Zvb2lkLCB0aGlzLmNoZWNrdW5sb2Nrc21zKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNlcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNlcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwYXNzd29yZCBzZW5kaW5nIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==
