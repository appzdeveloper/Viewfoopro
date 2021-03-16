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
var app_providers_1 = require('./app.providers');
var myGlobals = require('./globals');
var AppComponent = (function () {
    function AppComponent(router) {
        this.router = router;
        this.heroImageUrl = 'images/hero.png';
        this.loginUser = JSON.parse(window.localStorage['user'] || '{}');
        if (!this.loginUser.id) {
        }
        else {
            myGlobals.LoginUser = this.loginUser;
        }
    }
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-container',
            template: "<router-outlet></router-outlet>",
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [app_providers_1.APP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMEIsZUFBZSxDQUFDLENBQUE7QUFDMUMsdUJBQTBDLGlCQUFpQixDQUFDLENBQUE7QUFFNUQsOEJBQThCLGlCQUFpQixDQUFDLENBQUE7QUFFaEQsSUFBTyxTQUFTLFdBQVcsV0FBVyxDQUFDLENBQUM7QUFVeEM7SUFLSSxzQkFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFGbEMsaUJBQVksR0FBRyxpQkFBaUIsQ0FBQztRQUk3QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUNqRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUd6QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDekMsQ0FBQztJQUNMLENBQUM7SUFyQkw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSxpQ0FBaUM7WUFDM0MsVUFBVSxFQUFFLENBQUMsMEJBQWlCLENBQUM7WUFDL0IsU0FBUyxFQUFFLENBQUMsNkJBQWEsQ0FBQztTQUM3QixDQUFDOztvQkFBQTtJQWtCRixtQkFBQztBQUFELENBakJBLEFBaUJDLElBQUE7QUFqQlksb0JBQVksZUFpQnhCLENBQUEiLCJmaWxlIjoiYXBwL2FwcC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJPVVRFUl9ESVJFQ1RJVkVTLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBBUFBfUFJPVklERVJTIH0gZnJvbSAnLi9hcHAucHJvdmlkZXJzJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuL2dsb2JhbHMnKTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnYXBwLWNvbnRhaW5lcicsXG4gICAgdGVtcGxhdGU6IGA8cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+YCxcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdLFxuICAgIHByb3ZpZGVyczogW0FQUF9QUk9WSURFUlNdXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG5cbiAgICBsb2dpblVzZXI6IFVzZXI7XG4gICAgaGVyb0ltYWdlVXJsID0gJ2ltYWdlcy9oZXJvLnBuZyc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG5cbiAgICAgICAgdGhpcy5sb2dpblVzZXIgPSBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ3VzZXInXSB8fCAne30nKTtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2luVXNlci5pZCkge1xuICAgICAgICAgICAgLy90aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ2xvZ2luJ10pO1xuICAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBteUdsb2JhbHMuTG9naW5Vc2VyID0gdGhpcy5sb2dpblVzZXI7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuXG5cbi8vRHluYW1pYyBsb2FkaW5nIChvbGQgcm91dGVyIGJ1dCBjb21pbmcgdG8gbmV3IHJvdXRlcilcbi8vIHsgXG4vLyAgIHBhdGg6ICcvY3VzdG9tZXJzLzppZC8uLi4nLCBcbi8vICAgbmFtZTogJ0N1c3RvbWVyJywgIFxuLy8gICBsb2FkZXI6ICgpID0+IHdpbmRvd1snU3lzdGVtJ10uaW1wb3J0KCdhcHAvK2N1c3RvbWVyJylcbi8vICAgICAgICAgICAgICAgICAudGhlbigobW9kdWxlOiBhbnkpID0+IG1vZHVsZS5DdXN0b21lckNvbXBvbmVudCkgXG4vLyB9XG4iXX0=
