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
var Portrait2TemplateComponent = (function () {
    function Portrait2TemplateComponent(_router) {
        this._router = _router;
    }
    Portrait2TemplateComponent.prototype.ngOnInit = function () {
        $('.nav_bar').click(function () {
            $('.navigation').toggleClass('visible');
            $('body').toggleClass('opacity');
        });
    };
    Portrait2TemplateComponent.prototype.selecttemplate = function () {
        this._router.navigate(['/select_template']);
    };
    Portrait2TemplateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'portrait2',
            templateUrl: 'portrait2_template.component.html',
            directives: [router_1.ROUTER_DIRECTIVES],
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], Portrait2TemplateComponent);
    return Portrait2TemplateComponent;
}());
exports.Portrait2TemplateComponent = Portrait2TemplateComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC90ZW1wbGF0ZXMvdmlld2Zvb19wcm9fcG9ydHJhaXQyL3BvcnRyYWl0Ml90ZW1wbGF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdBLHFCQUFnQyxlQUFlLENBQUMsQ0FBQTtBQUNoRCx1QkFBd0MsaUJBQWlCLENBQUMsQ0FBQTtBQVcxRDtJQUNPLG9DQUFvQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtJQUV0QyxDQUFDO0lBQ0QsNkNBQVEsR0FBUjtRQUNXLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDbkIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBRVgsQ0FBQztJQUNELG1EQUFjLEdBQWQ7UUFDQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBckJEO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUsbUNBQW1DO1lBQy9DLFVBQVUsRUFBRSxDQUFDLDBCQUFpQixDQUFDO1NBRW5DLENBQUM7O2tDQUFBO0lBZ0JGLGlDQUFDO0FBQUQsQ0FkQSxBQWNDLElBQUE7QUFkWSxrQ0FBMEIsNkJBY3RDLENBQUEiLCJmaWxlIjoiYXBwL3RlbXBsYXRlcy92aWV3Zm9vX3Byb19wb3J0cmFpdDIvcG9ydHJhaXQyX3RlbXBsYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5cbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFUywgUm91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdwb3J0cmFpdDInLFxuICAgIHRlbXBsYXRlVXJsOiAncG9ydHJhaXQyX3RlbXBsYXRlLmNvbXBvbmVudC5odG1sJ1xuICAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdLFxuXG59KVxuXG5leHBvcnQgY2xhc3MgUG9ydHJhaXQyVGVtcGxhdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyKSB7XG4gICAgICAgIFxuICAgIH1cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgICAgICAgICQoJy5uYXZfYmFyJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKCcubmF2aWdhdGlvbicpLnRvZ2dsZUNsYXNzKCd2aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdvcGFjaXR5Jyk7XG4gICAgICAgICAgICB9KTtcblxuICAgIH1cbiAgICBzZWxlY3R0ZW1wbGF0ZSgpe1xuICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvc2VsZWN0X3RlbXBsYXRlJ10pO1xufVxufVxuXG4iXX0=
