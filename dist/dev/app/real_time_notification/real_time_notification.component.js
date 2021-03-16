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
var RealtimenotificationComponent = (function () {
    function RealtimenotificationComponent(router, builder, authService) {
        this.router = router;
        this.builder = builder;
        this.authService = authService;
        this.isloading = false;
    }
    RealtimenotificationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isloading = true;
        $(".CBSharing").change(function () {
            var checked = $(this).is(':checked');
            $(".CBSharing").prop('checked', false);
            if (checked) {
                $(this).prop('checked', true);
            }
        });
        $(".CBsharephoto").change(function () {
            var checked = $(this).is(':checked');
            $(".CBsharephoto").prop('checked', false);
            if (checked) {
                $(this).prop('checked', true);
            }
        });
        $(".CBphotoselect").change(function () {
            var checked = $(this).is(':checked');
            $(".CBphotoselect").prop('checked', false);
            if (checked) {
                $(this).prop('checked', true);
            }
        });
        $(".CBchat").change(function () {
            var checked = $(this).is(':checked');
            $(".CBchat").prop('checked', false);
            if (checked) {
                $(this).prop('checked', true);
            }
        });
        $(".CBnews").change(function () {
            var checked = $(this).is(':checked');
            $(".CBnews").prop('checked', false);
            if (checked) {
                $(this).prop('checked', true);
            }
        });
        this.loginUser = myGlobals.LoginUser;
        console.log(this.loginUser.id);
        this.authService.getrealtimenotificationsetting(this.loginUser.id)
            .subscribe(function (result) {
            if (result) {
                _this.usersetting = result.data;
                _this.setSettingData(_this.usersetting);
            }
            _this.isloading = false;
        }, function (error) {
            _this.errorMsg = error;
            console.log("real time notification fail: " + error);
            _this.isloading = false;
        });
        console.log(this.countrycode);
    };
    RealtimenotificationComponent.prototype.ngAfterViewInit = function () {
        jQuery(document).ready(function () {
            jQuery('.nav_bar').click(function () {
                jQuery('.navigation').toggleClass('visible');
                jQuery('body').toggleClass('opacity');
            });
        });
    };
    RealtimenotificationComponent.prototype.changeSetting = function (settingType, val) {
        var _this = this;
        console.log(settingType + '  ' + val);
        var settingType = settingType;
        console.log(this.sharenotification);
        this.authService.realtimenotificationsetting(this.loginUser.id, val, settingType)
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
    RealtimenotificationComponent.prototype.setSettingData = function (settings) {
        console.log(settings);
        this.mobilenumber = settings.mobilenumber;
        this.sharenotification = settings.issharing;
        this.sharephotonotification = settings.isphoto;
        this.photoselectnotification = settings.isphotoselection;
        this.chatnotification = settings.ischatorcomment;
        this.newsnotification = settings.isviewfoonews;
        this.photoselectiontype = settings.photoselectiontype;
        this.phototype = settings.phototype;
        this.sharingtype = settings.sharingtype;
        this.viewfoonewstype = settings.viewfoonewstype;
        this.chatorcommenttype = settings.chatorcommenttype;
    };
    RealtimenotificationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'realtimenotification',
            templateUrl: 'real_time_notification.component.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router, forms_1.FormBuilder, auth_service_1.AuthService])
    ], RealtimenotificationComponent);
    return RealtimenotificationComponent;
}());
exports.RealtimenotificationComponent = RealtimenotificationComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9yZWFsX3RpbWVfbm90aWZpY2F0aW9uL3JlYWxfdGltZV9ub3RpZmljYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFDaEQsdUJBQXdDLGlCQUFpQixDQUFDLENBQUE7QUFDMUQsNkJBQTRCLGlDQUFpQyxDQUFDLENBQUE7QUFFOUQsc0JBQTBGLGdCQUFnQixDQUFDLENBQUE7QUFDM0csSUFBTyxTQUFTLFdBQVcsWUFBWSxDQUFDLENBQUM7QUFXekM7SUE2QkksdUNBQXFCLE1BQWMsRUFBUyxPQUFvQixFQUFVLFdBQXdCO1FBQTdFLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFhO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFEbEcsY0FBUyxHQUFXLEtBQUssQ0FBQztJQUsxQixDQUFDO0lBQ0QsZ0RBQVEsR0FBUjtRQUFBLGlCQXlEQztRQXhERyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUVyQixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ25CLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdkMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDVixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ3RCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FB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LENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDO1FBQzFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQzVDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQy9DLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7UUFDekQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7UUFDakQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUM7UUFDL0MsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQztRQUN0RCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQztRQUNoRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixDQUFDO0lBQ3hELENBQUM7SUExSUw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsV0FBVyxFQUFFLHVDQUF1QztZQUNuRCxVQUFVLEVBQUUsQ0FBQyxnQ0FBd0IsQ0FBQztTQUUxQyxDQUFDOztxQ0FBQTtJQXFJRixvQ0FBQztBQUFELENBbklBLEFBbUlDLElBQUE7QUFuSVkscUNBQTZCLGdDQW1JekMsQ0FBQSIsImZpbGUiOiJhcHAvcmVhbF90aW1lX25vdGlmaWNhdGlvbi9yZWFsX3RpbWVfbm90aWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFUywgUm91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBWYWxpZGF0b3JzLCBGb3JtQnVpbGRlciwgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uL2dsb2JhbHMnKTtcbmltcG9ydCB7Q3VzdG9tVmFsaWRhdG9yc30gZnJvbSAnLi4vc2hhcmVkL3V0aWxzL0N1c3RvbVZhbGlkYXRvcnMnO1xuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uLy4uL2dsb2JhbHMnKTtcbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdyZWFsdGltZW5vdGlmaWNhdGlvbicsXG4gICAgdGVtcGxhdGVVcmw6ICdyZWFsX3RpbWVfbm90aWZpY2F0aW9uLmNvbXBvbmVudC5odG1sJ1xuICAgICBkaXJlY3RpdmVzOiBbUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTXVxuXG59KVxuXG5leHBvcnQgY2xhc3MgUmVhbHRpbWVub3RpZmljYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHVzZXJzZXR0aW5nOmFueTtcbiAgICBtb2JpbGVudW1iZXI6c3RyaW5nO1xuICAgIHNoYXJlbm90aWZpY2F0aW9uOmJvb2xlYW47XG4gICAgc2hhcmVlbWFpbG5vdGlmaWNhdGlvbjpzdHJpbmc7XG4gICAgc2hhcmVtb2JpbGVub3RpZmljYXRpb246c3RyaW5nO1xuICAgIHNoYXJlYm90aG5vdGlmaWNhdGlvbjpzdHJpbmc7XG4gICAgc2hhcmVwaG90b25vdGlmaWNhdGlvbjpib29sZWFuO1xuICAgIHNoYXJlcGhvdG9lbWFpbG5vdGlmaWNhdGlvbjpzdHJpbmc7XG4gICAgc2hhcmVwaG90b21vYmlsZW5vdGlmaWNhdGlvbjpzdHJpbmc7XG4gICAgc2hhcmVwaG90b2JvdGhub3RpZmljYXRpb246c3RyaW5nO1xuICAgIHBob3Rvc2VsZWN0bm90aWZpY2F0aW9uOmJvb2xlYW47XG4gICAgcGhvdG9zZWxlY3RlbWFpbG5vdGlmaWNhdGlvbjpzdHJpbmc7XG4gICAgcGhvdG9zZWxlY3Rtb2JpbGVub3RpZmljYXRpb246c3RyaW5nO1xuICAgIHBob3Rvc2VsZWN0Ym90aG5vdGlmaWNhdGlvbjpzdHJpbmc7XG4gICAgY2hhdG5vdGlmaWNhdGlvbjpib29sZWFuO1xuICAgIGNoYXRlbWFpbG5vdGlmaWNhdGlvbjpzdHJpbmc7XG4gICAgY2hhdG1vYmlsZW5vdGlmaWNhdGlvbjpzdHJpbmc7XG4gICAgY2hhdGJvdGhub3RpZmljYXRpb246c3RyaW5nO1xuICAgIG5ld3Nub3RpZmljYXRpb246Ym9vbGVhbjtcbiAgICBuZXdzZW1haWxub3RpZmljYXRpb246c3RyaW5nO1xuICAgIG5ld3Ntb2JpbGVub3RpZmljYXRpb246c3RyaW5nO1xuICAgIG5ld3Nib3Robm90aWZpY2F0aW9uOnN0cmluZztcbiAgICBjaGF0b3Jjb21tZW50dHlwZTpzdHJpbmc7XG4gICAgcGhvdG9zZWxlY3Rpb250eXBlOnN0cmluZztcbiAgICBwaG90b3R5cGU6c3RyaW5nO1xuICAgIHNoYXJpbmd0eXBlOnN0cmluZztcbiAgICB2aWV3Zm9vbmV3c3R5cGU6c3RyaW5nO1xuICAgIGlzbG9hZGluZzpib29sZWFuID0gZmFsc2U7XG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIscHJpdmF0ZSBidWlsZGVyOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcbi8vICAgICAgICB0aGlzLmZsb2dvZm9ybSA9IGJ1aWxkZXIuZ3JvdXAoe1xuLy8gICAgICAgICAgICBcImxvZ29uYW1lXCI6IHRoaXMubG9nb25hbWVcbi8vICAgICAgICB9KTtcbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaXNsb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgICAkKFwiLkNCU2hhcmluZ1wiKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgdmFyIGNoZWNrZWQgPSAkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgICAgICAgICQoXCIuQ0JTaGFyaW5nXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgJCh0aGlzKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgICAgICAkKFwiLkNCc2hhcmVwaG90b1wiKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgdmFyIGNoZWNrZWQgPSAkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgICAgICAgICQoXCIuQ0JzaGFyZXBob3RvXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgJCh0aGlzKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgICAgICAgICQoXCIuQ0JwaG90b3NlbGVjdFwiKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgdmFyIGNoZWNrZWQgPSAkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgICAgICAgICQoXCIuQ0JwaG90b3NlbGVjdFwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgIGlmIChjaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICQodGhpcykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuICAgICAgICAgXG4gICAgICAgICAkKFwiLkNCY2hhdFwiKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgdmFyIGNoZWNrZWQgPSAkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgICAgICAgICQoXCIuQ0JjaGF0XCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgJCh0aGlzKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgICAgICAkKFwiLkNCbmV3c1wiKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgdmFyIGNoZWNrZWQgPSAkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgICAgICAgICQoXCIuQ0JuZXdzXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgJCh0aGlzKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgICAgICBcbiAgICAgICAgIHRoaXMubG9naW5Vc2VyID0gbXlHbG9iYWxzLkxvZ2luVXNlcjtcbiAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubG9naW5Vc2VyLmlkKTtcbiAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2UuZ2V0cmVhbHRpbWVub3RpZmljYXRpb25zZXR0aW5nKHRoaXMubG9naW5Vc2VyLmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJzZXR0aW5nPXJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNldHRpbmdEYXRhKHRoaXMudXNlcnNldHRpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmlzbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICBcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlYWwgdGltZSBub3RpZmljYXRpb24gZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICAgICAgdGhpcy5pc2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgIFxuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY291bnRyeWNvZGUpOyAgXG4gICAgfVxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgICAgICAgICBqUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcubmF2X2JhcicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnLm5hdmlnYXRpb24nKS50b2dnbGVDbGFzcygndmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCdib2R5JykudG9nZ2xlQ2xhc3MoJ29wYWNpdHknKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cdH1cbiAgICBjaGFuZ2VTZXR0aW5nKHNldHRpbmdUeXBlOnN0cmluZyx2YWw6YW55KXtcbiAgICAgICAgY29uc29sZS5sb2coc2V0dGluZ1R5cGUrJyAgJyt2YWwpO1xuICAgICAgIGxldCBzZXR0aW5nVHlwZSA9IHNldHRpbmdUeXBlO1xuICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2hhcmVub3RpZmljYXRpb24pO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnJlYWx0aW1lbm90aWZpY2F0aW9uc2V0dGluZyh0aGlzLmxvZ2luVXNlci5pZCwgdmFsLCBzZXR0aW5nVHlwZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlld2ZvbyBvcHRpb24gdXBkYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgICBcbiAgICB9XG4gICAgc2V0U2V0dGluZ0RhdGEoc2V0dGluZ3M6YW55KXtcbiAgICAgICAgY29uc29sZS5sb2coc2V0dGluZ3MpO1xuICAgICAgICB0aGlzLm1vYmlsZW51bWJlciA9IHNldHRpbmdzLm1vYmlsZW51bWJlcjtcbiAgICAgICAgdGhpcy5zaGFyZW5vdGlmaWNhdGlvbiA9IHNldHRpbmdzLmlzc2hhcmluZzsgXG4gICAgICAgIHRoaXMuc2hhcmVwaG90b25vdGlmaWNhdGlvbiA9IHNldHRpbmdzLmlzcGhvdG87IFxuICAgICAgICB0aGlzLnBob3Rvc2VsZWN0bm90aWZpY2F0aW9uID0gc2V0dGluZ3MuaXNwaG90b3NlbGVjdGlvbjsgXG4gICAgICAgIHRoaXMuY2hhdG5vdGlmaWNhdGlvbiA9IHNldHRpbmdzLmlzY2hhdG9yY29tbWVudDsgXG4gICAgICAgIHRoaXMubmV3c25vdGlmaWNhdGlvbiA9IHNldHRpbmdzLmlzdmlld2Zvb25ld3M7IFxuICAgICAgICB0aGlzLnBob3Rvc2VsZWN0aW9udHlwZSA9IHNldHRpbmdzLnBob3Rvc2VsZWN0aW9udHlwZTtcbiAgICAgICAgdGhpcy5waG90b3R5cGUgPSBzZXR0aW5ncy5waG90b3R5cGU7XG4gICAgICAgIHRoaXMuc2hhcmluZ3R5cGUgPSBzZXR0aW5ncy5zaGFyaW5ndHlwZTtcbiAgICAgICAgdGhpcy52aWV3Zm9vbmV3c3R5cGUgPSBzZXR0aW5ncy52aWV3Zm9vbmV3c3R5cGU7XG4gICAgICAgIHRoaXMuY2hhdG9yY29tbWVudHR5cGUgPSBzZXR0aW5ncy5jaGF0b3Jjb21tZW50dHlwZTtcbiAgICB9XG59Il19
