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
var auth_service_1 = require('../shared/services/auth.service');
var myGlobals = require('../globals');
var SelectTemplateComponent = (function () {
    function SelectTemplateComponent(_router, authService) {
        this._router = _router;
        this.authService = authService;
        this.loginUser = myGlobals.LoginUser;
    }
    SelectTemplateComponent.prototype.ngOnInit = function () {
    };
    SelectTemplateComponent.prototype.fullscreen = function () {
        this.containertype = "image";
        this.createViewfoo();
    };
    SelectTemplateComponent.prototype.gallary = function () {
        this.containertype = "gallery";
        this.createViewfoo();
    };
    SelectTemplateComponent.prototype.landscape = function () {
        this.containertype = "landscape";
        this.createViewfoo();
    };
    SelectTemplateComponent.prototype.carousel = function () {
        this.containertype = "carousel";
        this.createViewfoo();
    };
    SelectTemplateComponent.prototype.portrait = function () {
        this.containertype = "portrait1";
        this.createViewfoo();
    };
    SelectTemplateComponent.prototype.portrait2 = function () {
        this.containertype = "portrait2";
        this.createViewfoo();
    };
    SelectTemplateComponent.prototype.masonry = function () {
        this.containertype = "massonary";
        this.createViewfoo();
    };
    SelectTemplateComponent.prototype.square = function () {
        this.containertype = "square1";
        this.createViewfoo();
    };
    SelectTemplateComponent.prototype.square2 = function () {
        this.containertype = "square2";
        this.createViewfoo();
    };
    SelectTemplateComponent.prototype.createViewfoo = function () {
        var _this = this;
        this.authService.viewfoocreate(this.containertype, this.loginUser.id)
            .subscribe(function (result) {
            _this._router.navigate(['/gallary/' + result.data.id]);
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
        });
    };
    SelectTemplateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'emailnotification',
            templateUrl: 'select_template.component.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService])
    ], SelectTemplateComponent);
    return SelectTemplateComponent;
}());
exports.SelectTemplateComponent = SelectTemplateComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zZWxlY3RfdGVtcGxhdGUvc2VsZWN0X3RlbXBsYXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBQ2hELHVCQUF3QyxpQkFBaUIsQ0FBQyxDQUFBO0FBRTFELDZCQUE0QixpQ0FBaUMsQ0FBQyxDQUFBO0FBQzlELElBQU8sU0FBUyxXQUFXLFlBQVksQ0FBQyxDQUFDO0FBVXpDO0lBRUksaUNBQW9CLE9BQWUsRUFBVSxXQUF3QjtRQUFqRCxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDakUsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQ3pDLENBQUM7SUFDRCwwQ0FBUSxHQUFSO0lBR0EsQ0FBQztJQUVELDRDQUFVLEdBQVY7UUFFSSxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztRQUM3QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNELHlDQUFPLEdBQVA7UUFFSSxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELDJDQUFTLEdBQVQ7UUFFSSxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNELDBDQUFRLEdBQVI7UUFFSSxJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztRQUNoQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNELDBDQUFRLEdBQVI7UUFFSSxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNELDJDQUFTLEdBQVQ7UUFFSSxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNELHlDQUFPLEdBQVA7UUFFSSxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFFekIsQ0FBQztJQUNELHdDQUFNLEdBQU47UUFFSSxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNELHlDQUFPLEdBQVA7UUFFSSxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELCtDQUFhLEdBQWI7UUFBQSxpQkFTQztRQVJHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7YUFDaEUsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNkLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxRCxDQUFDLEVBQUUsVUFBQyxLQUFVO1lBQ1YsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFFekIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBM0VMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsVUFBVSxFQUFFLENBQUMsMEJBQWlCLENBQUM7U0FFbEMsQ0FBQzs7K0JBQUE7SUFzRUYsOEJBQUM7QUFBRCxDQXBFQSxBQW9FQyxJQUFBO0FBcEVZLCtCQUF1QiwwQkFvRW5DLENBQUEiLCJmaWxlIjoiYXBwL3NlbGVjdF90ZW1wbGF0ZS9zZWxlY3RfdGVtcGxhdGUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTLCBSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vZ2xvYmFscycpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnZW1haWxub3RpZmljYXRpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnc2VsZWN0X3RlbXBsYXRlLmNvbXBvbmVudC5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdXG5cbn0pXG5cbmV4cG9ydCBjbGFzcyBTZWxlY3RUZW1wbGF0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5sb2dpblVzZXIgPSBteUdsb2JhbHMuTG9naW5Vc2VyO1xuICAgIH1cbiAgICBuZ09uSW5pdCgpIHtcblxuXG4gICAgfVxuXG4gICAgZnVsbHNjcmVlbigpIHtcbiAgICAgICAgLy90aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvZnVsbHNjcmVlbl90ZW1wbGF0ZSddKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJ0eXBlID0gXCJpbWFnZVwiO1xuICAgICAgICB0aGlzLmNyZWF0ZVZpZXdmb28oKTtcbiAgICB9XG4gICAgZ2FsbGFyeSgpIHtcbiAgICAgICAgLy90aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvZ2FsbGFyeSddKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJ0eXBlID0gXCJnYWxsZXJ5XCI7XG4gICAgICAgIHRoaXMuY3JlYXRlVmlld2ZvbygpO1xuICAgIH1cblxuICAgIGxhbmRzY2FwZSgpIHtcbi8vICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvbGFuZHNjYXBlJ10pO1xuICAgICAgICB0aGlzLmNvbnRhaW5lcnR5cGUgPSBcImxhbmRzY2FwZVwiO1xuICAgICAgICB0aGlzLmNyZWF0ZVZpZXdmb28oKTtcbiAgICB9XG4gICAgY2Fyb3VzZWwoKSB7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXJ0eXBlID0gXCJjYXJvdXNlbFwiO1xuICAgICAgICB0aGlzLmNyZWF0ZVZpZXdmb28oKTtcbiAgICB9XG4gICAgcG9ydHJhaXQoKSB7XG4vLyAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnL3BvcnRyYWl0J10pO1xuICAgICAgICB0aGlzLmNvbnRhaW5lcnR5cGUgPSBcInBvcnRyYWl0MVwiO1xuICAgICAgICB0aGlzLmNyZWF0ZVZpZXdmb28oKTtcbiAgICB9XG4gICAgcG9ydHJhaXQyKCkge1xuLy8gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9wb3J0cmFpdDInXSk7XG4gICAgICAgIHRoaXMuY29udGFpbmVydHlwZSA9IFwicG9ydHJhaXQyXCI7XG4gICAgICAgIHRoaXMuY3JlYXRlVmlld2ZvbygpO1xuICAgIH1cbiAgICBtYXNvbnJ5KCkge1xuLy8gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9tYXNvbnJ5J10pO1xuICAgICAgICB0aGlzLmNvbnRhaW5lcnR5cGUgPSBcIm1hc3NvbmFyeVwiO1xuICAgICAgICB0aGlzLmNyZWF0ZVZpZXdmb28oKTtcblxuICAgIH1cbiAgICBzcXVhcmUoKSB7XG4vLyAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnL3NxdWFyZSddKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJ0eXBlID0gXCJzcXVhcmUxXCI7XG4gICAgICAgIHRoaXMuY3JlYXRlVmlld2ZvbygpO1xuICAgIH1cbiAgICBzcXVhcmUyKCkge1xuLy8gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9zcXVhcmUyJ10pO1xuICAgICAgICB0aGlzLmNvbnRhaW5lcnR5cGUgPSBcInNxdWFyZTJcIjtcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3Zm9vKCk7XG4gICAgfVxuXG4gICAgY3JlYXRlVmlld2ZvbygpIHtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS52aWV3Zm9vY3JlYXRlKHRoaXMuY29udGFpbmVydHlwZSwgdGhpcy5sb2dpblVzZXIuaWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvZ2FsbGFyeS8nICsgcmVzdWx0LmRhdGEuaWRdKTtcbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ2aWV3Zm9vIGNyZWF0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==
