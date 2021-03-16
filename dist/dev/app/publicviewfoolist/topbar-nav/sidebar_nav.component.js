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
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, auth_service_1.AuthService])
    ], SidebarnavComponent);
    return SidebarnavComponent;
}());
exports.SidebarnavComponent = SidebarnavComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9wdWJsaWN2aWV3Zm9vbGlzdC90b3BiYXItbmF2L3NpZGViYXJfbmF2LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXFFLGVBQWUsQ0FBQyxDQUFBO0FBQ3JGLHVCQUF3RCxpQkFBaUIsQ0FBQyxDQUFBO0FBQzFFLDZCQUE0QixvQ0FBb0MsQ0FBQyxDQUFBO0FBRWpFLHNCQUEwRixnQkFBZ0IsQ0FBQyxDQUFBO0FBYzNHO0lBT0ksNkJBQW9CLEtBQXFCLEVBQzdCLE1BQWMsRUFBUyxXQUF3QjtRQVIvRCxpQkEyQ0M7UUFwQ3VCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQzdCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUwzRCxpQkFBWSxHQUFVLEVBQUUsQ0FBQztRQUdQLGlCQUFZLEdBQXlCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBSXJFLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUM3QyxLQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV2QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxzQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDRCwyQ0FBYSxHQUFiO1FBQUEsaUJBaUJDO1FBaEJHLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUM3QyxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQ2QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDVCxFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQztvQkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDekIsS0FBSSxDQUFDLFVBQVUsR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDbkMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDOUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFckQsQ0FBQztnQkFDTCxDQUFDO1lBRUwsQ0FBQztRQUNMLENBQUMsRUFBRSxVQUFDLEtBQVU7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUNELGdEQUFrQixHQUFsQixVQUFtQixFQUFTLEVBQUMsUUFBZTtRQUN4QyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFuQ0Q7UUFBQyxhQUFNLEVBQUU7OzZEQUFBO0lBZGI7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFdBQVcsRUFBRSw0QkFBNEI7WUFDeEMsVUFBVSxFQUFFLENBQUMsZ0NBQXdCLENBQUM7U0FFMUMsQ0FBQzs7MkJBQUE7SUE2Q0YsMEJBQUM7QUFBRCxDQTNDQSxBQTJDQyxJQUFBO0FBM0NZLDJCQUFtQixzQkEyQy9CLENBQUEiLCJmaWxlIjoiYXBwL3B1YmxpY3ZpZXdmb29saXN0L3RvcGJhci1uYXYvc2lkZWJhcl9uYXYuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgT3V0cHV0LGlucHV0LEV2ZW50RW1pdHRlcixPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFUywgUm91dGVyLEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycywgRm9ybUJ1aWxkZXIsIFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi8uLi9nbG9iYWxzJyk7XG5pbXBvcnQge0N1c3RvbVZhbGlkYXRvcnN9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy9DdXN0b21WYWxpZGF0b3JzJztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi8uLi9nbG9iYWxzJyk7XG5pbXBvcnQgeyBGb2xkZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdzaWRlYmFybmF2JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3NpZGViYXJfbmF2LmNvbXBvbmVudC5odG1sJ1xuICAgICBkaXJlY3RpdmVzOiBbUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTXVxuXG59KVxuXG5leHBvcnQgY2xhc3MgU2lkZWJhcm5hdkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCxPbkNoYW5nZXMge1xuICAgIGRvbWFpbk5hbWU6c3RyaW5nO1xuICAgXG4gICAgcHVibGljZm9sZGVyOkZvbGRlciA9IFtdO1xuICAgIHB1YmxpY1ZpZXdmb29pZDpzdHJpbmc7XG4gICAgcGFyZW50aWQ6c3RyaW5nO1xuICAgIEBPdXRwdXQoKSBwcml2YXRlIGZvbGRlcmNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIscHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcbiAgICAgICBcbiAgICAgICAgIHRoaXMuc3ViID0gdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICAgICB0aGlzLmRvbWFpbk5hbWUgPSBwYXJhbXNbJ3N1YmRvbWFpbiddO1xuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5nZXRmb2xkZXJsaXN0KCk7XG4gICAgfVxuICAgIGdldGZvbGRlcmxpc3QoKXtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5wdWJsaWNmb2xkZXJsaXN0KHRoaXMuZG9tYWluTmFtZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0LmRhdGEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2xkZXJsaXN0PXJlc3VsdC5kYXRhLmZvbGRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0LmRhdGEuZm9sZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdWJsaWNmb2xkZXIucHVzaChyZXN1bHQuZGF0YS5mb2xkZXJbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm9sZGVyIGxpc3QgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0UHVibGljVmlld2Zvb2lkKGlkOnN0cmluZyxwYXJlbnRpZDpzdHJpbmcpe1xuICAgICAgICB0aGlzLnB1YmxpY1ZpZXdmb29pZCA9IGlkO1xuICAgICAgICB0aGlzLmZvbGRlcmNoYW5nZS5lbWl0KGlkKTtcbiAgICAgICAgdGhpcy5wYXJlbnRpZCA9IHBhcmVudGlkO1xuICAgICAgICBhbGVydCh0aGlzLnBhcmVudGlkKTtcbiAgICB9XG4gICAgXG59Il19
