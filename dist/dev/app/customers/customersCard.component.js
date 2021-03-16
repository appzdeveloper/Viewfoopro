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
var capitalize_pipe_1 = require('../shared/pipes/capitalize.pipe');
var trim_pipe_1 = require('../shared/pipes/trim.pipe');
var trackby_service_1 = require('../shared/services/trackby.service');
var CustomersCardComponent = (function () {
    function CustomersCardComponent(trackby) {
        this.trackby = trackby;
        this.customers = [];
    }
    CustomersCardComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], CustomersCardComponent.prototype, "customers", void 0);
    CustomersCardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'customers-card',
            templateUrl: 'customersCard.component.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            pipes: [capitalize_pipe_1.CapitalizePipe, trim_pipe_1.TrimPipe],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [trackby_service_1.TrackByService])
    ], CustomersCardComponent);
    return CustomersCardComponent;
}());
exports.CustomersCardComponent = CustomersCardComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jdXN0b21lcnMvY3VzdG9tZXJzQ2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFrRSxlQUFlLENBQUMsQ0FBQTtBQUNsRix1QkFBa0MsaUJBQWlCLENBQUMsQ0FBQTtBQUVwRCxnQ0FBK0IsaUNBQWlDLENBQUMsQ0FBQTtBQUNqRSwwQkFBeUIsMkJBQTJCLENBQUMsQ0FBQTtBQUVyRCxnQ0FBK0Isb0NBQW9DLENBQUMsQ0FBQTtBQWFwRTtJQUlFLGdDQUFtQixPQUF1QjtRQUF2QixZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUZqQyxjQUFTLEdBQWdCLEVBQUUsQ0FBQztJQUVTLENBQUM7SUFFL0MseUNBQVEsR0FBUjtJQUVBLENBQUM7SUFORDtRQUFDLFlBQUssRUFBRTs7NkRBQUE7SUFiVjtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLFVBQVUsRUFBRSxDQUFDLDBCQUFpQixDQUFDO1lBQy9CLEtBQUssRUFBRSxDQUFDLGdDQUFjLEVBQUUsb0JBQVEsQ0FBQztZQUlqQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDOzs4QkFBQTtJQVdGLDZCQUFDO0FBQUQsQ0FWQSxBQVVDLElBQUE7QUFWWSw4QkFBc0IseUJBVWxDLENBQUEiLCJmaWxlIjoiYXBwL2N1c3RvbWVycy9jdXN0b21lcnNDYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJPVVRFUl9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgQ2FwaXRhbGl6ZVBpcGUgfSBmcm9tICcuLi9zaGFyZWQvcGlwZXMvY2FwaXRhbGl6ZS5waXBlJztcbmltcG9ydCB7IFRyaW1QaXBlIH0gZnJvbSAnLi4vc2hhcmVkL3BpcGVzL3RyaW0ucGlwZSc7XG5pbXBvcnQgeyBJQ3VzdG9tZXIgfSBmcm9tICcuLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBUcmFja0J5U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy90cmFja2J5LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHsgXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnY3VzdG9tZXJzLWNhcmQnLCBcbiAgdGVtcGxhdGVVcmw6ICdjdXN0b21lcnNDYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXSxcbiAgcGlwZXM6IFtDYXBpdGFsaXplUGlwZSwgVHJpbVBpcGVdLFxuICAvL1doZW4gdXNpbmcgT25QdXNoIGRldGVjdG9ycywgdGhlbiB0aGUgZnJhbWV3b3JrIHdpbGwgY2hlY2sgYW4gT25QdXNoIFxuICAvL2NvbXBvbmVudCB3aGVuIGFueSBvZiBpdHMgaW5wdXQgcHJvcGVydGllcyBjaGFuZ2VzLCB3aGVuIGl0IGZpcmVzIFxuICAvL2FuIGV2ZW50LCBvciB3aGVuIGFuIG9ic2VydmFibGUgZmlyZXMgYW4gZXZlbnQgfiBWaWN0b3IgU2F2a2luIChBbmd1bGFyIFRlYW0pXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoIFxufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21lcnNDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBjdXN0b21lcnM6IElDdXN0b21lcltdID0gW107XG4gIFxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdHJhY2tieTogVHJhY2tCeVNlcnZpY2UpIHsgfVxuICBcbiAgbmdPbkluaXQoKSB7XG5cbiAgfVxuXG59XG5cbiJdfQ==
