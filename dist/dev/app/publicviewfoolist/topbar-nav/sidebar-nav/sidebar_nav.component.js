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
var auth_service_1 = require('../../shared/services/auth.service');
var forms_1 = require('@angular/forms');
var SidebarnavComponent = (function () {
    function SidebarnavComponent(route, router, authService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.publicfolder = [];
        this.folderchange = new core_1.EventEmitter();
        this.sub = this.route.params.subscribe(function (params) {
            _this.domainName = params['subdomain'];
        });
    }
    SidebarnavComponent.prototype.ngOnInit = function () {
        this.getfolderlist();
    };
    SidebarnavComponent.prototype.getfolderlist = function () {
        var _this = this;
        this.authService.publicfolderlist(this.domainName)
            .subscribe(function (result) {
            if (result) {
                if (result.data) {
                    console.log(result.data);
                    _this.folderlist = result.data.folder;
                    for (var i = 0; i < result.data.folder.length; i++) {
                        _this.publicfolder.push(result.data.folder[i]);
                    }
                }
            }
        }, function (error) {
            console.log("folder list fail: " + error);
        });
    };
    SidebarnavComponent.prototype.setPublicViewfooid = function (id, parentid) {
        this.publicViewfooid = id;
        this.folderchange.emit(id);
        this.parentid = parentid;
        alert(this.parentid);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SidebarnavComponent.prototype, "folderchange", void 0);
    SidebarnavComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sidebarnav',
            templateUrl: 'sidebar_nav.component.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, (typeof (_a = typeof auth_service_1.AuthService !== 'undefined' && auth_service_1.AuthService) === 'function' && _a) || Object])
    ], SidebarnavComponent);
    return SidebarnavComponent;
    var _a;
}());
exports.SidebarnavComponent = SidebarnavComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9wdWJsaWN2aWV3Zm9vbGlzdC90b3BiYXItbmF2L3NpZGViYXItbmF2L3NpZGViYXJfbmF2LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXFFLGVBQWUsQ0FBQyxDQUFBO0FBQ3JGLHVCQUF3RCxpQkFBaUIsQ0FBQyxDQUFBO0FBQzFFLDZCQUE0QixvQ0FBb0MsQ0FBQyxDQUFBO0FBRWpFLHNCQUEwRixnQkFBZ0IsQ0FBQyxDQUFBO0FBYzNHO0lBT0ksNkJBQW9CLEtBQXFCLEVBQzdCLE1BQWMsRUFBUyxXQUF3QjtRQVIvRCxpQkEyQ0M7UUFwQ3VCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQzdCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUwzRCxpQkFBWSxHQUFVLEVBQUUsQ0FBQztRQUdQLGlCQUFZLEdBQXlCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBSXJFLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUM3QyxLQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV2QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxzQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDRCwyQ0FBYSxHQUFiO1FBQUEsaUJBaUJDO1FBaEJHLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUM3QyxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQ2QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDVCxFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQztvQkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDekIsS0FBSSxDQUFDLFVBQVUsR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDbkMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDOUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFckQsQ0FBQztnQkFDTCxDQUFDO1lBRUwsQ0FBQztRQUNMLENBQUMsRUFBRSxVQUFDLEtBQVU7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUNELGdEQUFrQixHQUFsQixVQUFtQixFQUFTLEVBQUMsUUFBZTtRQUN4QyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFuQ0Q7UUFBQyxhQUFNLEVBQUU7OzZEQUFBO0lBZGI7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFdBQVcsRUFBRSw0QkFBNEI7WUFDeEMsVUFBVSxFQUFFLENBQUMsZ0NBQXdCLENBQUM7U0FFMUMsQ0FBQzs7MkJBQUE7SUE2Q0YsMEJBQUM7O0FBQUQsQ0EzQ0EsQUEyQ0MsSUFBQTtBQTNDWSwyQkFBbUIsc0JBMkMvQixDQUFBIiwiZmlsZSI6ImFwcC9wdWJsaWN2aWV3Zm9vbGlzdC90b3BiYXItbmF2L3NpZGViYXItbmF2L3NpZGViYXJfbmF2LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIE91dHB1dCxpbnB1dCxFdmVudEVtaXR0ZXIsT25DaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVMsIFJvdXRlcixBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnMsIEZvcm1CdWlsZGVyLCBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vLi4vZ2xvYmFscycpO1xuaW1wb3J0IHtDdXN0b21WYWxpZGF0b3JzfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMvQ3VzdG9tVmFsaWRhdG9ycyc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vLi4vZ2xvYmFscycpO1xuaW1wb3J0IHsgRm9sZGVyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnc2lkZWJhcm5hdicsXG4gICAgdGVtcGxhdGVVcmw6ICdzaWRlYmFyX25hdi5jb21wb25lbnQuaHRtbCdcbiAgICAgZGlyZWN0aXZlczogW1JFQUNUSVZFX0ZPUk1fRElSRUNUSVZFU11cblxufSlcblxuZXhwb3J0IGNsYXNzIFNpZGViYXJuYXZDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsT25DaGFuZ2VzIHtcbiAgICBkb21haW5OYW1lOnN0cmluZztcbiAgIFxuICAgIHB1YmxpY2ZvbGRlcjpGb2xkZXIgPSBbXTtcbiAgICBwdWJsaWNWaWV3Zm9vaWQ6c3RyaW5nO1xuICAgIHBhcmVudGlkOnN0cmluZztcbiAgICBAT3V0cHV0KCkgcHJpdmF0ZSBmb2xkZXJjaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XG4gICAgICAgXG4gICAgICAgICB0aGlzLnN1YiA9IHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICAgdGhpcy5kb21haW5OYW1lID0gcGFyYW1zWydzdWJkb21haW4nXTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZ2V0Zm9sZGVybGlzdCgpO1xuICAgIH1cbiAgICBnZXRmb2xkZXJsaXN0KCl7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UucHVibGljZm9sZGVybGlzdCh0aGlzLmRvbWFpbk5hbWUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5kYXRhKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9sZGVybGlzdD1yZXN1bHQuZGF0YS5mb2xkZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdC5kYXRhLmZvbGRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVibGljZm9sZGVyLnB1c2gocmVzdWx0LmRhdGEuZm9sZGVyW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvbGRlciBsaXN0IGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldFB1YmxpY1ZpZXdmb29pZChpZDpzdHJpbmcscGFyZW50aWQ6c3RyaW5nKXtcbiAgICAgICAgdGhpcy5wdWJsaWNWaWV3Zm9vaWQgPSBpZDtcbiAgICAgICAgdGhpcy5mb2xkZXJjaGFuZ2UuZW1pdChpZCk7XG4gICAgICAgIHRoaXMucGFyZW50aWQgPSBwYXJlbnRpZDtcbiAgICAgICAgYWxlcnQodGhpcy5wYXJlbnRpZCk7XG4gICAgfVxuICAgIFxufSJdfQ==
