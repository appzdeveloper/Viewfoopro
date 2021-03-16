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
var CarouselTemplateComponent = (function () {
    function CarouselTemplateComponent(_router) {
        this._router = _router;
    }
    CarouselTemplateComponent.prototype.ngOnInit = function () {
        $('.nav_bar').click(function () {
            $('.navigation').toggleClass('visible');
            $('body').toggleClass('opacity');
        });
    };
    CarouselTemplateComponent.prototype.selecttemplate = function () {
        this._router.navigate(['/select_template']);
    };
    CarouselTemplateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'carousel',
            templateUrl: 'carousel_template.component.html',
            directives: [router_1.ROUTER_DIRECTIVES],
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], CarouselTemplateComponent);
    return CarouselTemplateComponent;
}());
exports.CarouselTemplateComponent = CarouselTemplateComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC90ZW1wbGF0ZXMvdmlld2Zvb19wcm9fY2Fyb3VzZWwvY2Fyb3VzZWxfdGVtcGxhdGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQSxxQkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFDaEQsdUJBQXdDLGlCQUFpQixDQUFDLENBQUE7QUFXMUQ7SUFDTyxtQ0FBb0IsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7SUFFdEMsQ0FBQztJQUNELDRDQUFRLEdBQVI7UUFDRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBR1gsQ0FBQztJQUVELGtEQUFjLEdBQWQ7UUFDQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBdkJEO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsa0NBQWtDO1lBQzlDLFVBQVUsRUFBRSxDQUFDLDBCQUFpQixDQUFDO1NBRW5DLENBQUM7O2lDQUFBO0lBa0JGLGdDQUFDO0FBQUQsQ0FoQkEsQUFnQkMsSUFBQTtBQWhCWSxpQ0FBeUIsNEJBZ0JyQyxDQUFBIiwiZmlsZSI6ImFwcC90ZW1wbGF0ZXMvdmlld2Zvb19wcm9fY2Fyb3VzZWwvY2Fyb3VzZWxfdGVtcGxhdGUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cblxuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTLCBSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2Nhcm91c2VsJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2Nhcm91c2VsX3RlbXBsYXRlLmNvbXBvbmVudC5odG1sJ1xuICAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdLFxuXG59KVxuXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxUZW1wbGF0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIpIHtcbiAgICAgICAgXG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICQoJy5uYXZfYmFyJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKCcubmF2aWdhdGlvbicpLnRvZ2dsZUNsYXNzKCd2aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdvcGFjaXR5Jyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIHNlbGVjdHRlbXBsYXRlKCl7XG4gICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9zZWxlY3RfdGVtcGxhdGUnXSk7XG59XG59XG5cblxuIl19
