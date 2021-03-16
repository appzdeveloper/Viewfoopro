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
var SortByDirective = (function () {
    function SortByDirective() {
        this.sorted = new core_1.EventEmitter();
    }
    Object.defineProperty(SortByDirective.prototype, "sortBy", {
        set: function (value) {
            this.sortProperty = value;
        },
        enumerable: true,
        configurable: true
    });
    SortByDirective.prototype.onClick = function (event) {
        event.preventDefault();
        this.sorted.next(this.sortProperty);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SortByDirective.prototype, "sorted", void 0);
    __decorate([
        core_1.Input('sort-by'), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SortByDirective.prototype, "sortBy", null);
    SortByDirective = __decorate([
        core_1.Directive({
            selector: '[sort-by]',
            host: {
                '(click)': 'onClick($event)'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], SortByDirective);
    return SortByDirective;
}());
exports.SortByDirective = SortByDirective;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvZGlyZWN0aXZlcy9zb3J0YnkuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBdUQsZUFBZSxDQUFDLENBQUE7QUFRdkU7SUFPRTtRQUZELFdBQU0sR0FBeUIsSUFBSSxtQkFBWSxFQUFVLENBQUM7SUFFekMsQ0FBQztJQUdqQixzQkFBSSxtQ0FBTTthQUFWLFVBQVcsS0FBYTtZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUVELGlDQUFPLEdBQVAsVUFBUSxLQUFVO1FBQ2hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQWJEO1FBQUMsYUFBTSxFQUFFOzttREFBQTtJQUtUO1FBQUMsWUFBSyxDQUFDLFNBQVMsQ0FBQzs7O2lEQUFBO0lBZm5CO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxXQUFXO1lBQ3JCLElBQUksRUFBRTtnQkFDSixTQUFTLEVBQUUsaUJBQWlCO2FBQzdCO1NBQ0YsQ0FBQzs7dUJBQUE7SUFvQkYsc0JBQUM7QUFBRCxDQW5CQSxBQW1CQyxJQUFBO0FBbkJZLHVCQUFlLGtCQW1CM0IsQ0FBQSIsImZpbGUiOiJhcHAvc2hhcmVkL2RpcmVjdGl2ZXMvc29ydGJ5LmRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tzb3J0LWJ5XScsXG4gIGhvc3Q6IHtcbiAgICAnKGNsaWNrKSc6ICdvbkNsaWNrKCRldmVudCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgU29ydEJ5RGlyZWN0aXZlIHtcblx0XG5cdHByaXZhdGUgc29ydFByb3BlcnR5OiBzdHJpbmc7XG4gIFxuICBAT3V0cHV0KClcblx0c29ydGVkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXHRcbiAgY29uc3RydWN0b3IoKSB7IH1cbiAgICBcbiAgQElucHV0KCdzb3J0LWJ5JykgXG4gIHNldCBzb3J0QnkodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuc29ydFByb3BlcnR5ID0gdmFsdWU7XG4gIH1cblxuICBvbkNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc29ydGVkLm5leHQodGhpcy5zb3J0UHJvcGVydHkpOyAvL1JhaXNlIGNsaWNrZWQgZXZlbnRcbiAgfVxuXG59Il19
