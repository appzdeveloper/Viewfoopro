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
var CustomerComponent = (function () {
    function CustomerComponent(router, route) {
        this.router = router;
        this.route = route;
        this.displayModeEnum = CustomerDisplayModeEnum;
    }
    CustomerComponent.prototype.ngOnInit = function () {
        var path = this.router.url.split('/')[3];
        switch (path) {
            case 'details':
                this.displayMode = CustomerDisplayModeEnum.Details;
                break;
            case 'orders':
                this.displayMode = CustomerDisplayModeEnum.Orders;
                break;
            case 'edit':
                this.displayMode = CustomerDisplayModeEnum.Edit;
                break;
        }
    };
    CustomerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'orders',
            templateUrl: 'customer.component.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute])
    ], CustomerComponent);
    return CustomerComponent;
}());
exports.CustomerComponent = CustomerComponent;
var CustomerDisplayModeEnum;
(function (CustomerDisplayModeEnum) {
    CustomerDisplayModeEnum[CustomerDisplayModeEnum["Details"] = 0] = "Details";
    CustomerDisplayModeEnum[CustomerDisplayModeEnum["Orders"] = 1] = "Orders";
    CustomerDisplayModeEnum[CustomerDisplayModeEnum["Edit"] = 2] = "Edit";
})(CustomerDisplayModeEnum || (CustomerDisplayModeEnum = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY3VzdG9tZXIvY3VzdG9tZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0MsZUFBZSxDQUFDLENBQUE7QUFDbEQsdUJBQTJELGlCQUFpQixDQUFDLENBQUE7QUFRN0U7SUFLSSwyQkFBb0IsTUFBYyxFQUFVLEtBQXFCO1FBQTdDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUZqRSxvQkFBZSxHQUFHLHVCQUF1QixDQUFDO0lBRTJCLENBQUM7SUFFdEUsb0NBQVEsR0FBUjtRQUlFLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2IsS0FBSyxTQUFTO2dCQUNaLElBQUksQ0FBQyxXQUFXLEdBQUcsdUJBQXVCLENBQUMsT0FBTyxDQUFDO2dCQUNuRCxLQUFLLENBQUM7WUFDUixLQUFLLFFBQVE7Z0JBQ1gsSUFBSSxDQUFDLFdBQVcsR0FBRyx1QkFBdUIsQ0FBQyxNQUFNLENBQUM7Z0JBQ2xELEtBQUssQ0FBQztZQUNSLEtBQUssTUFBTTtnQkFDVCxJQUFJLENBQUMsV0FBVyxHQUFHLHVCQUF1QixDQUFDLElBQUksQ0FBQztnQkFDaEQsS0FBSyxDQUFDO1FBQ1YsQ0FBQztJQUNILENBQUM7SUE3Qkw7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsVUFBVSxFQUFFLENBQUMsMEJBQWlCLENBQUM7U0FDaEMsQ0FBQzs7eUJBQUE7SUEwQkYsd0JBQUM7QUFBRCxDQXpCQSxBQXlCQyxJQUFBO0FBekJZLHlCQUFpQixvQkF5QjdCLENBQUE7QUFFRCxJQUFLLHVCQUlKO0FBSkQsV0FBSyx1QkFBdUI7SUFDMUIsMkVBQVMsQ0FBQTtJQUNULHlFQUFRLENBQUE7SUFDUixxRUFBTSxDQUFBO0FBQ1IsQ0FBQyxFQUpJLHVCQUF1QixLQUF2Qix1QkFBdUIsUUFJM0IiLCJmaWxlIjoiYXBwLytjdXN0b21lci9jdXN0b21lci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSwgIFJPVVRFUl9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7IFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ29yZGVycycsXG4gIHRlbXBsYXRlVXJsOiAnY3VzdG9tZXIuY29tcG9uZW50Lmh0bWwnLFxuICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgXG4gICAgZGlzcGxheU1vZGU6IEN1c3RvbWVyRGlzcGxheU1vZGVFbnVtO1xuICAgIGRpc3BsYXlNb2RlRW51bSA9IEN1c3RvbWVyRGlzcGxheU1vZGVFbnVtO1xuICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgIC8vTmV4dCBsaW5lIG5lZWRzIGEgYmV0dGVyIHRlY2huaXF1ZS4gVGhpcyBpcyB0aGUgZWFzaWVzdCB3YXlcbiAgICAgIC8vdG8gZ2V0IGNoaWxkIHJvdXRlIHBhdGggdGhhdCBJJ3ZlIGZvdW5kIHNvIGZhci5cbiAgICAgIC8vSG9waW5nIHRoaXMgd2lsbCBiZSBlYXNpZXIgd2l0aCBsYXRlciBidWlsZHMgb2Ygcm91dGVyXG4gICAgICBjb25zdCBwYXRoID0gdGhpcy5yb3V0ZXIudXJsLnNwbGl0KCcvJylbM107XG4gICAgICBzd2l0Y2ggKHBhdGgpIHtcbiAgICAgICAgY2FzZSAnZGV0YWlscyc6XG4gICAgICAgICAgdGhpcy5kaXNwbGF5TW9kZSA9IEN1c3RvbWVyRGlzcGxheU1vZGVFbnVtLkRldGFpbHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ29yZGVycyc6XG4gICAgICAgICAgdGhpcy5kaXNwbGF5TW9kZSA9IEN1c3RvbWVyRGlzcGxheU1vZGVFbnVtLk9yZGVycztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZWRpdCc6XG4gICAgICAgICAgdGhpcy5kaXNwbGF5TW9kZSA9IEN1c3RvbWVyRGlzcGxheU1vZGVFbnVtLkVkaXQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG59XG5cbmVudW0gQ3VzdG9tZXJEaXNwbGF5TW9kZUVudW0ge1xuICBEZXRhaWxzPTAsXG4gIE9yZGVycz0xLFxuICBFZGl0PTJcbn1cbiJdfQ==
