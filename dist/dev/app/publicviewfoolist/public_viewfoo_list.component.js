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
var sidebar_nav_component_1 = require('./sidebar-nav/sidebar_nav.component');
var topbar_nav_component_1 = require('./topbar-nav/topbar_nav.component');
var PublicViewfoolistComponent = (function () {
    function PublicViewfoolistComponent(route, router, authService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.viewfoolist = [];
        this.serviceUrl = myGlobals.serviceUrl + '/upload/gallery';
        this.folderlist = [];
        this.isListing = false;
        this.isMasonry = false;
        this.isGallery = false;
        this.sub = this.route.params.subscribe(function (params) {
            _this.domainName = params['subdomain'];
            _this.getUserHomepageSettings();
            _this.getfolderlist();
        });
    }
    PublicViewfoolistComponent.prototype.ngOnInit = function () {
        this.folderid = '';
    };
    PublicViewfoolistComponent.prototype.onListing = function () {
        this.isListing = true;
        this.isMasonry = false;
        this.isGallery = false;
    };
    PublicViewfoolistComponent.prototype.onMasonry = function () {
        this.isListing = false;
        this.isMasonry = true;
        this.isGallery = false;
    };
    PublicViewfoolistComponent.prototype.onGallery = function () {
        this.isListing = false;
        this.isMasonry = false;
        this.isGallery = true;
    };
    PublicViewfoolistComponent.prototype.getUserHomepageSettings = function () {
        var _this = this;
        this.authService.userpublichomesettings(this.domainName)
            .subscribe(function (result) {
            if (result) {
                if (result.data) {
                    console.log(result.data);
                    _this.userhomesettings = result.data;
                    if (_this.userhomesettings.viewfoodisplay == 'gallery') {
                        _this.onGallery();
                    }
                    else if (_this.userhomesettings.viewfoodisplay == 'tile') {
                        _this.onListing();
                    }
                    else if (_this.userhomesettings.viewfoodisplay == 'masonry') {
                        _this.onMasonry();
                    }
                    console.log(_this.userhomesettings.navposition);
                }
            }
        }, function (error) {
            console.log("public homepage setting fail: " + error);
        });
    };
    PublicViewfoolistComponent.prototype.getfolderlist = function () {
        var _this = this;
        this.authService.publicfolderlist(this.domainName)
            .subscribe(function (result) {
            if (result.data) {
                _this.folderlist = result.data.folder;
                _this.getPublicViewfoolist(_this.folderlist[0].id);
            }
        }, function (error) {
            console.log("folder list fail: " + error);
        });
    };
    PublicViewfoolistComponent.prototype.getPublicViewfoolist = function (folderid) {
        var _this = this;
        console.log("public_viewfoo_list getPublicViewfoolist folderid: " + folderid);
        this.folderid = folderid;
        this.authService.publicviewfoo(this.folderid)
            .subscribe(function (result) {
            _this.viewfoolist = result.data[0].viewfoolist;
            console.log(_this.viewfoolist);
        }, function (error) {
            console.log("viewfoo list fail: " + error);
        });
    };
    PublicViewfoolistComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'publicviewfoolist',
            templateUrl: 'public_viewfoo_list.component.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES, sidebar_nav_component_1.SidebarnavComponent, topbar_nav_component_1.TopbarnavComponent]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, auth_service_1.AuthService])
    ], PublicViewfoolistComponent);
    return PublicViewfoolistComponent;
}());
exports.PublicViewfoolistComponent = PublicViewfoolistComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9wdWJsaWN2aWV3Zm9vbGlzdC9wdWJsaWNfdmlld2Zvb19saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBQ2hELHVCQUF3RCxpQkFBaUIsQ0FBQyxDQUFBO0FBQzFFLDZCQUE0QixpQ0FBaUMsQ0FBQyxDQUFBO0FBRTlELHNCQUEwRixnQkFBZ0IsQ0FBQyxDQUFBO0FBQzNHLElBQU8sU0FBUyxXQUFXLFlBQVksQ0FBQyxDQUFDO0FBSXpDLHNDQUFvQyxxQ0FBcUMsQ0FBQyxDQUFBO0FBQzFFLHFDQUFtQyxtQ0FBbUMsQ0FBQyxDQUFBO0FBUXZFO0lBc0NJLG9DQUFvQixLQUFxQixFQUFVLE1BQWMsRUFBVSxXQUF3QjtRQXRDdkcsaUJBNEdDO1FBdEV1QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQXBDbkcsZ0JBQVcsR0FBYyxFQUFFLENBQUM7UUFFNUIsZUFBVSxHQUFXLFNBQVMsQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUM7UUFLOUQsZUFBVSxHQUFhLEVBQUUsQ0FBQztRQUUxQixjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsY0FBUyxHQUFZLEtBQUssQ0FBQztRQTJCdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ3pDLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXRDLEtBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBRXhDLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUdoQixDQUFDLENBQUMsQ0FBQztJQUdQLENBQUM7SUFwQ0QsNkNBQVEsR0FBUjtRQUNJLElBQUksQ0FB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RyxRQUFRLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3hDLFNBQVMsQ0FBQyxVQUFDLE1BQVc7WUFDL0IsS0FBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztZQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV0QixDQUFDLEVBQUUsVUFBQyxLQUFVO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFoSEw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsV0FBVyxFQUFFLG9DQUFvQztZQUNwRCxVQUFVLEVBQUUsQ0FBQyxnQ0FBd0IsRUFBRSwyQ0FBbUIsRUFBRSx5Q0FBa0IsQ0FBQztTQUMvRSxDQUFDOztrQ0FBQTtJQTZHRixpQ0FBQztBQUFELENBNUdBLEFBNEdDLElBQUE7QUE1R1ksa0NBQTBCLDZCQTRHdEMsQ0FBQSIsImZpbGUiOiJhcHAvcHVibGljdmlld2Zvb2xpc3QvcHVibGljX3ZpZXdmb29fbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVMsIFJvdXRlciwgQWN0aXZhdGVkUm91dGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnMsIEZvcm1CdWlsZGVyLCBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vZ2xvYmFscycpO1xuaW1wb3J0IHtDdXN0b21WYWxpZGF0b3JzfSBmcm9tICcuLi9zaGFyZWQvdXRpbHMvQ3VzdG9tVmFsaWRhdG9ycyc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vLi4vZ2xvYmFscycpO1xuaW1wb3J0IHsgVmlld2ZvbywgRm9sZGVyIH0gZnJvbSAnLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgU2lkZWJhcm5hdkNvbXBvbmVudCB9IGZyb20gJy4vc2lkZWJhci1uYXYvc2lkZWJhcl9uYXYuY29tcG9uZW50JztcbmltcG9ydCB7IFRvcGJhcm5hdkNvbXBvbmVudCB9IGZyb20gJy4vdG9wYmFyLW5hdi90b3BiYXJfbmF2LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdwdWJsaWN2aWV3Zm9vbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICdwdWJsaWNfdmlld2Zvb19saXN0LmNvbXBvbmVudC5odG1sJyxcblx0ZGlyZWN0aXZlczogW1JFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUywgU2lkZWJhcm5hdkNvbXBvbmVudCwgVG9wYmFybmF2Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQdWJsaWNWaWV3Zm9vbGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgZG9tYWluTmFtZTogc3RyaW5nO1xuICAgIHZpZXdmb29saXN0OiBWaWV3Zm9vW10gPSBbXTtcbiAgICBmb2xkZXJpZDogc3RyaW5nO1xuICAgIHNlcnZpY2VVcmw6IHN0cmluZyA9IG15R2xvYmFscy5zZXJ2aWNlVXJsICsgJy91cGxvYWQvZ2FsbGVyeSc7XG4gICAgcHVibGljIHVzZXJob21lc2V0dGluZ3M6IGFueTtcbiAgICBzdWI6IGFueTtcblxuXG4gICAgZm9sZGVybGlzdDogRm9sZGVyW10gPSBbXTtcblxuICAgIGlzTGlzdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzTWFzb25yeTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzR2FsbGVyeTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZm9sZGVyaWQgPSAnJztcblxuICAgIH1cblxuICAgIG9uTGlzdGluZygpIHtcbiAgICAgICAgdGhpcy5pc0xpc3RpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzTWFzb25yeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzR2FsbGVyeSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uTWFzb25yeSgpIHtcbiAgICAgICAgdGhpcy5pc0xpc3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc01hc29ucnkgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzR2FsbGVyeSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uR2FsbGVyeSgpIHtcbiAgICAgICAgdGhpcy5pc0xpc3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc01hc29ucnkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0dhbGxlcnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xuXG4gICAgICAgIHRoaXMuc3ViID0gdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICAgICAgICB0aGlzLmRvbWFpbk5hbWUgPSBwYXJhbXNbJ3N1YmRvbWFpbiddO1xuXG4gICAgICAgICAgICB0aGlzLmdldFVzZXJIb21lcGFnZVNldHRpbmdzKCk7XG5cblx0XHRcdHRoaXMuZ2V0Zm9sZGVybGlzdCgpO1xuXG4gICAgICAgICAgICAvL3RoaXMuZ2V0UHVibGljVmlld2Zvb2xpc3QoXCJcIik7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cbiAgICBnZXRVc2VySG9tZXBhZ2VTZXR0aW5ncygpIHtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS51c2VycHVibGljaG9tZXNldHRpbmdzKHRoaXMuZG9tYWluTmFtZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJob21lc2V0dGluZ3MgPSByZXN1bHQuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy51c2VyaG9tZXNldHRpbmdzLnZpZXdmb29kaXNwbGF5ID09ICdnYWxsZXJ5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25HYWxsZXJ5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYodGhpcy51c2VyaG9tZXNldHRpbmdzLnZpZXdmb29kaXNwbGF5ID09ICd0aWxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25MaXN0aW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLnVzZXJob21lc2V0dGluZ3Mudmlld2Zvb2Rpc3BsYXkgPT0gJ21hc29ucnknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk1hc29ucnkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy51c2VyaG9tZXNldHRpbmdzLm5hdnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwdWJsaWMgaG9tZXBhZ2Ugc2V0dGluZyBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldGZvbGRlcmxpc3QoKSB7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UucHVibGljZm9sZGVybGlzdCh0aGlzLmRvbWFpbk5hbWUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhKSB7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhyZXN1bHQuZGF0YSk7XG5cdFx0XHRcdFx0dGhpcy5mb2xkZXJsaXN0ID0gcmVzdWx0LmRhdGEuZm9sZGVyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFB1YmxpY1ZpZXdmb29saXN0KHRoaXMuZm9sZGVybGlzdFswXS5pZCk7XG4gICAgICAgICAgICAgICAgfVxuXHRcdFx0XHQvLyBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdC5kYXRhLmZvbGRlci5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHQvLyBcdHRoaXMucHVibGljZm9sZGVyLnB1c2gocmVzdWx0LmRhdGEuZm9sZGVyW2ldKTtcblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gfVxuXG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm9sZGVyIGxpc3QgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRQdWJsaWNWaWV3Zm9vbGlzdChmb2xkZXJpZDogYW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicHVibGljX3ZpZXdmb29fbGlzdCBnZXRQdWJsaWNWaWV3Zm9vbGlzdCBmb2xkZXJpZDogXCIgKyBmb2xkZXJpZCk7XG4gICAgICAgIHRoaXMuZm9sZGVyaWQgPSBmb2xkZXJpZDtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5wdWJsaWN2aWV3Zm9vKHRoaXMuZm9sZGVyaWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4ge1xuXHRcdFx0XHR0aGlzLnZpZXdmb29saXN0ID0gcmVzdWx0LmRhdGFbMF0udmlld2Zvb2xpc3Q7XG5cdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMudmlld2Zvb2xpc3QpO1xuXG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlld2ZvbyBsaXN0IGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=
