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
var LandscapeComponent = (function () {
    function LandscapeComponent() {
        this.onContainerDelete = new core_1.EventEmitter();
    }
    LandscapeComponent.prototype.onDeleteContainer = function () {
        this.container.deleting = true;
        this.onContainerDelete.emit(this.container.id);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LandscapeComponent.prototype, "container", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LandscapeComponent.prototype, "onContainerDelete", void 0);
    LandscapeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'landscape',
            templateUrl: 'landscape.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, pagination_component_1.PaginationComponent,
                forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, gallary_component_1.GallaryComponent, imagesingle_component_1.ImageSingleComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], LandscapeComponent);
    return LandscapeComponent;
}());
exports.LandscapeComponent = LandscapeComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC90ZW1wbGF0ZXMvbGFuZHNjYXBlL2xhbmRzY2FwZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHFCQUVLLGVBQWUsQ0FBQyxDQUFBO0FBQ3JCLHVCQUF3QyxpQkFBaUIsQ0FBQyxDQUFBO0FBRTFELHVCQUE4QixpQkFBaUIsQ0FBQyxDQUFBO0FBQ2hELHNCQUF5QyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQzFELGtDQUFpQyw4QkFBOEIsQ0FBQyxDQUFBO0FBQ2hFLHNDQUFxQyxzQ0FBc0MsQ0FBQyxDQUFBO0FBSzVFLHFDQUFrQyw4Q0FBOEMsQ0FBQyxDQUFBO0FBYWpGO0lBQUE7UUFHc0Isc0JBQWlCLEdBQXlCLElBQUksbUJBQVksRUFBRSxDQUFDO0lBTW5GLENBQUM7SUFKRyw4Q0FBaUIsR0FBakI7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFORDtRQUFDLFlBQUssRUFBRTs7eURBQUE7SUFDUjtRQUFDLGFBQU0sRUFBRTs7aUVBQUE7SUFYYjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLDBCQUEwQjtZQUN0QyxVQUFVLEVBQUUsQ0FBQywwQkFBaUIsRUFBRSwwQ0FBbUI7Z0JBQ3BELGdDQUF3QixFQUFFLHdCQUFlLEVBQUUsb0NBQWdCLEVBQUUsNENBQW9CLENBQUM7U0FDckYsQ0FBQzs7MEJBQUE7SUFXRix5QkFBQztBQUFELENBVEEsQUFTQyxJQUFBO0FBVFksMEJBQWtCLHFCQVM5QixDQUFBIiwiZmlsZSI6ImFwcC90ZW1wbGF0ZXMvbGFuZHNjYXBlL2xhbmRzY2FwZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZSwgQ2hhbmdlRGV0ZWN0b3JSZWZ9XG5mcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVMsIFJvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBHYWxsYXJ5Q29tcG9uZW50IH0gZnJvbSAnLi4vZ2FsbGFyeS9nYWxsYXJ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbWFnZVNpbmdsZUNvbXBvbmVudCB9IGZyb20gJy4uL2ltYWdlc2luZ2xlL2ltYWdlc2luZ2xlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdmb28gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQge1BhZ2luYXRpb25Db21wb25lbnR9IGZyb20gJy4uLy4uL3NoYXJlZC9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50JztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi8uLi9nbG9iYWxzJyk7XG5pbXBvcnQgeyBTdWJzdHJQaXBlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3BpcGVzL3N1YnN0ci5waXBlJztcbmltcG9ydCB7IFN1Yl9TdWJzdHJQaXBlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3BpcGVzL3N1Yl9zdWJzdHIucGlwZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdsYW5kc2NhcGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnbGFuZHNjYXBlLmNvbXBvbmVudC5odG1sJyxcbiAgICAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTLCBQYWdpbmF0aW9uQ29tcG9uZW50LCBcbiAgICBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMsIENPUkVfRElSRUNUSVZFUywgR2FsbGFyeUNvbXBvbmVudCwgSW1hZ2VTaW5nbGVDb21wb25lbnRdXG59KVxuXG5leHBvcnQgY2xhc3MgTGFuZHNjYXBlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBjb250YWluZXI6IGFueTtcbiAgICBAT3V0cHV0KCkgcHJpdmF0ZSBvbkNvbnRhaW5lckRlbGV0ZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgIFxuICAgIG9uRGVsZXRlQ29udGFpbmVyKCl7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmRlbGV0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vbkNvbnRhaW5lckRlbGV0ZS5lbWl0KHRoaXMuY29udGFpbmVyLmlkKTtcbiAgICB9XG59XG4iXX0=
