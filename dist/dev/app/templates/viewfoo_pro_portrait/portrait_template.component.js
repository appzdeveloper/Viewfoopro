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
var PortraitTemplateComponent = (function () {
    function PortraitTemplateComponent(_router) {
        this._router = _router;
    }
    PortraitTemplateComponent.prototype.ngOnInit = function () {
        $('.nav_bar').click(function () {
            $('.navigation').toggleClass('visible');
            $('body').toggleClass('opacity');
        });
    };
    PortraitTemplateComponent.prototype.selecttemplate = function () {
        this._router.navigate(['/select_template']);
    };
    PortraitTemplateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'portrait',
            templateUrl: 'portrait_template.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, pagination_component_1.PaginationComponent,
                forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, gallary_component_1.GallaryComponent, imagesingle_component_1.ImageSingleComponent]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], PortraitTemplateComponent);
    return PortraitTemplateComponent;
}());
exports.PortraitTemplateComponent = PortraitTemplateComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC90ZW1wbGF0ZXMvdmlld2Zvb19wcm9fcG9ydHJhaXQvcG9ydHJhaXRfdGVtcGxhdGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxxQkFBd0MsZUFBZSxDQUFDLENBQUE7QUFDeEQsdUJBQXdDLGlCQUFpQixDQUFDLENBQUE7QUFHMUQsdUJBQThCLGlCQUFpQixDQUFDLENBQUE7QUFDaEQsc0JBQXlDLGdCQUFnQixDQUFDLENBQUE7QUFFMUQsa0NBQWlDLDhCQUE4QixDQUFDLENBQUE7QUFDaEUsc0NBQXFDLHNDQUFzQyxDQUFDLENBQUE7QUFNNUUscUNBQWtDLDhDQUE4QyxDQUFDLENBQUE7QUFlakY7SUFDTyxtQ0FBb0IsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7SUFFdEMsQ0FBQztJQUNELDRDQUFRLEdBQVI7UUFDSSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ1osQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBRVgsQ0FBQztJQUVELGtEQUFjLEdBQWQ7UUFDQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBeEJEO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsa0NBQWtDO1lBQy9DLFVBQVUsRUFBRSxDQUFDLDBCQUFpQixFQUFFLDBDQUFtQjtnQkFDbkQsZ0NBQXdCLEVBQUUsd0JBQWUsRUFBRSxvQ0FBZ0IsRUFBRSw0Q0FBb0IsQ0FBQztTQUdyRixDQUFDOztpQ0FBQTtJQWlCRixnQ0FBQztBQUFELENBZkEsQUFlQyxJQUFBO0FBZlksaUNBQXlCLDRCQWVyQyxDQUFBIiwiZmlsZSI6ImFwcC90ZW1wbGF0ZXMvdmlld2Zvb19wcm9fcG9ydHJhaXQvcG9ydHJhaXRfdGVtcGxhdGUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFUywgUm91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBHYWxsYXJ5Q29tcG9uZW50IH0gZnJvbSAnLi4vZ2FsbGFyeS9nYWxsYXJ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbWFnZVNpbmdsZUNvbXBvbmVudCB9IGZyb20gJy4uL2ltYWdlc2luZ2xlL2ltYWdlc2luZ2xlLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld2ZvbyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7UGFnaW5hdGlvbkNvbXBvbmVudH0gZnJvbSAnLi4vLi4vc2hhcmVkL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uLy4uL2dsb2JhbHMnKTtcblxuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdwb3J0cmFpdCcsXG4gICAgdGVtcGxhdGVVcmw6ICdwb3J0cmFpdF90ZW1wbGF0ZS5jb21wb25lbnQuaHRtbCdcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVMsIFBhZ2luYXRpb25Db21wb25lbnQsIFxuICAgIFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUywgQ09SRV9ESVJFQ1RJVkVTLCBHYWxsYXJ5Q29tcG9uZW50LCBJbWFnZVNpbmdsZUNvbXBvbmVudF1cbiAgIFxuXG59KVxuXG5leHBvcnQgY2xhc3MgUG9ydHJhaXRUZW1wbGF0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIpIHtcbiAgICAgICAgXG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAkKCcubmF2X2JhcicpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCgnLm5hdmlnYXRpb24nKS50b2dnbGVDbGFzcygndmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnb3BhY2l0eScpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG4gICAgXG4gICAgc2VsZWN0dGVtcGxhdGUoKXtcbiAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnL3NlbGVjdF90ZW1wbGF0ZSddKTtcbn1cbn1cblxuXG4iXX0=
