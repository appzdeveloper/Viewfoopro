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
var topnav_component_1 = require('../topnav/topnav.component');
var myGlobals = require('../globals');
var DashboardComponent = (function () {
    function DashboardComponent(router) {
        this.router = router;
        this.istrial = false;
        this.loginUser = JSON.parse(window.localStorage['user'] || '{}');
        if (!this.loginUser.id) {
            this.router.navigate(['/login']);
        }
        else {
            this.istrial = false;
            myGlobals.LoginUser = this.loginUser;
        }
    }
    DashboardComponent.prototype.ngOnInit = function () {
        myGlobals.LoginUser = this.loginUser;
        var today = new Date();
        var subscribeenddate = new Date(this.loginUser.subscriptionenddate);
        if (subscribeenddate < today) {
            this.day = 0;
            myGlobals.LoginUser = this.loginUser;
            this.istrial = true;
            this.router.navigate(['/trialbilling']);
        }
        else {
            this.istrial = false;
            myGlobals.LoginUser = this.loginUser;
            var diff = (subscribeenddate) - (today);
            this.day = Math.round(diff / 86400000);
        }
    };
    DashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dashboard',
            templateUrl: 'dashboard.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, topnav_component_1.TopNavComponent]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQW1ELGVBQWUsQ0FBQyxDQUFBO0FBRW5FLHVCQUEwQyxpQkFBaUIsQ0FBQyxDQUFBO0FBRTVELGlDQUE4Qiw0QkFBNEIsQ0FBQyxDQUFBO0FBRTNELElBQU8sU0FBUyxXQUFXLFlBQVksQ0FBQyxDQUFDO0FBU3pDO0lBSUksNEJBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRGxDLFlBQU8sR0FBUyxLQUFLLENBQUM7UUFFbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFDakUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLFNBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN6QyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFDTSxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDdkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLGdCQUFnQixHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVwRSxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ2IsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBRXBCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDckMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQztRQUMzQyxDQUFDO0lBRUwsQ0FBQztJQXpDTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLDBCQUEwQjtZQUV2QyxVQUFVLEVBQUUsQ0FBQywwQkFBaUIsRUFBRSxrQ0FBZSxDQUFDO1NBQ25ELENBQUM7OzBCQUFBO0lBb0NGLHlCQUFDO0FBQUQsQ0FuQ0EsQUFtQ0MsSUFBQTtBQW5DWSwwQkFBa0IscUJBbUM5QixDQUFBIiwiZmlsZSI6ImFwcC9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUk9VVEVSX0RJUkVDVElWRVMsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7VG9wTmF2Q29tcG9uZW50fSBmcm9tICcuLi90b3BuYXYvdG9wbmF2LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vZ2xvYmFscycpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnZGFzaGJvYXJkJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2Rhc2hib2FyZC5jb21wb25lbnQuaHRtbCcsXG4gICAgLy9lbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGRpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFUywgVG9wTmF2Q29tcG9uZW50XSAvL1xufSlcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgbG9naW5Vc2VyOiBVc2VyO1xuICAgIGlzdHJpYWw6Ym9vbGVhbj1mYWxzZTtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgICAgIHRoaXMubG9naW5Vc2VyID0gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlWyd1c2VyJ10gfHwgJ3t9Jyk7XG4gICAgICAgIGlmICghdGhpcy5sb2dpblVzZXIuaWQpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc3RyaWFsID0gZmFsc2U7XG4gICAgICAgICAgICBteUdsb2JhbHMuTG9naW5Vc2VyID0gdGhpcy5sb2dpblVzZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgICBteUdsb2JhbHMuTG9naW5Vc2VyID0gdGhpcy5sb2dpblVzZXI7XG4gICAgICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCBzdWJzY3JpYmVlbmRkYXRlID0gbmV3IERhdGUodGhpcy5sb2dpblVzZXIuc3Vic2NyaXB0aW9uZW5kZGF0ZSk7XG4gICAgICBcbiAgICAgICAgaWYgKHN1YnNjcmliZWVuZGRhdGUgPCB0b2RheSkge1xuICAgICAgICAgICAgdGhpcy5kYXkgPSAwO1xuICAgICAgICAgICAgbXlHbG9iYWxzLkxvZ2luVXNlciA9IHRoaXMubG9naW5Vc2VyO1xuICAgICAgICAgICAgdGhpcy5pc3RyaWFsID0gdHJ1ZTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy90cmlhbGJpbGxpbmcnXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzdHJpYWwgPSBmYWxzZTtcbiAgICAgICAgICAgIG15R2xvYmFscy5Mb2dpblVzZXIgPSB0aGlzLmxvZ2luVXNlcjtcbiAgICAgICAgICAgIGxldCBkaWZmID0gKHN1YnNjcmliZWVuZGRhdGUpIC0gKHRvZGF5KTtcbiAgICAgICAgICAgIHRoaXMuZGF5ID0gTWF0aC5yb3VuZChkaWZmIC8gODY0MDAwMDApO1xuICAgICAgICB9XG5cbiAgICB9XG59XG4iXX0=
