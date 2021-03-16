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
var CustomerOrdersComponent = (function () {
    function CustomerOrdersComponent(router, route, dataService) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.filteredOrders = [];
    }
    CustomerOrdersComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = +this.router.routerState.parent(this.route).snapshot.params['id'];
        this.dataService.getOrders(id).subscribe(function (orders) {
            _this.filteredOrders = orders;
        });
        this.dataService.getCustomer(id).subscribe(function (customer) {
            _this.customer = customer;
        });
    };
    CustomerOrdersComponent.prototype.orderTrackBy = function (index, order) {
        return order.id;
    };
    CustomerOrdersComponent.prototype.orderItemTrackBy = function (index, orderItem) {
        return orderItem.id;
    };
    CustomerOrdersComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'customer-orders',
            templateUrl: 'customerOrders.component.html',
            pipes: [capitalize_pipe_1.CapitalizePipe]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, data_service_1.DataService])
    ], CustomerOrdersComponent);
    return CustomerOrdersComponent;
}());
exports.CustomerOrdersComponent = CustomerOrdersComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY3VzdG9tZXIvY3VzdG9tZXJPcmRlcnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0MsZUFBZSxDQUFDLENBQUE7QUFDbEQsdUJBQXVDLGlCQUFpQixDQUFDLENBQUE7QUFFekQsNkJBQTRCLGlDQUFpQyxDQUFDLENBQUE7QUFFOUQsZ0NBQStCLGlDQUFpQyxDQUFDLENBQUE7QUFRakU7SUFLRSxpQ0FBb0IsTUFBYyxFQUFVLEtBQXFCLEVBQVUsV0FBd0I7UUFBL0UsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFIbkcsbUJBQWMsR0FBYSxFQUFFLENBQUM7SUFHeUUsQ0FBQztJQUV4RywwQ0FBUSxHQUFSO1FBQUEsaUJBUUM7UUFQQyxJQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFnQjtZQUN4RCxLQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLFFBQW1CO1lBQzdELEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDhDQUFZLEdBQVosVUFBYSxLQUFhLEVBQUUsS0FBaUI7UUFDM0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELGtEQUFnQixHQUFoQixVQUFpQixLQUFhLEVBQUUsU0FBYztRQUM1QyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBN0JIO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsS0FBSyxFQUFFLENBQUUsZ0NBQWMsQ0FBRTtTQUMxQixDQUFDOzsrQkFBQTtJQTBCRiw4QkFBQztBQUFELENBekJBLEFBeUJDLElBQUE7QUF6QlksK0JBQXVCLDBCQXlCbkMsQ0FBQSIsImZpbGUiOiJhcHAvK2N1c3RvbWVyL2N1c3RvbWVyT3JkZXJzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IElDdXN0b21lciwgSU9yZGVyLCBJT3JkZXJJdGVtIH0gZnJvbSAnLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQ2FwaXRhbGl6ZVBpcGUgfSBmcm9tICcuLi9zaGFyZWQvcGlwZXMvY2FwaXRhbGl6ZS5waXBlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnY3VzdG9tZXItb3JkZXJzJyxcbiAgdGVtcGxhdGVVcmw6ICdjdXN0b21lck9yZGVycy5jb21wb25lbnQuaHRtbCcsXG4gIHBpcGVzOiBbIENhcGl0YWxpemVQaXBlIF1cbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJPcmRlcnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZpbHRlcmVkT3JkZXJzOiBJT3JkZXJbXSA9IFtdO1xuICBjdXN0b21lcjogSUN1c3RvbWVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3QgaWQgPSArdGhpcy5yb3V0ZXIucm91dGVyU3RhdGUucGFyZW50KHRoaXMucm91dGUpLnNuYXBzaG90LnBhcmFtc1snaWQnXTtcbiAgICB0aGlzLmRhdGFTZXJ2aWNlLmdldE9yZGVycyhpZCkuc3Vic2NyaWJlKChvcmRlcnM6IElPcmRlcltdKSA9PiB7XG4gICAgICB0aGlzLmZpbHRlcmVkT3JkZXJzID0gb3JkZXJzO1xuICAgIH0pO1xuICAgIHRoaXMuZGF0YVNlcnZpY2UuZ2V0Q3VzdG9tZXIoaWQpLnN1YnNjcmliZSgoY3VzdG9tZXI6IElDdXN0b21lcikgPT4ge1xuICAgICAgdGhpcy5jdXN0b21lciA9IGN1c3RvbWVyO1xuICAgIH0pO1xuICB9XG4gIFxuICBvcmRlclRyYWNrQnkoaW5kZXg6IG51bWJlciwgb3JkZXI6IElPcmRlckl0ZW0pIHtcbiAgICByZXR1cm4gb3JkZXIuaWQ7XG4gIH1cbiAgXG4gIG9yZGVySXRlbVRyYWNrQnkoaW5kZXg6IG51bWJlciwgb3JkZXJJdGVtOiBhbnkpIHtcbiAgICByZXR1cm4gb3JkZXJJdGVtLmlkO1xuICB9XG5cbn0iXX0=
