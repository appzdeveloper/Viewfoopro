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
var forms_1 = require('@angular/forms');
var auth_service_1 = require('../../shared/services/auth.service');
var pagination_component_1 = require('../../shared/pagination/pagination.component');
var myGlobals = require('../../globals');
var MasonryViewComponent = (function () {
    function MasonryViewComponent(authService) {
        this.authService = authService;
        this.loginUser = myGlobals.LoginUser;
    }
    MasonryViewComponent.prototype.ngOnInit = function () {
    };
    MasonryViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'centermasonryview',
            templateUrl: 'masonry.component.html',
            directives: [pagination_component_1.PaginationComponent, forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService])
    ], MasonryViewComponent);
    return MasonryViewComponent;
}());
exports.MasonryViewComponent = MasonryViewComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2NlbnRlci1tYXNvbmFyeS12aWV3L21hc29ucnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxxQkFFSyxlQUFlLENBQUMsQ0FBQTtBQUNyQix1QkFBOEIsaUJBQWlCLENBQUMsQ0FBQTtBQUNoRCxzQkFBeUMsZ0JBQWdCLENBQUMsQ0FBQTtBQUcxRCw2QkFBNEIsb0NBQW9DLENBQUMsQ0FBQTtBQUdqRSxxQ0FBa0MsOENBQThDLENBQUMsQ0FBQTtBQUNqRixJQUFPLFNBQVMsV0FBVyxlQUFlLENBQUMsQ0FBQztBQVE1QztJQUVJLDhCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUV4QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFFekMsQ0FBQztJQUVELHVDQUFRLEdBQVI7SUFFQSxDQUFDO0lBaEJMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsVUFBVSxFQUFFLENBQUMsMENBQW1CLEVBQUUsZ0NBQXdCLEVBQUUsd0JBQWUsQ0FBQztTQUMvRSxDQUFDOzs0QkFBQTtJQWFGLDJCQUFDO0FBQUQsQ0FaQSxBQVlDLElBRkk7QUFWUSw0QkFBb0IsdUJBVTVCLENBQUEiLCJmaWxlIjoiYXBwL2hvbWUvY2VudGVyLW1hc29uYXJ5LXZpZXcvbWFzb25yeS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZH1cbmZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld2ZvbyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7UGFnaW5hdGlvbkNvbXBvbmVudH0gZnJvbSAnLi4vLi4vc2hhcmVkL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uLy4uL2dsb2JhbHMnKTtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2NlbnRlcm1hc29ucnl2aWV3JyxcbiAgICB0ZW1wbGF0ZVVybDogJ21hc29ucnkuY29tcG9uZW50Lmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtQYWdpbmF0aW9uQ29tcG9uZW50LCBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMsIENPUkVfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgTWFzb25yeVZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcbiAgICAgIFxuICAgICAgICB0aGlzLmxvZ2luVXNlciA9IG15R2xvYmFscy5Mb2dpblVzZXI7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgIH1cblxuIl19
