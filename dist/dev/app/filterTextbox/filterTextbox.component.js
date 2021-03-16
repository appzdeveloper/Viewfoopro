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
var common_1 = require('@angular/common');
var FilterTextboxComponent = (function () {
    function FilterTextboxComponent() {
        this.model = { filter: null };
        this.changed = new core_1.EventEmitter();
    }
    FilterTextboxComponent.prototype.filterChanged = function (event) {
        event.preventDefault();
        this.changed.emit(this.model.filter);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FilterTextboxComponent.prototype, "changed", void 0);
    FilterTextboxComponent = __decorate([
        core_1.Component({
            selector: 'filter-textbox',
            template: "\n    <form>\n         Filter:\n         <input type=\"text\" name=\"filter\"\n                [(ngModel)]=\"model.filter\" \n                (keyup)=\"filterChanged($event)\"  />\n    </form>\n  ",
            directives: [common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], FilterTextboxComponent);
    return FilterTextboxComponent;
}());
exports.FilterTextboxComponent = FilterTextboxComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9maWx0ZXJUZXh0Ym94L2ZpbHRlclRleHRib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBZ0QsZUFBZSxDQUFDLENBQUE7QUFDaEUsdUJBQWdDLGlCQUFpQixDQUFDLENBQUE7QUFjbEQ7SUFBQTtRQUdJLFVBQUssR0FBdUIsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFHN0MsWUFBTyxHQUF5QixJQUFJLG1CQUFZLEVBQVUsQ0FBQztJQU0vRCxDQUFDO0lBSkcsOENBQWEsR0FBYixVQUFjLEtBQVU7UUFDdEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQU5EO1FBQUMsYUFBTSxFQUFFOzsyREFBQTtJQWpCYjtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFFBQVEsRUFBRSxzTUFPVDtZQUNELFVBQVUsRUFBRSxDQUFDLHdCQUFlLENBQUM7U0FDOUIsQ0FBQzs7OEJBQUE7SUFhRiw2QkFBQztBQUFELENBWkEsQUFZQyxJQUFBO0FBWlksOEJBQXNCLHlCQVlsQyxDQUFBIiwiZmlsZSI6ImFwcC9maWx0ZXJUZXh0Ym94L2ZpbHRlclRleHRib3guY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRk9STV9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmlsdGVyLXRleHRib3gnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxmb3JtPlxuICAgICAgICAgRmlsdGVyOlxuICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImZpbHRlclwiXG4gICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbC5maWx0ZXJcIiBcbiAgICAgICAgICAgICAgICAoa2V5dXApPVwiZmlsdGVyQ2hhbmdlZCgkZXZlbnQpXCIgIC8+XG4gICAgPC9mb3JtPlxuICBgLFxuICBkaXJlY3RpdmVzOiBbRk9STV9ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJUZXh0Ym94Q29tcG9uZW50IHtcblxuICBcbiAgICBtb2RlbDogeyBmaWx0ZXI6IHN0cmluZyB9ID0geyBmaWx0ZXI6IG51bGwgfTtcbiAgICBcbiAgICBAT3V0cHV0KClcbiAgICBjaGFuZ2VkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICAgZmlsdGVyQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5jaGFuZ2VkLmVtaXQodGhpcy5tb2RlbC5maWx0ZXIpOyAvL1JhaXNlIGNoYW5nZWQgZXZlbnRcbiAgICB9XG59XG4iXX0=
