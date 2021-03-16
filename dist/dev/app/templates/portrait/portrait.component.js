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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var gallary_component_1 = require('../gallary/gallary.component');
var imagesingle_component_1 = require('../imagesingle/imagesingle.component');
var pagination_component_1 = require('../../shared/pagination/pagination.component');
var PortraitComponent = (function () {
    function PortraitComponent() {
        this.onContainerDelete = new core_1.EventEmitter();
    }
    PortraitComponent.prototype.onDeleteContainer = function () {
        this.container.deleting = true;
        this.onContainerDelete.emit(this.container.id);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PortraitComponent.prototype, "container", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PortraitComponent.prototype, "onContainerDelete", void 0);
    PortraitComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'portrait1',
            templateUrl: 'portrait.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, pagination_component_1.PaginationComponent,
                forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, gallary_component_1.GallaryComponent, imagesingle_component_1.ImageSingleComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], PortraitComponent);
    return PortraitComponent;
}());
exports.PortraitComponent = PortraitComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC90ZW1wbGF0ZXMvcG9ydHJhaXQvcG9ydHJhaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFFSyxlQUFlLENBQUMsQ0FBQTtBQUNyQix1QkFBd0MsaUJBQWlCLENBQUMsQ0FBQTtBQUUxRCx1QkFBOEIsaUJBQWlCLENBQUMsQ0FBQTtBQUNoRCxzQkFBeUMsZ0JBQWdCLENBQUMsQ0FBQTtBQUMxRCxrQ0FBaUMsOEJBQThCLENBQUMsQ0FBQTtBQUNoRSxzQ0FBcUMsc0NBQXNDLENBQUMsQ0FBQTtBQUs1RSxxQ0FBa0MsOENBQThDLENBQUMsQ0FBQTtBQVVqRjtJQUFBO1FBR3VCLHNCQUFpQixHQUF5QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQU1wRixDQUFDO0lBSkcsNkNBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBTkQ7UUFBQyxZQUFLLEVBQUU7O3dEQUFBO0lBQ1A7UUFBQyxhQUFNLEVBQUU7O2dFQUFBO0lBVmQ7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSx5QkFBeUI7WUFDckMsVUFBVSxFQUFFLENBQUMsMEJBQWlCLEVBQUUsMENBQW1CO2dCQUNwRCxnQ0FBd0IsRUFBRSx3QkFBZSxFQUFFLG9DQUFnQixFQUFFLDRDQUFvQixDQUFDO1NBQ3JGLENBQUM7O3lCQUFBO0lBVUYsd0JBQUM7QUFBRCxDQVRBLEFBU0MsSUFBQTtBQVRZLHlCQUFpQixvQkFTN0IsQ0FBQSIsImZpbGUiOiJhcHAvdGVtcGxhdGVzL3BvcnRyYWl0L3BvcnRyYWl0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZSwgQ2hhbmdlRGV0ZWN0b3JSZWZ9XG5mcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVMsIFJvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBHYWxsYXJ5Q29tcG9uZW50IH0gZnJvbSAnLi4vZ2FsbGFyeS9nYWxsYXJ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbWFnZVNpbmdsZUNvbXBvbmVudCB9IGZyb20gJy4uL2ltYWdlc2luZ2xlL2ltYWdlc2luZ2xlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdmb28gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQge1BhZ2luYXRpb25Db21wb25lbnR9IGZyb20gJy4uLy4uL3NoYXJlZC9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50JztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi8uLi9nbG9iYWxzJyk7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdwb3J0cmFpdDEnLFxuICAgIHRlbXBsYXRlVXJsOiAncG9ydHJhaXQuY29tcG9uZW50Lmh0bWwnLFxuICAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVMsIFBhZ2luYXRpb25Db21wb25lbnQsIFxuICAgIFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUywgQ09SRV9ESVJFQ1RJVkVTLCBHYWxsYXJ5Q29tcG9uZW50LCBJbWFnZVNpbmdsZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUG9ydHJhaXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgcHVibGljIGNvbnRhaW5lcjogYW55O1xuICAgICBAT3V0cHV0KCkgcHJpdmF0ZSBvbkNvbnRhaW5lckRlbGV0ZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgIFxuICAgIG9uRGVsZXRlQ29udGFpbmVyKCl7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmRlbGV0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vbkNvbnRhaW5lckRlbGV0ZS5lbWl0KHRoaXMuY29udGFpbmVyLmlkKTtcbiAgICB9XG59XG4iXX0=
