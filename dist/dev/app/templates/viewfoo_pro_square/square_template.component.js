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
var SquareTemplateComponent = (function () {
    function SquareTemplateComponent(_router) {
        this._router = _router;
    }
    SquareTemplateComponent.prototype.ngOnInit = function () {
        $('.nav_bar').click(function () {
            $('.navigation').toggleClass('visible');
            $('body').toggleClass('opacity');
        });
    };
    SquareTemplateComponent.prototype.selecttemplate = function () {
        this._router.navigate(['/select_template']);
    };
    SquareTemplateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'square',
            templateUrl: 'square_template.component.html',
            directives: [router_1.ROUTER_DIRECTIVES],
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], SquareTemplateComponent);
    return SquareTemplateComponent;
}());
exports.SquareTemplateComponent = SquareTemplateComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC90ZW1wbGF0ZXMvdmlld2Zvb19wcm9fc3F1YXJlL3NxdWFyZV90ZW1wbGF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdBLHFCQUFnQyxlQUFlLENBQUMsQ0FBQTtBQUNoRCx1QkFBd0MsaUJBQWlCLENBQUMsQ0FBQTtBQVcxRDtJQUNPLGlDQUFvQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtJQUV0QyxDQUFDO0lBQ0QsMENBQVEsR0FBUjtRQUNVLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDbEIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBRVgsQ0FBQztJQUNELGdEQUFjLEdBQWQ7UUFDQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBckJEO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzVDLFVBQVUsRUFBRSxDQUFDLDBCQUFpQixDQUFDO1NBRW5DLENBQUM7OytCQUFBO0lBZ0JGLDhCQUFDO0FBQUQsQ0FkQSxBQWNDLElBQUE7QUFkWSwrQkFBdUIsMEJBY25DLENBQUEiLCJmaWxlIjoiYXBwL3RlbXBsYXRlcy92aWV3Zm9vX3Byb19zcXVhcmUvc3F1YXJlX3RlbXBsYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5cbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFUywgUm91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdzcXVhcmUnLFxuICAgIHRlbXBsYXRlVXJsOiAnc3F1YXJlX3RlbXBsYXRlLmNvbXBvbmVudC5odG1sJ1xuICAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdLFxuXG59KVxuXG5leHBvcnQgY2xhc3MgU3F1YXJlVGVtcGxhdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyKSB7XG4gICAgICAgIFxuICAgIH1cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgICAgICAgJCgnLm5hdl9iYXInKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQoJy5uYXZpZ2F0aW9uJykudG9nZ2xlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgICAgICAgICAgICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ29wYWNpdHknKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgXG4gICAgfVxuICAgIHNlbGVjdHRlbXBsYXRlKCl7XG4gICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9zZWxlY3RfdGVtcGxhdGUnXSk7XG59XG59XG5cblxuIl19
