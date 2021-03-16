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
var data_service_1 = require('../shared/services/data.service');
var capitalize_pipe_1 = require('../shared/pipes/capitalize.pipe');
var CustomerDetailsComponent = (function () {
    function CustomerDetailsComponent(router, route, dataService) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
    }
    CustomerDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = +this.router.routerState.parent(this.route).snapshot.params['id'];
        this.dataService.getCustomer(id)
            .subscribe(function (customer) { return _this.customer = customer; });
    };
    CustomerDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'customer-details',
            templateUrl: 'customerDetails.component.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            pipes: [capitalize_pipe_1.CapitalizePipe]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, data_service_1.DataService])
    ], CustomerDetailsComponent);
    return CustomerDetailsComponent;
}());
exports.CustomerDetailsComponent = CustomerDetailsComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY3VzdG9tZXIvY3VzdG9tZXJEZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWtDLGVBQWUsQ0FBQyxDQUFBO0FBQ2xELHVCQUEwRCxpQkFBaUIsQ0FBQyxDQUFBO0FBRzVFLDZCQUE0QixpQ0FBaUMsQ0FBQyxDQUFBO0FBQzlELGdDQUErQixpQ0FBaUMsQ0FBQyxDQUFBO0FBU2pFO0lBSUUsa0NBQW9CLE1BQWMsRUFBVSxLQUFxQixFQUFVLFdBQXdCO1FBQS9FLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUksQ0FBQztJQUV4RywyQ0FBUSxHQUFSO1FBQUEsaUJBSUM7UUFIRyxJQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7YUFDM0IsU0FBUyxDQUFDLFVBQUMsUUFBbUIsSUFBSyxPQUFBLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxFQUF4QixDQUF3QixDQUFDLENBQUM7SUFDdEUsQ0FBQztJQWpCSDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFVBQVUsRUFBRSxDQUFFLDBCQUFpQixDQUFFO1lBQ2pDLEtBQUssRUFBRSxDQUFFLGdDQUFjLENBQUU7U0FDMUIsQ0FBQzs7Z0NBQUE7SUFZRiwrQkFBQztBQUFELENBWEEsQUFXQyxJQUFBO0FBWFksZ0NBQXdCLDJCQVdwQyxDQUFBIiwiZmlsZSI6ImFwcC8rY3VzdG9tZXIvY3VzdG9tZXJEZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlLCBST1VURVJfRElSRUNUSVZFUyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IElDdXN0b21lciB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2RhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBDYXBpdGFsaXplUGlwZSB9IGZyb20gJy4uL3NoYXJlZC9waXBlcy9jYXBpdGFsaXplLnBpcGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdjdXN0b21lci1kZXRhaWxzJyxcbiAgdGVtcGxhdGVVcmw6ICdjdXN0b21lckRldGFpbHMuY29tcG9uZW50Lmh0bWwnLFxuICBkaXJlY3RpdmVzOiBbIFJPVVRFUl9ESVJFQ1RJVkVTIF0sXG4gIHBpcGVzOiBbIENhcGl0YWxpemVQaXBlIF1cbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJEZXRhaWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjdXN0b21lcjogSUN1c3RvbWVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgICBjb25zdCBpZCA9ICt0aGlzLnJvdXRlci5yb3V0ZXJTdGF0ZS5wYXJlbnQodGhpcy5yb3V0ZSkuc25hcHNob3QucGFyYW1zWydpZCddO1xuICAgICAgdGhpcy5kYXRhU2VydmljZS5nZXRDdXN0b21lcihpZClcbiAgICAgICAgICAuc3Vic2NyaWJlKChjdXN0b21lcjogSUN1c3RvbWVyKSA9PiB0aGlzLmN1c3RvbWVyID0gY3VzdG9tZXIpO1xuICB9XG59Il19
