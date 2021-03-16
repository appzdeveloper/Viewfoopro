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
var CustomerEditComponent = (function () {
    function CustomerEditComponent(router, route, dataService) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.customer = {
            id: 0,
            firstName: '',
            lastName: '',
            gender: '',
            address: '',
            city: '',
            state: {
                abbreviation: '',
                name: ''
            }
        };
    }
    CustomerEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = +this.router.routerState.parent(this.route).snapshot.params['id'];
        this.dataService.getCustomer(id).subscribe(function (customer) {
            var cust = JSON.stringify(customer);
            _this.customer = JSON.parse(cust);
        });
        this.dataService.getStates().subscribe(function (states) { return _this.states = states; });
    };
    CustomerEditComponent.prototype.onSubmit = function () {
        var _this = this;
        this.dataService.updateCustomer(this.customer)
            .subscribe(function (status) {
            _this.router.navigate(['/']);
        });
    };
    CustomerEditComponent.prototype.onCancel = function (event) {
        event.preventDefault();
        this.router.navigate(['/']);
    };
    CustomerEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'customer-edit',
            templateUrl: 'customerEdit.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, data_service_1.DataService])
    ], CustomerEditComponent);
    return CustomerEditComponent;
}());
exports.CustomerEditComponent = CustomerEditComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY3VzdG9tZXIvY3VzdG9tZXJFZGl0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWtDLGVBQWUsQ0FBQyxDQUFBO0FBQ2xELHVCQUF1QyxpQkFBaUIsQ0FBQyxDQUFBO0FBRXpELDZCQUE0QixpQ0FBaUMsQ0FBQyxDQUFBO0FBUTlEO0lBaUJFLCtCQUFvQixNQUFjLEVBQVUsS0FBcUIsRUFBVSxXQUF3QjtRQUEvRSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQWZuRyxhQUFRLEdBQ1I7WUFDRSxFQUFFLEVBQUUsQ0FBQztZQUNMLFNBQVMsRUFBRSxFQUFFO1lBQ2IsUUFBUSxFQUFFLEVBQUU7WUFDWixNQUFNLEVBQUUsRUFBRTtZQUNWLE9BQU8sRUFBRSxFQUFFO1lBQ1gsSUFBSSxFQUFFLEVBQUU7WUFDUixLQUFLLEVBQUU7Z0JBQ0gsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLElBQUksRUFBRSxFQUFFO2FBQ1g7U0FDRixDQUFDO0lBR3FHLENBQUM7SUFFeEcsd0NBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEcsSUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsUUFBbUI7WUFFN0QsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QyxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQWdCLElBQUssT0FBQSxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQzNDLFNBQVMsQ0FBQyxVQUFDLE1BQWU7WUFDekIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHdDQUFRLEdBQVIsVUFBUyxLQUFZO1FBQ25CLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQTVDSDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLDZCQUE2QjtTQUMzQyxDQUFDOzs2QkFBQTtJQTBDRiw0QkFBQztBQUFELENBekNBLEFBeUNDLElBQUE7QUF6Q1ksNkJBQXFCLHdCQXlDakMsQ0FBQSIsImZpbGUiOiJhcHAvK2N1c3RvbWVyL2N1c3RvbWVyRWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2RhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBJQ3VzdG9tZXIsIElTdGF0ZSB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnY3VzdG9tZXItZWRpdCcsXG4gIHRlbXBsYXRlVXJsOiAnY3VzdG9tZXJFZGl0LmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21lckVkaXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGN1c3RvbWVyOiBJQ3VzdG9tZXIgPSBcbiAge1xuICAgIGlkOiAwLFxuICAgIGZpcnN0TmFtZTogJycsXG4gICAgbGFzdE5hbWU6ICcnLFxuICAgIGdlbmRlcjogJycsXG4gICAgYWRkcmVzczogJycsXG4gICAgY2l0eTogJycsXG4gICAgc3RhdGU6IHtcbiAgICAgICAgYWJicmV2aWF0aW9uOiAnJyxcbiAgICAgICAgbmFtZTogJydcbiAgICB9XG4gIH07XG4gIHN0YXRlczogSVN0YXRlW107XG4gIFxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgICAgY29uc3QgaWQgPSArdGhpcy5yb3V0ZXIucm91dGVyU3RhdGUucGFyZW50KHRoaXMucm91dGUpLnNuYXBzaG90LnBhcmFtc1snaWQnXTtcbiAgICAgIHRoaXMuZGF0YVNlcnZpY2UuZ2V0Q3VzdG9tZXIoaWQpLnN1YnNjcmliZSgoY3VzdG9tZXI6IElDdXN0b21lcikgPT4ge1xuICAgICAgICAvL1F1aWNrIGFuZCBkaXJ0eSBjbG9uZSB1c2VkIGluIGNhc2UgdXNlciBjYW5jZWxzIG91dCBvZiBmb3JtXG4gICAgICAgIGNvbnN0IGN1c3QgPSBKU09OLnN0cmluZ2lmeShjdXN0b21lcik7XG4gICAgICAgIHRoaXMuY3VzdG9tZXIgPSBKU09OLnBhcnNlKGN1c3QpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmRhdGFTZXJ2aWNlLmdldFN0YXRlcygpLnN1YnNjcmliZSgoc3RhdGVzOiBJU3RhdGVbXSkgPT4gdGhpcy5zdGF0ZXMgPSBzdGF0ZXMpO1xuICB9XG4gIFxuICBvblN1Ym1pdCgpIHtcbiAgICAgIHRoaXMuZGF0YVNlcnZpY2UudXBkYXRlQ3VzdG9tZXIodGhpcy5jdXN0b21lcilcbiAgICAgICAgLnN1YnNjcmliZSgoc3RhdHVzOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJ10pO1xuICAgICAgfSk7XG4gIH1cbiAgXG4gIG9uQ2FuY2VsKGV2ZW50OiBFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJ10pO1xuICB9XG5cbn0iXX0=
