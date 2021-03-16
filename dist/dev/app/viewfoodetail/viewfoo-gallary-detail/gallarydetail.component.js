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
var auth_service_1 = require('../../shared/services/auth.service');
var pagination_component_1 = require('../../shared/pagination/pagination.component');
var myGlobals = require('../../globals');
var GallaryDetailComponent = (function () {
    function GallaryDetailComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.serviceUrl = myGlobals.serviceUrl;
        this.loginUser = myGlobals.LoginUser;
    }
    GallaryDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        var container = this.container;
        console.log(this.viewfooid);
        this.sub = this.route.params.subscribe(function (params) {
            _this.viewfooid = params['id'];
            _this.loginUser = myGlobals.LoginUser;
            _this.authService.viewfooDetail(_this.viewfooid)
                .subscribe(function (result) {
            }, function (error) {
                _this.errorMsg = error;
                _this.loading = false;
            });
        });
    };
    __decorate([
        core_1.ViewChild('imgblock'), 
        __metadata('design:type', core_1.ElementRef)
    ], GallaryDetailComponent.prototype, "imgblock", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GallaryDetailComponent.prototype, "container", void 0);
    GallaryDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gallarysingledetail',
            templateUrl: 'gallarydetail.component.html',
            directives: [pagination_component_1.PaginationComponent, forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], GallaryDetailComponent);
    return GallaryDetailComponent;
}());
exports.GallaryDetailComponent = GallaryDetailComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC92aWV3Zm9vZGV0YWlsL3ZpZXdmb28tZ2FsbGFyeS1kZXRhaWwvZ2FsbGFyeWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHFCQUVLLGVBQWUsQ0FBQyxDQUFBO0FBQ3JCLHVCQUF3QyxpQkFBaUIsQ0FBQyxDQUFBO0FBRzFELHVCQUE4QixpQkFBaUIsQ0FBQyxDQUFBO0FBQ2hELHNCQUF5QyxnQkFBZ0IsQ0FBQyxDQUFBO0FBRTFELDZCQUE0QixvQ0FBb0MsQ0FBQyxDQUFBO0FBR2pFLHFDQUFrQyw4Q0FBOEMsQ0FBQyxDQUFBO0FBQ2pGLElBQU8sU0FBUyxXQUFXLGVBQWUsQ0FBQyxDQUFDO0FBUTVDO0lBVUksZ0NBQW9CLFdBQXdCLEVBQVMsTUFBYztRQUEvQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7UUFIbkUsZUFBVSxHQUFXLFNBQVMsQ0FBQyxVQUFVLENBQUM7UUFJdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQ3pDLENBQUM7SUFFRCx5Q0FBUSxHQUFSO1FBQUEsaUJBMkJDO1FBekJHLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTVCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUd6QyxLQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUU5QixLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7WUFJakMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQztpQkFDekMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUVsQixDQUFDLEVBQUUsVUFBQyxLQUFVO2dCQUNWLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUV6QixDQUFDLENBQUMsQ0FBQTtRQUdkLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQXZDRDtRQUFDLGdCQUFTLENBQUMsVUFBVSxDQUFDOzs0REFBQTtJQUN0QjtRQUFDLFlBQUssRUFBRTs7NkRBQUE7SUFUWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLFVBQVUsRUFBRSxDQUFDLDBDQUFtQixFQUFFLGdDQUF3QixFQUFFLHdCQUFlLENBQUM7U0FDL0UsQ0FBQzs7OEJBQUE7SUE2Q0YsNkJBQUM7QUFBRCxDQTVDQSxBQTRDQyxJQUFBO0FBNUNZLDhCQUFzQix5QkE0Q2xDLENBQUEiLCJmaWxlIjoiYXBwL3ZpZXdmb29kZXRhaWwvdmlld2Zvby1nYWxsYXJ5LWRldGFpbC9nYWxsYXJ5ZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgTmdab25lLCBJbnB1dCwgT3V0cHV0LCBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlLCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0NoaWxkfVxuZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTLCBSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdmb28gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQge1BhZ2luYXRpb25Db21wb25lbnR9IGZyb20gJy4uLy4uL3NoYXJlZC9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50JztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi8uLi9nbG9iYWxzJyk7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdnYWxsYXJ5c2luZ2xlZGV0YWlsJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2dhbGxhcnlkZXRhaWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtQYWdpbmF0aW9uQ29tcG9uZW50LCBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMsIENPUkVfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgR2FsbGFyeURldGFpbENvbXBvbmVudCAge1xuICAgIHB1YmxpYyBjb250YWluZXJ0eXBlOiBzdHJpbmc7XG4gICAgQFZpZXdDaGlsZCgnaW1nYmxvY2snKSBpbWdibG9jazogRWxlbWVudFJlZjtcbiAgICBASW5wdXQoKSBwdWJsaWMgY29udGFpbmVyOiBhbnk7XG4gICAgbG9naW5Vc2VyOiBVc2VyO1xuICAgIHZpZXdmb29pZDogc3RyaW5nO1xuICAgIGNvbnRhaW5lcmlkOiBzdHJpbmc7XG4gICAgc2VydmljZVVybDogc3RyaW5nID0gbXlHbG9iYWxzLnNlcnZpY2VVcmw7XG4gICAgaXRlbTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UscHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgICAgICB0aGlzLmxvZ2luVXNlciA9IG15R2xvYmFscy5Mb2dpblVzZXI7XG4gICAgfVxuICAgIFxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudmlld2Zvb2lkKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc3ViID0gdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiR2FsbGFyeVRlbXBsYXRlQ29tcG9uZW50ID4gY29uc3RydWN0b3IgXCIpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhwYXJhbXMpO1xuICAgICAgICAgICAgdGhpcy52aWV3Zm9vaWQgPSBwYXJhbXNbJ2lkJ107IC8vICgrKSBjb252ZXJ0cyBzdHJpbmcgJ2lkJyB0byBhIG51bWJlclxuXG4gICAgICAgICAgICB0aGlzLmxvZ2luVXNlciA9IG15R2xvYmFscy5Mb2dpblVzZXI7XG5cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiV2UgaGF2ZSB2aWV3Zm9vIGlkXCIpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoU2VydmljZS52aWV3Zm9vRGV0YWlsKHRoaXMudmlld2Zvb2lkKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidmlld2ZvbyBjcmVhdGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgIFxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImN1cnJlbnQgdmlld2ZvbyBhbGxvdyBzaGFyaW5nIGlzOlwiICsgdGhpcy5jdXJyZW50Vmlld2Zvby5hbGxvd3NoYXJpbmcpO1xuICAgICAgICB9KTtcbiAgICAgICBcbiAgICB9XG4gICAgXG4gICAgXG59XG4iXX0=
