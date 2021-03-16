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
var TellAFriendComponent = (function () {
    function TellAFriendComponent(router, builder, authService) {
        this.router = router;
        this.builder = builder;
        this.authService = authService;
        this.emailAddresses = new forms_1.FormControl("", forms_1.Validators.required);
        this.mailbody = new forms_1.FormControl("", forms_1.Validators.required);
        this.isEnable = true;
        self = this;
        this.loginUser = myGlobals.LoginUser;
        this.tellafriendform = builder.group({
            "emailAddresses": this.emailAddresses,
            "mailbody": "Hi\n             I\u2019ve been using ViewFoo Pro.I highly recommended it if you\u2019d like to make the best photo galleries and websites.Get 2 months free, using this link: \n\nhttp://viewfoo.pro/users/" + this.loginUser.subdomain + "\n\nCheers,\n" + this.loginUser.firstname + " " + this.loginUser.lastname
        });
    }
    TellAFriendComponent.prototype.ngOnInit = function () {
        var _this = this;
        self = this;
        this.loginUser = myGlobals.LoginUser;
        var formdata = this.tellafriendform.value;
        this.authService.getTellafriendlist(this.loginUser.id)
            .subscribe(function (result) {
            if (result) {
                _this.tellafriendlist = result.data;
                console.log(' fsdf ', _this.tellafriendlist.length);
            }
        }, function (error) {
            _this.errorMsg = error;
            console.log('Could not get Tell a friend invitation list');
        });
    };
    TellAFriendComponent.prototype.doSendMail = function () {
        var _this = this;
        var formdata = this.tellafriendform.value;
        var emaildata = formdata.mailbody;
        var test = emaildata.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');
        var test1 = test.replace(/ /g, '&nbsp;');
        var test2 = '<p style="text-align:left;color:#555;font-size:14px;padding-top:130px;padding-left:10px;padding-right:10px;"><br>' + test1 + '</p>';
        var emailaddress = this.emailAddresses.value;
        this.isEnable = false;
        this.errorMsg = '';
        this.successMsg = '';
        console.log(test2);
        this.authService.sendMail(emailaddress, test2, this.loginUser.id)
            .subscribe(function (result) {
            if (result) {
                _this.isEnable = true;
                _this.successMsg = 'Invites sent to ' + emailaddress + '.Check back soon to see if they have joined yet.';
                _this.resetform();
                _this.authService.getTellafriendlist(_this.loginUser.id)
                    .subscribe(function (result) {
                    if (result) {
                        _this.tellafriendlist = result.data;
                    }
                }, function (error) {
                    _this.errorMsg = error;
                    console.log('Could not get Tell a friend invitation list');
                });
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.isEnable = true;
        });
    };
    TellAFriendComponent.prototype.resetform = function () {
        this.tellafriendform = this.builder.group({
            "emailAddresses": '',
            "mailbody": "Hi\n             I\u2019ve been using ViewFoo Pro.I highly recommended it if you\u2019d like to make the best photo galleries and websites.Get 2 months free, using this link: \n\nhttp://viewfoo.pro/users/" + this.loginUser.subdomain + "\n\nCheers,\n" + this.loginUser.firstname + " " + this.loginUser.lastname
        });
    };
    TellAFriendComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tellafriend',
            templateUrl: 'tell_a_friend.component.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router, forms_1.FormBuilder, auth_service_1.AuthService])
    ], TellAFriendComponent);
    return TellAFriendComponent;
}());
exports.TellAFriendComponent = TellAFriendComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC90ZWxsX2FfZnJpZW5kL3RlbGxfYV9mcmllbmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFDaEQsdUJBQXdDLGlCQUFpQixDQUFDLENBQUE7QUFDMUQsNkJBQTRCLGlDQUFpQyxDQUFDLENBQUE7QUFFOUQsc0JBQTBGLGdCQUFnQixDQUFDLENBQUE7QUFDM0csSUFBTyxTQUFTLFdBQVcsWUFBWSxDQUFDLENBQUM7QUFXekM7SUFTSyw4QkFBcUIsTUFBYyxFQUFTLE9BQW9CLEVBQVUsV0FBd0I7UUFBN0UsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUxuRyxtQkFBYyxHQUFnQixJQUFJLG1CQUFXLENBQUMsRUFBRSxFQUFDLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEUsYUFBUSxHQUFnQixJQUFJLG1CQUFXLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFMUQsYUFBUSxHQUFXLElBQUksQ0FBQztRQUczQixJQUFJLEdBQUUsSUFBSSxDQUFDO1FBQ1gsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNqQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNyQyxVQUFVLEVBQUUsOE1BR0UsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBQyxlQUduRCxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVE7U0FDN0MsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFBQSxpQkFnQkM7UUFmRyxJQUFJLEdBQUUsSUFB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LE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDdkMsZ0JBQWdCLEVBQUUsRUFBRTtZQUNwQixVQUFVLEVBQUUsOE1BR0UsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBQyxlQUduRCxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVE7U0FDN0MsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWhHTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLDhCQUE4QjtZQUMxQyxVQUFVLEVBQUUsQ0FBQyxnQ0FBd0IsQ0FBQztTQUUxQyxDQUFDOzs0QkFBQTtJQTRGRiwyQkFBQztBQUFELENBMUZBLEFBMEZDLElBQUE7QUExRlksNEJBQW9CLHVCQTBGaEMsQ0FBQSIsImZpbGUiOiJhcHAvdGVsbF9hX2ZyaWVuZC90ZWxsX2FfZnJpZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFUywgUm91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBWYWxpZGF0b3JzLCBGb3JtQnVpbGRlciwgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uL2dsb2JhbHMnKTtcbmltcG9ydCB7Q3VzdG9tVmFsaWRhdG9yc30gZnJvbSAnLi4vc2hhcmVkL3V0aWxzL0N1c3RvbVZhbGlkYXRvcnMnO1xuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uLy4uL2dsb2JhbHMnKTtcbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICd0ZWxsYWZyaWVuZCcsXG4gICAgdGVtcGxhdGVVcmw6ICd0ZWxsX2FfZnJpZW5kLmNvbXBvbmVudC5odG1sJ1xuICAgICBkaXJlY3RpdmVzOiBbUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTXVxuXG59KVxuXG5leHBvcnQgY2xhc3MgVGVsbEFGcmllbmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XG4gICAgbG9naW5Vc2VyOiBVc2VyO1xuICAgIGVycm9yTXNnOiBzdHJpbmc7XG4gICAgc3VjY2Vzc01zZzpzdGluZztcbiAgICBlbWFpbEFkZHJlc3NlczogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woXCJcIixWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICBtYWlsYm9keTogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgdGVsbGFmcmllbmRmb3JtOiBGb3JtR3JvdXA7XG4gICAgcHVibGljIGlzRW5hYmxlOmJvb2xlYW4gPSB0cnVlO1xuICAgIHRlbGxhZnJpZW5kbGlzdDphbnk7XG4gICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIHJvdXRlcjogUm91dGVyLHByaXZhdGUgYnVpbGRlcjogRm9ybUJ1aWxkZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7ICAgICAgXG4gICAgICAgIHNlbGYgPXRoaXM7XG4gICAgICAgIHRoaXMubG9naW5Vc2VyID0gbXlHbG9iYWxzLkxvZ2luVXNlcjtcbiAgICAgICAgdGhpcy50ZWxsYWZyaWVuZGZvcm0gPSBidWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIFwiZW1haWxBZGRyZXNzZXNcIjogdGhpcy5lbWFpbEFkZHJlc3NlcyxcbiAgICAgICAgICAgIFwibWFpbGJvZHlcIjogYEhpXFxuXFxcbiAgICAgICAgICAgICBJXFzigJl2ZSBiZWVuIHVzaW5nIFZpZXdGb28gUHJvLkkgaGlnaGx5IHJlY29tbWVuZGVkIGl0IGlmIHlvdVxc4oCZZCBsaWtlIHRvIG1ha2UgdGhlIGJlc3QgcGhvdG8gZ2FsbGVyaWVzIGFuZCB3ZWJzaXRlcy5HZXQgMiBtb250aHMgZnJlZSwgdXNpbmcgdGhpcyBsaW5rOiBcXG5cXFxuXG5odHRwOi8vdmlld2Zvby5wcm8vdXNlcnMvYCt0aGlzLmxvZ2luVXNlci5zdWJkb21haW4rYFxcblxcXG5cbkNoZWVycyxcbmArdGhpcy5sb2dpblVzZXIuZmlyc3RuYW1lK2AgYCt0aGlzLmxvZ2luVXNlci5sYXN0bmFtZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBzZWxmID10aGlzO1xuICAgICAgICAgdGhpcy5sb2dpblVzZXIgPSBteUdsb2JhbHMuTG9naW5Vc2VyO1xuICAgICAgICAgbGV0IGZvcm1kYXRhID0gdGhpcy50ZWxsYWZyaWVuZGZvcm0udmFsdWU7XG4gICAgICAgICBcbiAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2UuZ2V0VGVsbGFmcmllbmRsaXN0KHRoaXMubG9naW5Vc2VyLmlkKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbGxhZnJpZW5kbGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgZnNkZiAnOnRoaXMudGVsbGFmcmllbmRsaXN0Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ291bGQgbm90IGdldCBUZWxsIGEgZnJpZW5kIGludml0YXRpb24gbGlzdCcpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIGRvU2VuZE1haWwoKXtcbiAgICAgICBsZXQgZm9ybWRhdGEgPSB0aGlzLnRlbGxhZnJpZW5kZm9ybS52YWx1ZTtcbiAgICAgICB2YXIgZW1haWxkYXRhID0gZm9ybWRhdGEubWFpbGJvZHk7XG4gICAgICAgdmFyIHRlc3Q9ZW1haWxkYXRhLnJlcGxhY2UoLyhbXj5cXHJcXG5dPykoXFxyXFxufFxcblxccnxcXHJ8XFxuKS9nLCAnJDE8YnI+JDInKTtcbiAgICAgICB2YXIgdGVzdDEgPSB0ZXN0LnJlcGxhY2UoLyAvZywnJm5ic3A7Jyk7XG4gICAgICAgdmFyIHRlc3QyID0gJzxwIHN0eWxlPVwidGV4dC1hbGlnbjpsZWZ0O2NvbG9yOiM1NTU7Zm9udC1zaXplOjE0cHg7cGFkZGluZy10b3A6MTMwcHg7cGFkZGluZy1sZWZ0OjEwcHg7cGFkZGluZy1yaWdodDoxMHB4O1wiPjxicj4nK3Rlc3QxKyc8L3A+JztcbiAgICAgICB2YXIgZW1haWxhZGRyZXNzID0gdGhpcy5lbWFpbEFkZHJlc3Nlcy52YWx1ZTtcbiAgICAgICB0aGlzLmlzRW5hYmxlPWZhbHNlO1xuICAgICAgIHRoaXMuZXJyb3JNc2cgPSAnJztcbiAgICAgICB0aGlzLnN1Y2Nlc3NNc2c9ICcnO1xuICAgICAgIGNvbnNvbGUubG9nKHRlc3QyKTtcbiAgICAgICBcbiAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnNlbmRNYWlsKGVtYWlsYWRkcmVzcyx0ZXN0Mix0aGlzLmxvZ2luVXNlci5pZClcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0VuYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzTXNnID0gJ0ludml0ZXMgc2VudCB0byAnK2VtYWlsYWRkcmVzcysnLkNoZWNrIGJhY2sgc29vbiB0byBzZWUgaWYgdGhleSBoYXZlIGpvaW5lZCB5ZXQuJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0Zm9ybSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2UuZ2V0VGVsbGFmcmllbmRsaXN0KHRoaXMubG9naW5Vc2VyLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbGxhZnJpZW5kbGlzdCA9IHJlc3VsdC5kYXRhO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb3VsZCBub3QgZ2V0IFRlbGwgYSBmcmllbmQgaW52aXRhdGlvbiBsaXN0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNFbmFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgIH1cbiAgICByZXNldGZvcm0oKXtcbiAgICAgICAgIHRoaXMudGVsbGFmcmllbmRmb3JtID0gdGhpcy5idWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIFwiZW1haWxBZGRyZXNzZXNcIjogJycsXG4gICAgICAgICAgICBcIm1haWxib2R5XCI6IGBIaVxcblxcXG4gICAgICAgICAgICAgSVxc4oCZdmUgYmVlbiB1c2luZyBWaWV3Rm9vIFByby5JIGhpZ2hseSByZWNvbW1lbmRlZCBpdCBpZiB5b3VcXOKAmWQgbGlrZSB0byBtYWtlIHRoZSBiZXN0IHBob3RvIGdhbGxlcmllcyBhbmQgd2Vic2l0ZXMuR2V0IDIgbW9udGhzIGZyZWUsIHVzaW5nIHRoaXMgbGluazogXFxuXFxcblxuaHR0cDovL3ZpZXdmb28ucHJvL3VzZXJzL2ArdGhpcy5sb2dpblVzZXIuc3ViZG9tYWluK2BcXG5cXFxuXG5DaGVlcnMsXG5gK3RoaXMubG9naW5Vc2VyLmZpcnN0bmFtZStgIGArdGhpcy5sb2dpblVzZXIubGFzdG5hbWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgIFxufSJdfQ==
