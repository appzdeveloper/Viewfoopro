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
var filterTextbox_component_1 = require('../filterTextbox/filterTextbox.component');
var customersCard_component_1 = require('./customersCard.component');
var customersGrid_component_1 = require('./customersGrid.component');
var CustomersComponent = (function () {
    function CustomersComponent(dataService) {
        this.dataService = dataService;
        this.customers = [];
        this.filteredCustomers = [];
        this.displayModeEnum = DisplayModeEnum;
    }
    CustomersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.title = 'Customers';
        this.filterText = 'Filter Customers:';
        this.displayMode = DisplayModeEnum.Card;
        this.dataService.getCustomers()
            .subscribe(function (customers) {
            _this.customers = _this.filteredCustomers = customers;
        });
    };
    CustomersComponent.prototype.changeDisplayMode = function (mode) {
        this.displayMode = mode;
    };
    CustomersComponent.prototype.filterChanged = function (data) {
        if (data && this.customers) {
            data = data.toUpperCase();
            var props_1 = ['firstName', 'lastName', 'address', 'city', 'orderTotal'];
            var filtered = this.customers.filter(function (item) {
                var match = false;
                for (var _i = 0, props_2 = props_1; _i < props_2.length; _i++) {
                    var prop = props_2[_i];
                    if (item[prop].toString().toUpperCase().indexOf(data) > -1) {
                        match = true;
                        break;
                    }
                }
                ;
                return match;
            });
            this.filteredCustomers = filtered;
        }
        else {
            this.filteredCustomers = this.customers;
        }
    };
    CustomersComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'customers',
            templateUrl: 'customers.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, filterTextbox_component_1.FilterTextboxComponent,
                customersCard_component_1.CustomersCardComponent, customersGrid_component_1.CustomersGridComponent]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], CustomersComponent);
    return CustomersComponent;
}());
exports.CustomersComponent = CustomersComponent;
var DisplayModeEnum;
(function (DisplayModeEnum) {
    DisplayModeEnum[DisplayModeEnum["Card"] = 0] = "Card";
    DisplayModeEnum[DisplayModeEnum["Grid"] = 1] = "Grid";
    DisplayModeEnum[DisplayModeEnum["Map"] = 2] = "Map";
})(DisplayModeEnum || (DisplayModeEnum = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jdXN0b21lcnMvY3VzdG9tZXJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWtDLGVBQWUsQ0FBQyxDQUFBO0FBQ2xELHVCQUFrQyxpQkFBaUIsQ0FBQyxDQUFBO0FBR3BELDZCQUE0QixpQ0FBaUMsQ0FBQyxDQUFBO0FBQzlELHdDQUF1QywwQ0FBMEMsQ0FBQyxDQUFBO0FBQ2xGLHdDQUF1QywyQkFBMkIsQ0FBQyxDQUFBO0FBQ25FLHdDQUF1QywyQkFDdkMsQ0FBQyxDQURpRTtBQVVsRTtJQVNFLDRCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUw1QyxjQUFTLEdBQWdCLEVBQUUsQ0FBQztRQUM1QixzQkFBaUIsR0FBZ0IsRUFBRSxDQUFDO1FBRXBDLG9CQUFlLEdBQUcsZUFBZSxDQUFDO0lBRWMsQ0FBQztJQUVqRCxxQ0FBUSxHQUFSO1FBQUEsaUJBVUM7UUFUQyxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLG1CQUFtQixDQUFDO1FBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQztRQUV4QyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRTthQUMxQixTQUFTLENBQUMsVUFBQyxTQUFzQjtZQUNoQyxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7SUFFVCxDQUFDO0lBRUQsOENBQWlCLEdBQWpCLFVBQWtCLElBQXFCO1FBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFRCwwQ0FBYSxHQUFiLFVBQWMsSUFBWTtRQUN4QixFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMxQixJQUFJLE9BQUssR0FBRyxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztZQUN2RSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUk7Z0JBQ3JDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDbEIsR0FBRyxDQUFDLENBQWEsVUFBSyxFQUFMLGlCQUFLLEVBQUwsbUJBQUssRUFBTCxJQUFLLENBQUM7b0JBQWxCLElBQUksSUFBSSxjQUFBO29CQUVULEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzRCxLQUFLLEdBQUcsSUFBSSxDQUFDO3dCQUNiLEtBQUssQ0FBQztvQkFDUixDQUFDO2lCQUNKO2dCQUFBLENBQUM7Z0JBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7UUFDdEMsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUMsQ0FBQztJQUNILENBQUM7SUF0REg7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsVUFBVSxFQUFFLENBQUMsMEJBQWlCLEVBQUUsZ0RBQXNCO2dCQUN6QyxnREFBc0IsRUFBRSxnREFBc0IsQ0FBQztTQUM3RCxDQUFDOzswQkFBQTtJQWtERix5QkFBQztBQUFELENBakRBLEFBaURDLElBQUE7QUFqRFksMEJBQWtCLHFCQWlEOUIsQ0FBQTtBQUVELElBQUssZUFJSjtBQUpELFdBQUssZUFBZTtJQUNsQixxREFBUSxDQUFBO0lBQ1IscURBQVEsQ0FBQTtJQUNSLG1EQUFPLENBQUE7QUFDVCxDQUFDLEVBSkksZUFBZSxLQUFmLGVBQWUsUUFJbkIiLCJmaWxlIjoiYXBwL2N1c3RvbWVycy9jdXN0b21lcnMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJPVVRFUl9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbi8vaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2RhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBGaWx0ZXJUZXh0Ym94Q29tcG9uZW50IH0gZnJvbSAnLi4vZmlsdGVyVGV4dGJveC9maWx0ZXJUZXh0Ym94LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDdXN0b21lcnNDYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9jdXN0b21lcnNDYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDdXN0b21lcnNHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9jdXN0b21lcnNHcmlkLmNvbXBvbmVudCdcbmltcG9ydCB7IElDdXN0b21lciwgSU9yZGVyIH0gZnJvbSAnLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuXG5AQ29tcG9uZW50KHsgXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnY3VzdG9tZXJzJywgXG4gIHRlbXBsYXRlVXJsOiAnY3VzdG9tZXJzLmNvbXBvbmVudC5odG1sJyxcbiAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTLCBGaWx0ZXJUZXh0Ym94Q29tcG9uZW50LCBcbiAgICAgICAgICAgICAgIEN1c3RvbWVyc0NhcmRDb21wb25lbnQsIEN1c3RvbWVyc0dyaWRDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgdGl0bGU6IHN0cmluZztcbiAgZmlsdGVyVGV4dDogc3RyaW5nO1xuICBjdXN0b21lcnM6IElDdXN0b21lcltdID0gW107XG4gIGZpbHRlcmVkQ3VzdG9tZXJzOiBJQ3VzdG9tZXJbXSA9IFtdO1xuICBkaXNwbGF5TW9kZTogRGlzcGxheU1vZGVFbnVtO1xuICBkaXNwbGF5TW9kZUVudW0gPSBEaXNwbGF5TW9kZUVudW07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHsgfVxuICBcbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy50aXRsZSA9ICdDdXN0b21lcnMnO1xuICAgIHRoaXMuZmlsdGVyVGV4dCA9ICdGaWx0ZXIgQ3VzdG9tZXJzOic7XG4gICAgdGhpcy5kaXNwbGF5TW9kZSA9IERpc3BsYXlNb2RlRW51bS5DYXJkO1xuXG4gICAgdGhpcy5kYXRhU2VydmljZS5nZXRDdXN0b21lcnMoKVxuICAgICAgICAuc3Vic2NyaWJlKChjdXN0b21lcnM6IElDdXN0b21lcltdKSA9PiB7XG4gICAgICAgICAgdGhpcy5jdXN0b21lcnMgPSB0aGlzLmZpbHRlcmVkQ3VzdG9tZXJzID0gY3VzdG9tZXJzO1xuICAgICAgICB9KTtcblxuICB9XG5cbiAgY2hhbmdlRGlzcGxheU1vZGUobW9kZTogRGlzcGxheU1vZGVFbnVtKSB7XG4gICAgICB0aGlzLmRpc3BsYXlNb2RlID0gbW9kZTtcbiAgfVxuXG4gIGZpbHRlckNoYW5nZWQoZGF0YTogc3RyaW5nKSB7XG4gICAgaWYgKGRhdGEgJiYgdGhpcy5jdXN0b21lcnMpIHtcbiAgICAgICAgZGF0YSA9IGRhdGEudG9VcHBlckNhc2UoKTtcbiAgICAgICAgbGV0IHByb3BzID0gWydmaXJzdE5hbWUnLCAnbGFzdE5hbWUnLCAnYWRkcmVzcycsICdjaXR5JywgJ29yZGVyVG90YWwnXTtcbiAgICAgICAgbGV0IGZpbHRlcmVkID0gdGhpcy5jdXN0b21lcnMuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgICAgbGV0IG1hdGNoID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm9wIG9mIHByb3BzKSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhpdGVtW3Byb3BdICsgJyAnICsgaXRlbVtwcm9wXS50b1VwcGVyQ2FzZSgpLmluZGV4T2YoZGF0YSkpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtW3Byb3BdLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKS5pbmRleE9mKGRhdGEpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgIG1hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZpbHRlcmVkQ3VzdG9tZXJzID0gZmlsdGVyZWQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5maWx0ZXJlZEN1c3RvbWVycyA9IHRoaXMuY3VzdG9tZXJzO1xuICAgIH1cbiAgfVxuXG59XG5cbmVudW0gRGlzcGxheU1vZGVFbnVtIHtcbiAgQ2FyZCA9IDAsXG4gIEdyaWQgPSAxLFxuICBNYXAgPSAyXG59XG4iXX0=
