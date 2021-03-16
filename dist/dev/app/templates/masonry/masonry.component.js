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
var MasonryComponent = (function () {
    function MasonryComponent() {
        this.onContainerDelete = new core_1.EventEmitter();
    }
    MasonryComponent.prototype.onDeleteContainer = function () {
        this.container.deleting = true;
        this.onContainerDelete.emit(this.container.id);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MasonryComponent.prototype, "container", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MasonryComponent.prototype, "onContainerDelete", void 0);
    MasonryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'masonry',
            templateUrl: 'masonry.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], MasonryComponent);
    return MasonryComponent;
}());
exports.MasonryComponent = MasonryComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC90ZW1wbGF0ZXMvbWFzb25yeS9tYXNvbnJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EscUJBRUssZUFBZSxDQUFDLENBQUE7QUFPckI7SUFBQTtRQUd1QixzQkFBaUIsR0FBeUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFNcEYsQ0FBQztJQUpHLDRDQUFpQixHQUFqQjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQU5EO1FBQUMsWUFBSyxFQUFFOzt1REFBQTtJQUNQO1FBQUMsYUFBTSxFQUFFOzsrREFBQTtJQVRkO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUUsd0JBQXdCO1NBRXhDLENBQUM7O3dCQUFBO0lBVUYsdUJBQUM7QUFBRCxDQVRBLEFBU0MsSUFBQTtBQVRZLHdCQUFnQixtQkFTNUIsQ0FBQSIsImZpbGUiOiJhcHAvdGVtcGxhdGVzL21hc29ucnkvbWFzb25yeS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZSwgQ2hhbmdlRGV0ZWN0b3JSZWZ9XG5mcm9tICdAYW5ndWxhci9jb3JlJztcbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdtYXNvbnJ5JyxcbiAgICB0ZW1wbGF0ZVVybDogJ21hc29ucnkuY29tcG9uZW50Lmh0bWwnXG4gICAgLy9kaXJlY3RpdmVzOiBbIFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUywgQ09SRV9ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBNYXNvbnJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBjb250YWluZXI6IGFueTtcbiAgICAgQE91dHB1dCgpIHByaXZhdGUgb25Db250YWluZXJEZWxldGU6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICBcbiAgICBvbkRlbGV0ZUNvbnRhaW5lcigpe1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5kZWxldGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMub25Db250YWluZXJEZWxldGUuZW1pdCh0aGlzLmNvbnRhaW5lci5pZCk7XG4gICAgfVxufVxuXG4iXX0=
