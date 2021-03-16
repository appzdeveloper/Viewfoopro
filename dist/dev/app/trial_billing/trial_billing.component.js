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
var CustomValidators_1 = require('../shared/utils/CustomValidators');
var TrialBillingComponent = (function () {
    function TrialBillingComponent(builder, _router, authService) {
        this.builder = builder;
        this._router = _router;
        this.authService = authService;
        this.email = new forms_1.FormControl("", forms_1.Validators.compose([forms_1.Validators.required, CustomValidators_1.CustomValidators.emailValidator]));
        this.loading = false;
        this.istrial = false;
        this.date = new Date();
        this.fpassform = builder.group({
            "email": this.email
        });
    }
    TrialBillingComponent.prototype.ngOnInit = function () {
        this.loginUser = myGlobals.LoginUser;
        console.log(this.loginUser);
        this.subscriptionttype = this.loginUser.subscription;
        if (this.subscriptionttype == 'trial') {
            this.istrial = true;
        }
        this.calculatedays();
        this.getbillingdetail();
    };
    TrialBillingComponent.prototype.getbillingdetail = function () {
        var _this = this;
        this.authService.userbillingdetail(this.loginUser.id)
            .subscribe(function (result) {
            console.log(result);
            _this.invoicedetail = result.invoicedetail;
            _this.paymentdetail = result.paymentdetail;
            _this.paymenttype = result.paymenttype;
        }, function (error) {
            _this.message = error;
            _this.loading = false;
            console.log("send mail fail: " + error);
        });
    };
    TrialBillingComponent.prototype.calculatedays = function () {
        this.date = new Date();
        this.subenddate = new Date(this.loginUser.subscriptionenddate);
        if (this.subenddate < this.date) {
            this.day = 0;
        }
        else {
            var diff = (this.subenddate) - (this.date);
            this.day = Math.round(diff / 86400000);
        }
    };
    TrialBillingComponent.prototype.billingdetail = function () {
        this._router.navigate(['/billingdetail']);
    };
    TrialBillingComponent.prototype.tellfriend = function () {
        $('#friendModal').modal('show');
    };
    TrialBillingComponent.prototype.sendmail = function () {
        var _this = this;
        this.loading = true;
        var formdata = this.fpassform.value;
        this.authService.tellafriend(formdata.email, this.loginUser.id)
            .subscribe(function (result) {
            _this.message = result.message;
            _this.loading = false;
        }, function (error) {
            _this.message = error;
            _this.loading = false;
            console.log("send mail fail: " + error);
        });
    };
    TrialBillingComponent.prototype.sendpromocode = function (code) {
        var _this = this;
        this.authService.validatepromocode(code, this.loginUser.id)
            .subscribe(function (result) {
            _this.promomessage = result.message;
            _this.loading = false;
        }, function (error) {
            _this.promomessage = error;
            _this.loading = false;
            console.log("send promocode fail: " + error);
        });
    };
    TrialBillingComponent.prototype.cancelsubscription = function () {
        var _this = this;
        this.loading = true;
        this.authService.cancelsubscription(this.loginUser.id)
            .subscribe(function (result) {
            console.log(result);
            _this.istrial = true;
            _this.loading = false;
            console.log(result.userdetail[0]);
            if (result.userdetail) {
                window.localStorage['user'] = JSON.stringify(result.userdetail[0]);
                _this.loginUser = result.userdetail[0];
                myGlobals.LoginUser = _this.loginUser;
                console.log("after cncel");
                console.log(_this.loginUser);
            }
        }, function (error) {
            console.log("cancel subscription fail: " + error);
        });
    };
    TrialBillingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'publichomepagesetting',
            templateUrl: 'trial_billing.component.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, auth_service_1.AuthService])
    ], TrialBillingComponent);
    return TrialBillingComponent;
}());
exports.TrialBillingComponent = TrialBillingComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC90cmlhbF9iaWxsaW5nL3RyaWFsX2JpbGxpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFDaEQsdUJBQXdDLGlCQUFpQixDQUFDLENBQUE7QUFDMUQsNkJBQTRCLGlDQUFpQyxDQUFDLENBQUE7QUFHOUQsc0JBQ1MsZ0JBQWdCLENBQUMsQ0FBQTtBQUMxQixJQUFPLFNBQVMsV0FBVyxZQUFZLENBQUMsQ0FBQztBQUN6QyxpQ0FBK0Isa0NBQWtDLENBQUMsQ0FBQTtBQVdsRTtJQWNJLCtCQUFvQixPQUFvQixFQUFTLE9BQWUsRUFBVSxXQUF3QjtRQUE5RSxZQUFPLEdBQVAsT0FBTyxDQUFhO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBUGpHLFVBQUssR0FBZ0IsSUFBSSxtQkFBVyxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGtCQUFVLENBQUMsUUFBUSxFQUFFLG1DQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNySCxZQUFPLEdBQVksS0FBSyxDQUFDO1FBRTFCLFlBQU8sR0FBUyxLQUFLLENBQUM7UUFLcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUM1QixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDdEIsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFB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TUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsU0FBUyxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBRUwsQ0FBQyxFQUNELFVBQUMsS0FBVTtZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBaElMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFdBQVcsRUFBRSw4QkFBOEI7WUFDMUMsVUFBVSxFQUFFLENBQUMsZ0NBQXdCLENBQUM7U0FFMUMsQ0FBQzs7NkJBQUE7SUE0SEYsNEJBQUM7QUFBRCxDQTFIQSxBQTBIQyxJQUFBO0FBMUhZLDZCQUFxQix3QkEwSGpDLENBQUEiLCJmaWxlIjoiYXBwL3RyaWFsX2JpbGxpbmcvdHJpYWxfYmlsbGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVMsIFJvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuLy9pbXBvcnQge0ZPUk1fRElSRUNUSVZFUywgRm9ybUJ1aWxkZXIsIENvbnRyb2wsIENvbnRyb2xHcm91cCwgVmFsaWRhdG9ycywgbmdmb3JtLCBEYXRlUGlwZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycywgRm9ybUJ1aWxkZXIsIFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUyB9IFxuICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi9nbG9iYWxzJyk7XG5pbXBvcnQge0N1c3RvbVZhbGlkYXRvcnN9IGZyb20gJy4uL3NoYXJlZC91dGlscy9DdXN0b21WYWxpZGF0b3JzJztcblxuaW1wb3J0IHtDdXN0b21WYWxpZGF0b3JzfSBmcm9tICcuLi9zaGFyZWQvdXRpbHMvQ3VzdG9tVmFsaWRhdG9ycyc7XG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAncHVibGljaG9tZXBhZ2VzZXR0aW5nJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3RyaWFsX2JpbGxpbmcuY29tcG9uZW50Lmh0bWwnLFxuICAgICBkaXJlY3RpdmVzOiBbUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTXVxuXG59KVxuXG5leHBvcnQgY2xhc3MgVHJpYWxCaWxsaW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiBcbiAgICBkYXRlOiBEYXRlO1xuICAgIHN1YmVuZGRhdGU6IERhdGU7XG4gICAgc3Vic2NyaXB0aW9udHR5cGU6c3RyaW5nO1xuICAgIGRheTogbnVtYmVyO1xuICAgIGxvZ2luVXNlcjogVXNlcjtcbiAgICAgZW1haWw6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKFwiXCIsIFZhbGlkYXRvcnMuY29tcG9zZShbVmFsaWRhdG9ycy5yZXF1aXJlZCwgQ3VzdG9tVmFsaWRhdG9ycy5lbWFpbFZhbGlkYXRvcl0pKTtcbiAgICAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGZwYXNzZm9ybTogQ29udHJvbEdyb3VwO1xuICAgIGlzdHJpYWw6Ym9vbGVhbj1mYWxzZTtcbiAgICBpbnZvaWNlZGV0YWlsOltdO1xuICAgIHB1YmxpYyBwYXltZW50ZGV0YWlsOkFueTtcbiAgICBwdWJsaWMgcGF5bWVudHR5cGU6c3RyaW5nO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYnVpbGRlcjogRm9ybUJ1aWxkZXIscHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgdGhpcy5mcGFzc2Zvcm0gPSBidWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIFwiZW1haWxcIjogdGhpcy5lbWFpbFxuICAgICAgICB9KTtcbiAgICAgXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubG9naW5Vc2VyID0gbXlHbG9iYWxzLkxvZ2luVXNlcjtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5sb2dpblVzZXIpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnR0eXBlPXRoaXMubG9naW5Vc2VyLnN1YnNjcmlwdGlvbjtcbiAgICAgICAgaWYoIHRoaXMuc3Vic2NyaXB0aW9udHR5cGU9PSd0cmlhbCcpe1xuICAgICAgICAgICAgdGhpcy5pc3RyaWFsPXRydWU7IFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlZGF5cygpO1xuICAgICAgICB0aGlzLmdldGJpbGxpbmdkZXRhaWwoKTtcbiAgICAgIFxuICAgIH1cbiAgICBcbiAgICBnZXRiaWxsaW5nZGV0YWlsKCl7XG4gICBcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS51c2VyYmlsbGluZ2RldGFpbCh0aGlzLmxvZ2luVXNlci5pZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmludm9pY2VkZXRhaWw9cmVzdWx0Lmludm9pY2VkZXRhaWw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF5bWVudGRldGFpbD1yZXN1bHQucGF5bWVudGRldGFpbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXltZW50dHlwZT1yZXN1bHQucGF5bWVudHR5cGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmQgbWFpbCBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICBcbiAgICBjYWxjdWxhdGVkYXlzKCkge1xuICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLnN1YmVuZGRhdGUgPSBuZXcgRGF0ZSh0aGlzLmxvZ2luVXNlci5zdWJzY3JpcHRpb25lbmRkYXRlKTtcbiAgICAgICAgaWYgKHRoaXMuc3ViZW5kZGF0ZSA8IHRoaXMuZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5kYXkgPSAwO1xuICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBkaWZmID0gKHRoaXMuc3ViZW5kZGF0ZSkgLSAodGhpcy5kYXRlKTtcbiAgICAgICAgICAgIHRoaXMuZGF5ID0gTWF0aC5yb3VuZChkaWZmIC8gODY0MDAwMDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGJpbGxpbmdkZXRhaWwoKSB7XG4gICAgXG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvYmlsbGluZ2RldGFpbCddKTtcbiAgICB9XG4gICAgdGVsbGZyaWVuZCgpe1xuICAgICAgICAgJCgnI2ZyaWVuZE1vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgICB9XG4gICAgc2VuZG1haWwoKXtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgbGV0IGZvcm1kYXRhID0gdGhpcy5mcGFzc2Zvcm0udmFsdWU7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnRlbGxhZnJpZW5kKGZvcm1kYXRhLmVtYWlsLHRoaXMubG9naW5Vc2VyLmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gcmVzdWx0Lm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kIG1haWwgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgc2VuZHByb21vY29kZShjb2RlOiBzdHJpbmcpIHtcblxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZhbGlkYXRlcHJvbW9jb2RlKGNvZGUsIHRoaXMubG9naW5Vc2VyLmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9tb21lc3NhZ2UgPSByZXN1bHQubWVzc2FnZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvbW9tZXNzYWdlID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kIHByb21vY29kZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBjYW5jZWxzdWJzY3JpcHRpb24oKSB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UuY2FuY2Vsc3Vic2NyaXB0aW9uKHRoaXMubG9naW5Vc2VyLmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5pc3RyaWFsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQudXNlcmRldGFpbFswXSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC51c2VyZGV0YWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ3VzZXInXSA9IEpTT04uc3RyaW5naWZ5KHJlc3VsdC51c2VyZGV0YWlsWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpblVzZXIgPSByZXN1bHQudXNlcmRldGFpbFswXTtcbiAgICAgICAgICAgICAgICAgICAgbXlHbG9iYWxzLkxvZ2luVXNlciA9IHRoaXMubG9naW5Vc2VyO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFmdGVyIGNuY2VsXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxvZ2luVXNlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vdGhpcy5jYWxjdWxhdGVkYXlzKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbmNlbCBzdWJzY3JpcHRpb24gZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuIl19
