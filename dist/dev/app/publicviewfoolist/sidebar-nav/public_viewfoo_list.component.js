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
var PublicViewfoolistComponent = (function () {
    function PublicViewfoolistComponent(route, router, authService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.viewfoolist = [];
        this.publicfolder = [];
        this.sub = this.route.params.subscribe(function (params) {
            _this.domainName = params['subdomain'];
        });
    }
    PublicViewfoolistComponent.prototype.ngOnInit = function () {
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
            console.log("viewfoo list fail: " + error);
        });
    };
    PublicViewfoolistComponent.prototype.getPublicViewfoolist = function (id) {
        this.authService.publicviewfoolist(id)
            .subscribe(function (result) {
            if (result) {
                if (result.data) {
                }
            }
        }, function (error) {
            console.log("viewfoo list fail: " + error);
        });
    };
    PublicViewfoolistComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'publichomepagesetting',
            templateUrl: 'public_viewfoo_list.component.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, (typeof (_a = typeof auth_service_1.AuthService !== 'undefined' && auth_service_1.AuthService) === 'function' && _a) || Object])
    ], PublicViewfoolistComponent);
    return PublicViewfoolistComponent;
    var _a;
}());
exports.PublicViewfoolistComponent = PublicViewfoolistComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9wdWJsaWN2aWV3Zm9vbGlzdC9zaWRlYmFyLW5hdi9wdWJsaWNfdmlld2Zvb19saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBQ2hELHVCQUF1RCxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3pFLDZCQUE0QixpQ0FBaUMsQ0FBQyxDQUFBO0FBRTlELHNCQUEwRixnQkFBZ0IsQ0FBQyxDQUFBO0FBYzNHO0lBSUssb0NBQW9CLEtBQXFCLEVBQzlCLE1BQWMsRUFBUyxXQUF3QjtRQUwvRCxpQkE4Q0M7UUExQ3dCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQzlCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUgzRCxnQkFBVyxHQUFZLEVBQUUsQ0FBQztRQUN6QixpQkFBWSxHQUFVLEVBQUUsQ0FBQztRQUlyQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDN0MsS0FBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFdkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsNkNBQVEsR0FBUjtRQUFBLGlCQW1CQztRQWpCRyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDN0MsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNkLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7b0JBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3pCLEtBQUksQ0FBQyxVQUFVLEdBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQ25DLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQzlDLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRXJELENBQUM7Z0JBQ0wsQ0FBQztZQUVMLENBQUM7UUFDTCxDQUFDLEVBQUUsVUFBQyxLQUFVO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztJQUVYLENBQUM7SUFDRCx5REFBb0IsR0FBcEIsVUFBcUIsRUFBUztRQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQzthQUNqQyxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQ2QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDVCxFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQztnQkFHaEIsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDLEVBQUUsVUFBQyxLQUFVO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFwREw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsV0FBVyxFQUFFLG9DQUFvQztZQUNoRCxVQUFVLEVBQUUsQ0FBQyxnQ0FBd0IsQ0FBQztTQUUxQyxDQUFDOztrQ0FBQTtJQWdERixpQ0FBQzs7QUFBRCxDQTlDQSxBQThDQyxJQUFBO0FBOUNZLGtDQUEwQiw2QkE4Q3RDLENBQUEiLCJmaWxlIjoiYXBwL3B1YmxpY3ZpZXdmb29saXN0L3NpZGViYXItbmF2L3B1YmxpY192aWV3Zm9vX2xpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTLCBSb3V0ZXIsQWN0aXZhdGVkUm91dGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnMsIEZvcm1CdWlsZGVyLCBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vZ2xvYmFscycpO1xuaW1wb3J0IHtDdXN0b21WYWxpZGF0b3JzfSBmcm9tICcuLi9zaGFyZWQvdXRpbHMvQ3VzdG9tVmFsaWRhdG9ycyc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vLi4vZ2xvYmFscycpO1xuaW1wb3J0IHsgRm9sZGVyIH0gZnJvbSAnLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgVmlld2ZvbyB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdwdWJsaWNob21lcGFnZXNldHRpbmcnLFxuICAgIHRlbXBsYXRlVXJsOiAncHVibGljX3ZpZXdmb29fbGlzdC5jb21wb25lbnQuaHRtbCdcbiAgICAgZGlyZWN0aXZlczogW1JFQUNUSVZFX0ZPUk1fRElSRUNUSVZFU11cblxufSlcblxuZXhwb3J0IGNsYXNzIFB1YmxpY1ZpZXdmb29saXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBkb21haW5OYW1lOnN0cmluZztcbiAgICB2aWV3Zm9vbGlzdDogVmlld2ZvbyA9IFtdO1xuICAgICBwdWJsaWNmb2xkZXI6Rm9sZGVyID0gW107XG4gICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XG4gICAgICAgXG4gICAgICAgICB0aGlzLnN1YiA9IHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICAgdGhpcy5kb21haW5OYW1lID0gcGFyYW1zWydzdWJkb21haW4nXTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgXG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UucHVibGljZm9sZGVybGlzdCh0aGlzLmRvbWFpbk5hbWUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5kYXRhKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9sZGVybGlzdD1yZXN1bHQuZGF0YS5mb2xkZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdC5kYXRhLmZvbGRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVibGljZm9sZGVyLnB1c2gocmVzdWx0LmRhdGEuZm9sZGVyW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpZXdmb28gbGlzdCBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgIH1cbiAgICBnZXRQdWJsaWNWaWV3Zm9vbGlzdChpZDpzdHJpbmcpe1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnB1YmxpY3ZpZXdmb29saXN0KGlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQuZGF0YSl7XG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWV3Zm9vIGxpc3QgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgXG59Il19
