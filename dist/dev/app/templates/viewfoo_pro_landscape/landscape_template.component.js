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
var LandscapeTemplateComponent = (function () {
    function LandscapeTemplateComponent(_router) {
        this._router = _router;
    }
    LandscapeTemplateComponent.prototype.ngOnInit = function () {
        $('.nav_bar').click(function () {
            $('.navigation').toggleClass('visible');
            $('body').toggleClass('opacity');
        });
    };
    LandscapeTemplateComponent.prototype.containerCreate = function (containertype) {
        var _this = this;
        console.log("landscape_template containerCreate " + containertype);
        var self = this;
        this.authService.containerCreate(containertype, this.currentViewfoo.id, this.loginUser.id)
            .subscribe(function (result) {
            console.log("landscape Container Created");
            console.log(result);
            var container = result.data;
            container.containerimages = [];
            self.currentViewfoo.containers.push(container);
            $("html, body").animate({ scrollTop: $(document).height() }, 1000);
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("container create fail: " + error);
        });
    };
    LandscapeTemplateComponent.prototype.deletecontainer = function (containerid, index) {
        var _this = this;
        console.log("deletecontainer : " + containerid + "  index : " + index);
        var self = this;
        var currContainer = self.currentViewfoo.containers[index];
        this.authService.containerDelete(containerid)
            .subscribe(function (result) {
            console.log(result);
            currContainer.deleted = true;
            setTimeout(function () {
                self.currentViewfoo.containers.splice(index, 1);
            }, 1000);
        }, function (error) {
            _this.errorMsg = error;
            console.log("Containerimage delete fail: " + error);
        });
    };
    LandscapeTemplateComponent.prototype.selecttemplate = function () {
        this._router.navigate(['/select_template']);
    };
    LandscapeTemplateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'landscape',
            templateUrl: 'landscape_template.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, pagination_component_1.PaginationComponent,
                forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, gallary_component_1.GallaryComponent, imagesingle_component_1.ImageSingleComponent]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], LandscapeTemplateComponent);
    return LandscapeTemplateComponent;
}());
exports.LandscapeTemplateComponent = LandscapeTemplateComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC90ZW1wbGF0ZXMvdmlld2Zvb19wcm9fbGFuZHNjYXBlL2xhbmRzY2FwZV90ZW1wbGF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHFCQUF3QyxlQUFlLENBQUMsQ0FBQTtBQUN4RCx1QkFBd0MsaUJBQWlCLENBQUMsQ0FBQTtBQUUxRCx1QkFBOEIsaUJBQWlCLENBQUMsQ0FBQTtBQUNoRCxzQkFBeUMsZ0JBQWdCLENBQUMsQ0FBQTtBQUMxRCxrQ0FBaUMsOEJBQThCLENBQUMsQ0FBQTtBQUNoRSxzQ0FBcUMsc0NBQXNDLENBQUMsQ0FBQTtBQUs1RSxxQ0FBa0MsOENBQThDLENBQUMsQ0FBQTtBQVlqRjtJQUNJLG9DQUFvQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtJQUVuQyxDQUFDO0lBQ0QsNkNBQVEsR0FBUjtRQUVJLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDaEIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELG9EQUFlLEdBQWYsVUFBZ0IsYUFBcUI7UUFBckMsaUJBcUJDO1FBbkJHLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLEdBQUcsYUFBYSxDQUFDLENBQUM7UUFDbkUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQzthQUNyRixTQUFTLENBQUMsVUFBQyxNQUFNO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsSUFBSSxTQUFTLEdBQWMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUV2QyxTQUFTLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztZQUUvQixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFL0MsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV2RSxDQUFDLEVBQUUsVUFBQyxLQUFVO1lBQ1YsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDRCxvREFBZSxHQUFmLFVBQWdCLFdBQW1CLEVBQUUsS0FBYTtRQUFsRCxpQkFzQkM7UUFwQkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxXQUFXLEdBQUcsWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3ZFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUVoQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUM7YUFDeEMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFcEIsYUFBYSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFFN0IsVUFBVSxDQUFDO2dCQUNQLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEQsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBSWIsQ0FBQyxFQUFFLFVBQUMsS0FBVTtZQUNWLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsbURBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFwRUw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSxtQ0FBbUM7WUFDaEQsVUFBVSxFQUFFLENBQUMsMEJBQWlCLEVBQUUsMENBQW1CO2dCQUMvQyxnQ0FBd0IsRUFBRSx3QkFBZSxFQUFFLG9DQUFnQixFQUFFLDRDQUFvQixDQUFDO1NBRXpGLENBQUM7O2tDQUFBO0lBOERGLGlDQUFDO0FBQUQsQ0E1REEsQUE0REMsSUFBQTtBQTVEWSxrQ0FBMEIsNkJBNER0QyxDQUFBIiwiZmlsZSI6ImFwcC90ZW1wbGF0ZXMvdmlld2Zvb19wcm9fbGFuZHNjYXBlL2xhbmRzY2FwZV90ZW1wbGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTLCBSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgR2FsbGFyeUNvbXBvbmVudCB9IGZyb20gJy4uL2dhbGxhcnkvZ2FsbGFyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1hZ2VTaW5nbGVDb21wb25lbnQgfSBmcm9tICcuLi9pbWFnZXNpbmdsZS9pbWFnZXNpbmdsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3Zm9vIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtQYWdpbmF0aW9uQ29tcG9uZW50fSBmcm9tICcuLi8uLi9zaGFyZWQvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vLi4vZ2xvYmFscycpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnbGFuZHNjYXBlJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2xhbmRzY2FwZV90ZW1wbGF0ZS5jb21wb25lbnQuaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTLCBQYWdpbmF0aW9uQ29tcG9uZW50LFxuICAgICAgICBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMsIENPUkVfRElSRUNUSVZFUywgR2FsbGFyeUNvbXBvbmVudCwgSW1hZ2VTaW5nbGVDb21wb25lbnRdXG5cbn0pXG5cbmV4cG9ydCBjbGFzcyBMYW5kc2NhcGVUZW1wbGF0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIpIHtcblxuICAgIH1cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICAkKCcubmF2X2JhcicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCgnLm5hdmlnYXRpb24nKS50b2dnbGVDbGFzcygndmlzaWJsZScpO1xuICAgICAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdvcGFjaXR5Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb250YWluZXJDcmVhdGUoY29udGFpbmVydHlwZTogc3RyaW5nKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJsYW5kc2NhcGVfdGVtcGxhdGUgY29udGFpbmVyQ3JlYXRlIFwiICsgY29udGFpbmVydHlwZSk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5jb250YWluZXJDcmVhdGUoY29udGFpbmVydHlwZSwgdGhpcy5jdXJyZW50Vmlld2Zvby5pZCwgdGhpcy5sb2dpblVzZXIuaWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxhbmRzY2FwZSBDb250YWluZXIgQ3JlYXRlZFwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIHZhciBjb250YWluZXI6IENvbnRhaW5lciA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5jdXJyZW50Vmlld2Zvbyk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNvbnRhaW5lcmltYWdlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50Vmlld2Zvby5jb250YWluZXJzLnB1c2goY29udGFpbmVyKTtcblxuICAgICAgICAgICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoeyBzY3JvbGxUb3A6ICQoZG9jdW1lbnQpLmhlaWdodCgpIH0sIDEwMDApO1xuXG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbnRhaW5lciBjcmVhdGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgZGVsZXRlY29udGFpbmVyKGNvbnRhaW5lcmlkOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgLy9hbGVydChcImRlbGV0ZSBcIitjb250YWluZXJpZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZGVsZXRlY29udGFpbmVyIDogXCIgKyBjb250YWluZXJpZCArIFwiICBpbmRleCA6IFwiICsgaW5kZXgpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGN1cnJDb250YWluZXIgPSBzZWxmLmN1cnJlbnRWaWV3Zm9vLmNvbnRhaW5lcnNbaW5kZXhdO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmNvbnRhaW5lckRlbGV0ZShjb250YWluZXJpZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICBjdXJyQ29udGFpbmVyLmRlbGV0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50Vmlld2Zvby5jb250YWluZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgICAgICAgICAvL2RlbGV0ZSBzZWxmLmN1cnJlbnRWaWV3Zm9vLm1hcENvbnRhaW5lcltjb250YWluZXJpZF07XG4gICAgICAgICAgICAgICAgLy9jcmF0ZUJsYW5rSW1nKGNpZCwgbnVtRGl2KTtcbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29udGFpbmVyaW1hZ2UgZGVsZXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VsZWN0dGVtcGxhdGUoKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9zZWxlY3RfdGVtcGxhdGUnXSk7XG4gICAgfVxufVxuXG4iXX0=
