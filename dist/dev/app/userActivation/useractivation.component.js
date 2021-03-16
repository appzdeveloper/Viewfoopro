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
var UserActivationComponent = (function () {
    function UserActivationComponent(route, router, authService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.sub = this.route.params.subscribe(function (params) {
            console.log(params);
            var id = params['id'];
            _this.authService.useractivation(id)
                .subscribe(function (result) {
                _this.message = result.data;
                _this.loading = false;
            }, function (error) {
                _this.message = error;
                _this.loading = false;
            });
        });
    }
    UserActivationComponent.prototype.ngOnInit = function () {
    };
    UserActivationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'useractivation',
            templateUrl: 'useractivation.component.html'
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, auth_service_1.AuthService])
    ], UserActivationComponent);
    return UserActivationComponent;
}());
exports.UserActivationComponent = UserActivationComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC91c2VyQWN0aXZhdGlvbi91c2VyYWN0aXZhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUE0QyxlQUFlLENBQUMsQ0FBQTtBQUU1RCx1QkFBdUMsaUJBQWlCLENBQUMsQ0FBQTtBQUd6RCw2QkFBNEIsaUNBQWlDLENBQUMsQ0FBQTtBQWE5RDtJQUlJLGlDQUFvQixLQUFxQixFQUM3QixNQUFjLEVBQVUsV0FBd0I7UUFMaEUsaUJBc0NDO1FBbEN1QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUM3QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFFeEQsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBR3RCLEtBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztpQkFDOUIsU0FBUyxDQUFDLFVBQUMsTUFBTTtnQkFFZCxLQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQzNCLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLENBQUMsRUFDRCxVQUFDLEtBQVU7Z0JBQ1AsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBU0QsMENBQVEsR0FBUjtJQUdBLENBQUM7SUE1Q0w7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLCtCQUErQjtTQUcvQyxDQUFDO1FBQ0QsaUJBQVUsRUFBRTs7K0JBQUE7SUF1Q2IsOEJBQUM7QUFBRCxDQXRDQSxBQXNDQyxJQUFBO0FBdENZLCtCQUF1QiwwQkFzQ25DLENBQUEiLCJmaWxlIjoiYXBwL3VzZXJBY3RpdmF0aW9uL3VzZXJhY3RpdmF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi9nbG9iYWxzJyk7XG5cblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ3VzZXJhY3RpdmF0aW9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3VzZXJhY3RpdmF0aW9uLmNvbXBvbmVudC5odG1sJ1xuXG5cbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlckFjdGl2YXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHByaXZhdGUgYWN0aXZlbGluazogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAvL3ByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIGN1cnJlbnQ6IFJvdXRlU2VnbWVudCwgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XG5cbiAgICAgICAgdGhpcy5zdWIgPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XG4gICAgICAgICAgICBsZXQgaWQgPSBwYXJhbXNbJ2lkJ107IC8vICgrKSBjb252ZXJ0cyBzdHJpbmcgJ2lkJyB0byBhIG51bWJlclxuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidXNlcmFjdGl2YXRpb24gaWQgPiBcIiArIGlkKTtcbiAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2UudXNlcmFjdGl2YXRpb24oaWQpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ1c2VyYWN0aXZhdGlvbiByZXN1bHQgPiBcIiArIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuXG4gICAgLy8gICAgcm91dGVyT25BY3RpdmF0ZShjdXJyZW50OiBSb3V0ZVNlZ21lbnQsIHByZXY/OiBSb3V0ZVNlZ21lbnQsXG4gICAgLy8gICAgICAgIGN1cnJUcmVlPzogUm91dGVUcmVlLCBwcmV2VHJlZT86IFJvdXRlVCkge1xuICAgIC8vXG4gICAgLy9cbiAgICAvLyAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuXG4gICAgfVxuXG59Il19
