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
var myGlobals = require('../globals');
var sidebar_nav_component_1 = require('./sidebar-nav/sidebar_nav.component');
var topbar_nav_component_1 = require('./topbar-nav/topbar_nav.component');
var PublicDashboardComponent = (function () {
    function PublicDashboardComponent(route, router, authService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.serviceUrl = myGlobals.serviceUrl + '/upload/gallery';
        this.imageUrl = myGlobals.imageUrl + '/upload/gallery';
        this.userhomesettings = {};
        this.folderlist = [];
        this.folderid = "0";
        console.log("PublicDashboardComponent constructor");
        this.sub = this.route.params.subscribe(function (params) {
            _this.subdomain = params['subdomain'];
            _this.getUserHomepageSettings();
            _this.getfolderlist();
        });
    }
    PublicDashboardComponent.prototype.ngOnInit = function () {
    };
    PublicDashboardComponent.prototype.getUserHomepageSettings = function () {
        var _this = this;
        this.authService.userpublichomesettings(this.subdomain)
            .subscribe(function (result) {
            _this.authService.publicViewfooChangeSource.next({
                action: "publichomepagesetting",
                data: result.data
            });
            _this.userhomesettings = result.data;
            if (_this.userhomesettings.disablerightmousebtn == 'true') {
            }
        }, function (error) {
            console.log("public homepage setting fail: " + error);
        });
    };
    PublicDashboardComponent.prototype.getfolderlist = function () {
        var _this = this;
        this.authService.publicfolderlist(this.subdomain)
            .subscribe(function (result) {
            if (result.data) {
                _this.folderlist = result.data;
            }
        }, function (error) {
            console.log("folder list fail: " + error);
        });
    };
    PublicDashboardComponent.prototype.onFolderClick = function (fid) {
        this.authService.publicViewfooChangeSource.next({
            action: "onFolderClick",
            data: fid
        });
        this.folderid = fid;
    };
    PublicDashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'publicdashboard',
            templateUrl: 'publicdashboard.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, sidebar_nav_component_1.SidebarnavComponent, topbar_nav_component_1.TopbarnavComponent]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, auth_service_1.AuthService])
    ], PublicDashboardComponent);
    return PublicDashboardComponent;
}());
exports.PublicDashboardComponent = PublicDashboardComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9wdWJsaWN2aWV3Zm9vbGlzdC9wdWJsaWNkYXNoYm9hcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFDaEQsdUJBQXdELGlCQUFpQixDQUFDLENBQUE7QUFDMUUsNkJBQTRCLGlDQUFpQyxDQUFDLENBQUE7QUFHOUQsSUFBTyxTQUFTLFdBQVcsWUFBWSxDQUFDLENBQUM7QUFJekMsc0NBQW9DLHFDQUFxQyxDQUFDLENBQUE7QUFDMUUscUNBQW1DLG1DQUFtQyxDQUFDLENBQUE7QUFRdkU7SUFvQkksa0NBQW9CLEtBQXFCLEVBQVUsTUFBYyxFQUFVLFdBQXdCO1FBcEJ2RyxpQkEwRkM7UUF0RXVCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBZm5HLGVBQVUsR0FBVyxTQUFTLENBQUMsVUFBVSxHQUFHLGlCQUFpQixDQUFDO1FBQzlELGFBQVEsR0FBVyxTQUFTLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDO1FBRW5ELHFCQUFnQixHQUFRLEVBQUUsQ0FBQztRQUtsQyxlQUFVLEdBQWEsRUFBRSxDQUFDO1FBUXRCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBRXBCLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDekMsS0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFckMsS0FBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7WUFFeEMsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRWhCLENBQUMsQ0FBQyxDQUFDO0lBR1AsQ0FBQztJQXBCRCwyQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQW9CRCwwREFBdUIsR0FBdkI7UUFBQSxpQkF3QkM7UUF2QkcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ2xELFNBQVMsQ0FBQyxVQUFDLE1BQVc7WUFFbkIsS0FBSSxDQUFDLFdBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUM7Z0JBQzVDLE1BQU0sRUFBRSx1QkFBdUI7Z0JBQy9CLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTthQUNwQixDQUFDLENBQUM7WUFFZixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUV4QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQVEzRCxDQUFDO1FBRUwsQ0FBQyxFQUFFLFVBQUMsS0FBVTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsZ0RBQWEsR0FBYjtRQUFBLGlCQWFDO1FBWkcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQzVDLFNBQVMsQ0FBQyxVQUFDLE1BQVc7WUFFbkIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRTdCLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNuQixDQUFDO1FBR0wsQ0FBQyxFQUFFLFVBQUMsS0FBVTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsZ0RBQWEsR0FBYixVQUFjLEdBQVE7UUFFbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUM7WUFDNUMsTUFBTSxFQUFFLGVBQWU7WUFDdkIsSUFBSSxFQUFFLEdBQUc7U0FDWixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztJQUN4QixDQUFDO0lBNUZMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDaEQsVUFBVSxFQUFFLENBQUMsMEJBQWlCLEVBQUUsMkNBQW1CLEVBQUUseUNBQWtCLENBQUM7U0FDeEUsQ0FBQzs7Z0NBQUE7SUEyRkYsK0JBQUM7QUFBRCxDQTFGQSxBQTBGQyxJQUFBO0FBMUZZLGdDQUF3QiwyQkEwRnBDLENBQUEiLCJmaWxlIjoiYXBwL3B1YmxpY3ZpZXdmb29saXN0L3B1YmxpY2Rhc2hib2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVMsIFJvdXRlciwgQWN0aXZhdGVkUm91dGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcblxuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uL2dsb2JhbHMnKTtcbmltcG9ydCB7Q3VzdG9tVmFsaWRhdG9yc30gZnJvbSAnLi4vc2hhcmVkL3V0aWxzL0N1c3RvbVZhbGlkYXRvcnMnO1xuXG5pbXBvcnQgeyBWaWV3Zm9vLCBGb2xkZXIgfSBmcm9tICcuLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBTaWRlYmFybmF2Q29tcG9uZW50IH0gZnJvbSAnLi9zaWRlYmFyLW5hdi9zaWRlYmFyX25hdi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9wYmFybmF2Q29tcG9uZW50IH0gZnJvbSAnLi90b3BiYXItbmF2L3RvcGJhcl9uYXYuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ3B1YmxpY2Rhc2hib2FyZCcsXG4gICAgdGVtcGxhdGVVcmw6ICdwdWJsaWNkYXNoYm9hcmQuY29tcG9uZW50Lmh0bWwnLFxuXHRkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVMsIFNpZGViYXJuYXZDb21wb25lbnQsIFRvcGJhcm5hdkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHVibGljRGFzaGJvYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBzdWJkb21haW46IHN0cmluZztcblxuICAgIGZvbGRlcmlkOiBzdHJpbmc7XG5cbiAgICBzZXJ2aWNlVXJsOiBzdHJpbmcgPSBteUdsb2JhbHMuc2VydmljZVVybCArICcvdXBsb2FkL2dhbGxlcnknO1xuICAgIGltYWdlVXJsOiBzdHJpbmcgPSBteUdsb2JhbHMuaW1hZ2VVcmwgKyAnL3VwbG9hZC9nYWxsZXJ5JztcblxuICAgIHB1YmxpYyB1c2VyaG9tZXNldHRpbmdzOiBhbnkgPSB7fTtcblxuICAgIHN1YjogYW55O1xuXG5cbiAgICBmb2xkZXJsaXN0OiBGb2xkZXJbXSA9IFtdO1xuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICB9XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xuICAgICAgICB0aGlzLmZvbGRlcmlkID0gXCIwXCI7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJQdWJsaWNEYXNoYm9hcmRDb21wb25lbnQgY29uc3RydWN0b3JcIik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnN1YiA9IHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdWJkb21haW4gPSBwYXJhbXNbJ3N1YmRvbWFpbiddO1xuXG4gICAgICAgICAgICB0aGlzLmdldFVzZXJIb21lcGFnZVNldHRpbmdzKCk7XG5cblx0XHRcdHRoaXMuZ2V0Zm9sZGVybGlzdCgpO1xuXG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cbiAgICBnZXRVc2VySG9tZXBhZ2VTZXR0aW5ncygpIHtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS51c2VycHVibGljaG9tZXNldHRpbmdzKHRoaXMuc3ViZG9tYWluKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0OiBhbnkpID0+IHtcblxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2UucHVibGljVmlld2Zvb0NoYW5nZVNvdXJjZS5uZXh0KHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBcInB1YmxpY2hvbWVwYWdlc2V0dGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiByZXN1bHQuZGF0YVxuICAgICAgICAgICAgICAgIH0pO1xuXG5cdFx0XHRcdHRoaXMudXNlcmhvbWVzZXR0aW5ncyA9IHJlc3VsdC5kYXRhO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlcmhvbWVzZXR0aW5ncy5kaXNhYmxlcmlnaHRtb3VzZWJ0biA9PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZG9jdW1lbnQub25tb3VzZWRvd24gPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdmFyIHN0YXR1cz1cIlJpZ2h0IENsaWNrIERpc2FibGVkXCI7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZiAoZXZlbnQuYnV0dG9uID09IDIpIHtcblx0XHRcdFx0XHQvLyBcdFx0YWxlcnQoc3RhdHVzKTtcblx0XHRcdFx0XHQvLyBcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdC8vIFx0fVxuICAgICAgICAgICAgICAgICAgICAvLyB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInB1YmxpYyBob21lcGFnZSBzZXR0aW5nIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0Zm9sZGVybGlzdCgpIHtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5wdWJsaWNmb2xkZXJsaXN0KHRoaXMuc3ViZG9tYWluKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0OiBhbnkpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YSkge1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2cocmVzdWx0LmRhdGEpO1xuXHRcdFx0XHRcdHRoaXMuZm9sZGVybGlzdCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm9sZGVyIGxpc3QgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkZvbGRlckNsaWNrKGZpZDogYW55KSB7XG5cbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5wdWJsaWNWaWV3Zm9vQ2hhbmdlU291cmNlLm5leHQoe1xuICAgICAgICAgICAgYWN0aW9uOiBcIm9uRm9sZGVyQ2xpY2tcIixcbiAgICAgICAgICAgIGRhdGE6IGZpZFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZvbGRlcmlkID0gZmlkO1xuICAgIH1cblxuXG5cbn1cbiJdfQ==
