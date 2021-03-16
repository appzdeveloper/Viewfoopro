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
var sortby_directive_1 = require('../shared/directives/sortby.directive');
var capitalize_pipe_1 = require('../shared/pipes/capitalize.pipe');
var trim_pipe_1 = require('../shared/pipes/trim.pipe');
var sorter_1 = require('../shared/utils/sorter');
var trackby_service_1 = require('../shared/services/trackby.service');
var CustomersGridComponent = (function () {
    function CustomersGridComponent(sorter, trackby) {
        this.sorter = sorter;
        this.trackby = trackby;
        this.customers = [];
    }
    CustomersGridComponent.prototype.ngOnInit = function () {
    };
    CustomersGridComponent.prototype.sort = function (prop) {
        this.sorter.sort(this.customers, prop);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], CustomersGridComponent.prototype, "customers", void 0);
    CustomersGridComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'customers-grid',
            templateUrl: 'customersGrid.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, sortby_directive_1.SortByDirective],
            pipes: [capitalize_pipe_1.CapitalizePipe, trim_pipe_1.TrimPipe],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [sorter_1.Sorter, trackby_service_1.TrackByService])
    ], CustomersGridComponent);
    return CustomersGridComponent;
}());
exports.CustomersGridComponent = CustomersGridComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jdXN0b21lcnMvY3VzdG9tZXJzR3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFrRSxlQUFlLENBQUMsQ0FBQTtBQUNsRix1QkFBa0MsaUJBQWlCLENBQUMsQ0FBQTtBQUVwRCxpQ0FBZ0MsdUNBQXVDLENBQUMsQ0FBQTtBQUN4RSxnQ0FBK0IsaUNBQWlDLENBQUMsQ0FBQTtBQUNqRSwwQkFBeUIsMkJBQTJCLENBQUMsQ0FBQTtBQUNyRCx1QkFBdUIsd0JBQXdCLENBQUMsQ0FBQTtBQUNoRCxnQ0FBK0Isb0NBQW9DLENBQUMsQ0FBQTtBQWFwRTtJQUlFLGdDQUFvQixNQUFjLEVBQVMsT0FBdUI7UUFBOUMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBRnpELGNBQVMsR0FBVSxFQUFFLENBQUM7SUFFdUMsQ0FBQztJQUV2RSx5Q0FBUSxHQUFSO0lBRUEsQ0FBQztJQUVELHFDQUFJLEdBQUosVUFBSyxJQUFZO1FBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBVkQ7UUFBQyxZQUFLLEVBQUU7OzZEQUFBO0lBYlY7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxVQUFVLEVBQUUsQ0FBQywwQkFBaUIsRUFBRSxrQ0FBZSxDQUFDO1lBQ2hELEtBQUssRUFBRSxDQUFDLGdDQUFjLEVBQUUsb0JBQVEsQ0FBQztZQUlqQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDOzs4QkFBQTtJQWVGLDZCQUFDO0FBQUQsQ0FkQSxBQWNDLElBQUE7QUFkWSw4QkFBc0IseUJBY2xDLENBQUEiLCJmaWxlIjoiYXBwL2N1c3RvbWVycy9jdXN0b21lcnNHcmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJPVVRFUl9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgU29ydEJ5RGlyZWN0aXZlIH0gZnJvbSAnLi4vc2hhcmVkL2RpcmVjdGl2ZXMvc29ydGJ5LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDYXBpdGFsaXplUGlwZSB9IGZyb20gJy4uL3NoYXJlZC9waXBlcy9jYXBpdGFsaXplLnBpcGUnO1xuaW1wb3J0IHsgVHJpbVBpcGUgfSBmcm9tICcuLi9zaGFyZWQvcGlwZXMvdHJpbS5waXBlJztcbmltcG9ydCB7IFNvcnRlciB9IGZyb20gJy4uL3NoYXJlZC91dGlscy9zb3J0ZXInO1xuaW1wb3J0IHsgVHJhY2tCeVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvdHJhY2tieS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7IFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2N1c3RvbWVycy1ncmlkJywgXG4gIHRlbXBsYXRlVXJsOiAnY3VzdG9tZXJzR3JpZC5jb21wb25lbnQuaHRtbCcsXG4gIGRpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFUywgU29ydEJ5RGlyZWN0aXZlXSxcbiAgcGlwZXM6IFtDYXBpdGFsaXplUGlwZSwgVHJpbVBpcGVdLFxuICAvL1doZW4gdXNpbmcgT25QdXNoIGRldGVjdG9ycywgdGhlbiB0aGUgZnJhbWV3b3JrIHdpbGwgY2hlY2sgYW4gT25QdXNoIFxuICAvL2NvbXBvbmVudCB3aGVuIGFueSBvZiBpdHMgaW5wdXQgcHJvcGVydGllcyBjaGFuZ2VzLCB3aGVuIGl0IGZpcmVzIFxuICAvL2FuIGV2ZW50LCBvciB3aGVuIGFuIG9ic2VydmFibGUgZmlyZXMgYW4gZXZlbnQgfiBWaWN0b3IgU2F2a2luIChBbmd1bGFyIFRlYW0pXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoIFxufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21lcnNHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBjdXN0b21lcnM6IGFueVtdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzb3J0ZXI6IFNvcnRlciwgcHVibGljIHRyYWNrYnk6IFRyYWNrQnlTZXJ2aWNlKSB7IH1cbiAgIFxuICBuZ09uSW5pdCgpIHtcblxuICB9XG5cbiAgc29ydChwcm9wOiBzdHJpbmcpIHtcbiAgICAgIHRoaXMuc29ydGVyLnNvcnQodGhpcy5jdXN0b21lcnMsIHByb3ApO1xuICB9XG5cbn1cbiJdfQ==
