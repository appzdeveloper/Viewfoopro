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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var auth_service_1 = require('../../shared/services/auth.service');
var pagination_component_1 = require('../../shared/pagination/pagination.component');
var myGlobals = require('../../globals');
var MasonryViewComponent = (function () {
    function MasonryViewComponent(_router, authService, builder) {
        this._router = _router;
        this.authService = authService;
        this.builder = builder;
        this.onDelViewfoo = new core_1.EventEmitter();
        this.serviceUrl = myGlobals.serviceUrl + '/upload/gallery';
        this.imageUrl = myGlobals.imageUrl + '/upload/gallery';
        this.profileimageUrl = myGlobals.imageUrl + '/upload/profiles';
        this.isEnable = true;
        this.commentaddloading = false;
        this.loading = false;
        this.viewfoocommenttext = new forms_1.FormControl("", forms_1.Validators.required);
        this.loginUser = myGlobals.LoginUser;
        this.viewfoocomment = builder.group({
            "viewfoocommenttext": this.viewfoocommenttext
        });
    }
    MasonryViewComponent.prototype.ngOnInit = function () {
        var formdata = this.viewfoocomment.value;
        window.fbAsyncInit = function () {
            FB.init({
                appId: "1089726191119563",
                xfbml: true,
                version: 'v2.4'
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
    MasonryViewComponent.prototype.gotogallary = function (viewfooid) {
        var link = ['/viewfoodetail', viewfooid];
        this._router.navigate(link);
    };
    MasonryViewComponent.prototype.onEditViewfoo = function (viewfooid) {
        var link = ['/gallary', viewfooid];
        this._router.navigate(link);
    };
    MasonryViewComponent.prototype.onDeleteViewfoo = function (viewfooid, viewfooindex) {
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
    MasonryViewComponent.prototype.getComment = function (viewfooid) {
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
    MasonryViewComponent.prototype.doComment = function () {
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
    MasonryViewComponent.prototype.resetform = function () {
        this.viewfoocomment.controls['viewfoocommenttext'].updateValue('');
    };
    MasonryViewComponent.prototype.openpopover = function (index) {
        $("#sharing_" + index).toggle();
    };
    MasonryViewComponent.prototype.shareFb = function (id) {
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MasonryViewComponent.prototype, "viewfoolist", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MasonryViewComponent.prototype, "onDelViewfoo", void 0);
    MasonryViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'centermasonryview',
            templateUrl: 'masonry.component.html',
            directives: [pagination_component_1.PaginationComponent, forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService, forms_1.FormBuilder])
    ], MasonryViewComponent);
    return MasonryViewComponent;
}());
exports.MasonryViewComponent = MasonryViewComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2NlbnRlci1saXN0LXZpZXcvbWFzb25yeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUVLLGVBQWUsQ0FBQyxDQUFBO0FBQ3JCLHVCQUFnRCxpQkFBaUIsQ0FBQyxDQUFBO0FBQ2xFLHVCQUE4QixpQkFBaUIsQ0FBQyxDQUFBO0FBQ2hELHNCQUEwRixnQkFBZ0IsQ0FBQyxDQUFBO0FBRzNHLDZCQUE0QixvQ0FBb0MsQ0FBQyxDQUFBO0FBR2pFLHFDQUFrQyw4Q0FBOEMsQ0FBQyxDQUFBO0FBQ2pGLElBQU8sU0FBUyxXQUFXLGVBQWUsQ0FBQyxDQUFDO0FBUTVDO0lBZUksOEJBQW9CLE9BQWUsRUFBVSxXQUF3QixFQUFTLE9BQW9CO1FBQTlFLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFaaEYsaUJBQVksR0FBeUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFMUUsZUFBVSxHQUFXLFNBQVMsQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUM7UUFDOUQsYUFBUSxHQUFXLFNBQVMsQ0FBQyxRQUFRLEdBQUcsaUJBQWlCLENBQUM7UUFDMUQsb0JBQWUsR0FBVSxTQUFTLENBQUMsUUFBUSxHQUFHLGtCQUFrQixDQUFDO1FBQzFELGFBQVEsR0FBVyxJQUFJLENBQUM7UUFDL0Isc0JBQWlCLEdBQVcsS0FBSyxDQUFDO1FBR2xDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsdUJBQWtCLEdBQWdCLElBQUksbUJBQVcsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUd2RSxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFFckMsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ2pDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxrQkFB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dkUsQ0FBQztJQUNELDBDQUFXLEdBQVgsVUFBWSxLQUFZO1FBQ3BCLENBQUMsQ0FBQyxXQUFXLEdBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUNELHNDQUFPLEdBQVAsVUFBUSxFQUFTO1FBQ2IsSUFBSSxHQUFHLEdBQUMsb0NBQW9DLEdBQUMsRUFBRSxDQUFDO1FBQzVDLEVBQUUsQ0FBQyxFQUFFLENBQ0Q7WUFDQSxNQUFNLEVBQUUsT0FBTztZQUNmLElBQUksRUFBRSxTQUFTO1lBQ2YsSUFBSSxFQUFFLEdBQUc7WUFDVCxPQUFPLEVBQUUsTUFBTTtZQUNmLE9BQU8sRUFBRSxrQkFBa0I7WUFDM0IsT0FBTyxFQUFFLEVBQUU7WUFDWCxJQUFJLEVBQUUsb0NBQW9DLEdBQUMsRUFBRTtTQUM1QyxFQUFFLFVBQVMsUUFBUSxJQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUExSEo7UUFBQyxZQUFLLEVBQUU7OzZEQUFBO0lBQ0w7UUFBQyxhQUFNLEVBQUU7OzhEQUFBO0lBVGI7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxVQUFVLEVBQUUsQ0FBQywwQ0FBbUIsRUFBRSxnQ0FBd0IsRUFBRSx3QkFBZSxDQUFDO1NBQy9FLENBQUM7OzRCQUFBO0lBK0hGLDJCQUFDO0FBQUQsQ0E5SEEsQUE4SEMsSUFBQTtBQTlIWSw0QkFBb0IsdUJBOEhoQyxDQUFBIiwiZmlsZSI6ImFwcC9ob21lL2NlbnRlci1saXN0LXZpZXcvbWFzb25yeS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUsIElucHV0LCBPdXRwdXQsIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLCBSZW5kZXJlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2UsIENoYW5nZURldGVjdG9yUmVmLCBWaWV3Q2hpbGR9XG5mcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Um91dGVzLCBSb3V0ZXIsIFJPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBWYWxpZGF0b3JzLCBGb3JtQnVpbGRlciwgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdmb28gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQge1BhZ2luYXRpb25Db21wb25lbnR9IGZyb20gJy4uLy4uL3NoYXJlZC9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50JztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi8uLi9nbG9iYWxzJyk7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdjZW50ZXJtYXNvbnJ5dmlldycsXG4gICAgdGVtcGxhdGVVcmw6ICdtYXNvbnJ5LmNvbXBvbmVudC5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbUGFnaW5hdGlvbkNvbXBvbmVudCwgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTLCBDT1JFX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIE1hc29ucnlWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRASW5wdXQoKSBwdWJsaWMgdmlld2Zvb2xpc3Q6IGFueTtcbiAgICBAT3V0cHV0KCkgcHJpdmF0ZSBvbkRlbFZpZXdmb286IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHZpZXdmb29jb21tZW50aWQ6c3RyaW5nO1xuICAgIHNlcnZpY2VVcmw6IHN0cmluZyA9IG15R2xvYmFscy5zZXJ2aWNlVXJsICsgJy91cGxvYWQvZ2FsbGVyeSc7XG4gICAgaW1hZ2VVcmw6IHN0cmluZyA9IG15R2xvYmFscy5pbWFnZVVybCArICcvdXBsb2FkL2dhbGxlcnknO1xuICAgIHByb2ZpbGVpbWFnZVVybDpzdHJpbmcgPSBteUdsb2JhbHMuaW1hZ2VVcmwgKyAnL3VwbG9hZC9wcm9maWxlcyc7XG4gICAgcHVibGljIGlzRW5hYmxlOmJvb2xlYW4gPSB0cnVlO1xuICAgIGNvbW1lbnRhZGRsb2FkaW5nOmJvb2xlYW4gPSBmYWxzZTtcbiAgICBsb2dpblVzZXI6IGFueTtcbiAgICB2aWV3Zm9vY29tbWVudHM6YW55O1xuICAgIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICB2aWV3Zm9vY29tbWVudHRleHQ6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKFwiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgIHZpZXdmb29jb21tZW50OiBGb3JtR3JvdXA7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLHByaXZhdGUgYnVpbGRlcjogRm9ybUJ1aWxkZXIpIHtcbiAgICAgICAgdGhpcy5sb2dpblVzZXIgPSBteUdsb2JhbHMuTG9naW5Vc2VyO1xuICAgICAgICBcbiAgICAgICAgdGhpcy52aWV3Zm9vY29tbWVudCA9IGJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICBcInZpZXdmb29jb21tZW50dGV4dFwiOiB0aGlzLnZpZXdmb29jb21tZW50dGV4dFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgbGV0IGZvcm1kYXRhID0gdGhpcy52aWV3Zm9vY29tbWVudC52YWx1ZTtcbiAgICAgICBcbiAgICAgICAgIHdpbmRvdy5mYkFzeW5jSW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRGQi5pbml0KHtcbiAgICAgICAgICAgICAgICAgICAgYXBwSWQ6XCIxMDg5NzI2MTkxMTE5NTYzXCIsXG4gICAgICAgICAgICAgICAgICAgIHhmYm1sOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiAndjIuNCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAoZnVuY3Rpb24oZCwgcywgaWQpIHtcbiAgICAgICAgICAgICB2YXIganMsIGZqcyA9IGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUocylbMF07XG4gICAgICAgICAgICAgaWYgKGQuZ2V0RWxlbWVudEJ5SWQoaWQpKSB7IHJldHVybjsgfVxuICAgICAgICAgICAgIGpzID0gZC5jcmVhdGVFbGVtZW50KHMpOyBqcy5pZCA9IGlkO1xuICAgICAgICAgICAgIGpzLnNyYyA9IFwiLy9jb25uZWN0LmZhY2Vib29rLm5ldC9lbl9VUy9zZGsuanNcIjtcbiAgICAgICAgICAgICBmanMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoanMsIGZqcyk7XG4gICAgICAgICB9IChkb2N1bWVudCwgJ3NjcmlwdCcsICdmYWNlYm9vay1qc3NkaycpKTtcbiAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgfVxuXG4gICAgZ290b2dhbGxhcnkodmlld2Zvb2lkOiBhbnkpIHtcbiAgICAgICAgbGV0IGxpbmsgPSBbJy92aWV3Zm9vZGV0YWlsJywgdmlld2Zvb2lkXTtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKGxpbmspO1xuICAgIH1cblxuICAgIG9uRWRpdFZpZXdmb28odmlld2Zvb2lkOiBhbnkpIHtcbiAgICAgICAgbGV0IGxpbmsgPSBbJy9nYWxsYXJ5Jywgdmlld2Zvb2lkXTtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKGxpbmspO1xuICAgIH1cblxuICAgIG9uRGVsZXRlVmlld2Zvbyh2aWV3Zm9vaWQ6IGFueSwgdmlld2Zvb2luZGV4KSB7XG4gICAgICAgIC8vdGhpcy5vbkRlbFZpZXdmb28uZW1pdCh2aWV3Zm9vaWQpO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb29kZWxldGUodmlld2Zvb2lkKVxuXHRcdFx0LnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdmb29saXN0LnNwbGljZSh2aWV3Zm9vaW5kZXgsIDEpO1xuXG5cdFx0XHR9LCAoZXJyb3I6IGFueSkgPT4ge1xuXHRcdFx0XHR0aGlzLmVycm9yTXNnID0gZXJyb3I7XG5cdFx0XHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwidmlld2ZvbyBkZWxldGUgZmFpbDogXCIgKyBlcnJvcik7XG5cdFx0XHR9KTtcbiAgICB9XG4gICAgZ2V0Q29tbWVudCh2aWV3Zm9vaWQ6c3RyaW5nKXtcbiAgICAgICB0aGlzLnZpZXdmb29jb21tZW50cz1bXTtcbiAgICAgICB0aGlzLnZpZXdmb29jb21tZW50aWQgPSB2aWV3Zm9vaWQ7XG4gICAgICAgdGhpcy5hdXRoU2VydmljZS52aWV3Zm9vZ2V0Y29tbWVudCh0aGlzLnZpZXdmb29jb21tZW50aWQpXG5cdFx0XHQuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdmb29jb21tZW50cz1yZXN1bHQuZGF0YTtcblx0XHRcdH0sIChlcnJvcjogYW55KSA9PiB7XG5cdFx0XHRcdHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJ2aWV3Zm9vIGdldCBmYWlsOiBcIiArIGVycm9yKTtcblx0XHRcdH0pO1xuICAgICAgICBcbiAgICB9XG4gICAgZG9Db21tZW50KCl7XG4gICAgICAgIHRoaXMuY29tbWVudGFkZGxvYWRpbmcgPSB0cnVlO1xuICAgICAgICBsZXQgY29tbWVudGRhdGEgPSB0aGlzLnZpZXdmb29jb21tZW50dGV4dC52YWx1ZTtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS52aWV3Zm9vYWRkY29tbWVudCh0aGlzLmxvZ2luVXNlci5pZCwndmlld2ZvbycsY29tbWVudGRhdGEsdGhpcy52aWV3Zm9vY29tbWVudGlkKVxuXHRcdFx0LnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRoU2VydmljZS52aWV3Zm9vZ2V0Y29tbWVudCh0aGlzLnZpZXdmb29jb21tZW50aWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0MSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlld2Zvb2NvbW1lbnRzPXJlc3VsdDEuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRmb3JtKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWV3Zm9vIGdldCBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1lbnRhZGRsb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR9LCAoZXJyb3I6IGFueSkgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcInZpZXdmb28gYWRkIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1lbnRhZGRsb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR9KTtcblxuICAgIH1cbiAgICBcbiAgICByZXNldGZvcm0oKXsgICAgICBcbiAgICAgICAgdGhpcy52aWV3Zm9vY29tbWVudC5jb250cm9sc1sndmlld2Zvb2NvbW1lbnR0ZXh0J10udXBkYXRlVmFsdWUoJycpO1xuICAgIH1cbiAgICBvcGVucG9wb3ZlcihpbmRleDpzdHJpbmcpe1xuICAgICAgICAkKFwiI3NoYXJpbmdfXCIraW5kZXgpLnRvZ2dsZSgpO1xuICAgIH1cbiAgICBzaGFyZUZiKGlkOnN0cmluZyl7XG4gICAgICAgIGxldCB1cmw9J2h0dHBzOi8vdmlld2Zvby5wcm8vdmlld2Zvb2RldGFpbC8nK2lkOyAgICAgIFxuICAgICAgICAgICAgRkIudWkoXG4gICAgICAgICAgICAgICAgeyAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdzaGFyZScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3ZpZXdmb28nLFxuICAgICAgICAgICAgICAgIGxpbms6IHVybCxcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiAndGVzdCcsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJ0ZXN0IGZvciB2aWV3Zm9vXCIsXG4gICAgICAgICAgICAgICAgcGljdHVyZTogXCJcIixcbiAgICAgICAgICAgICAgICBocmVmOiBcImh0dHBzOi8vdmlld2Zvby5wcm8vdmlld2Zvb2RldGFpbC9cIitpZFxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKXt9KTtcbiAgICB9XG5cbn1cbiJdfQ==
