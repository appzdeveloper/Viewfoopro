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
var MasonryTemplateComponent = (function () {
    function MasonryTemplateComponent(_router) {
        this._router = _router;
    }
    MasonryTemplateComponent.prototype.ngOnInit = function () {
        $('.nav_bar').click(function () {
            $('.navigation').toggleClass('visible');
            $('body').toggleClass('opacity');
        });
    };
    MasonryTemplateComponent.prototype.selecttemplate = function () {
        this._router.navigate(['/select_template']);
    };
    MasonryTemplateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'masonry',
            templateUrl: 'masonry_template.component.html',
            directives: [router_1.ROUTER_DIRECTIVES],
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], MasonryTemplateComponent);
    return MasonryTemplateComponent;
}());
exports.MasonryTemplateComponent = MasonryTemplateComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC90ZW1wbGF0ZXMvdmlld2Zvb19wcm9fbWFzb25yeS9tYXNvbnJ5X3RlbXBsYXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBR0EscUJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBQ2hELHVCQUF3QyxpQkFBaUIsQ0FBQyxDQUFBO0FBVzFEO0lBQ08sa0NBQW9CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO0lBRXRDLENBQUM7SUFDRCwyQ0FBUSxHQUFSO1FBQ0csQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNYLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztJQUVYLENBQUM7SUFFRCxpREFBYyxHQUFkO1FBQ0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQXRCRDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLGlDQUFpQztZQUM3QyxVQUFVLEVBQUUsQ0FBQywwQkFBaUIsQ0FBQztTQUVuQyxDQUFDOztnQ0FBQTtJQWlCRiwrQkFBQztBQUFELENBZkEsQUFlQyxJQUFBO0FBZlksZ0NBQXdCLDJCQWVwQyxDQUFBIiwiZmlsZSI6ImFwcC90ZW1wbGF0ZXMvdmlld2Zvb19wcm9fbWFzb25yeS9tYXNvbnJ5X3RlbXBsYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5cbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFUywgUm91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdtYXNvbnJ5JyxcbiAgICB0ZW1wbGF0ZVVybDogJ21hc29ucnlfdGVtcGxhdGUuY29tcG9uZW50Lmh0bWwnXG4gICAgIGRpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU10sXG5cbn0pXG5cbmV4cG9ydCBjbGFzcyBNYXNvbnJ5VGVtcGxhdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyKSB7XG4gICAgICAgIFxuICAgIH1cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAkKCcubmF2X2JhcicpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCgnLm5hdmlnYXRpb24nKS50b2dnbGVDbGFzcygndmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnb3BhY2l0eScpO1xuICAgICAgICAgICAgfSk7XG4gIFxuICAgIH1cbiAgICBcbiAgICBzZWxlY3R0ZW1wbGF0ZSgpe1xuICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvc2VsZWN0X3RlbXBsYXRlJ10pO1xufVxufVxuXG5cbiJdfQ==
