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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var auth_service_1 = require('../../shared/services/auth.service');
var pagination_component_1 = require('../../shared/pagination/pagination.component');
var myGlobals = require('../../globals');
var CarouselViewComponent = (function () {
    function CarouselViewComponent(zone, _changeDetectionRef, elementRef, authService) {
        this._changeDetectionRef = _changeDetectionRef;
        this.elementRef = elementRef;
        this.authService = authService;
        this.currentViewfoo = {};
        this.onContainerDelete = new core_1.EventEmitter();
        this.onContainerUpdate = new core_1.EventEmitter();
        this.serviceUrl = myGlobals.serviceUrl;
        this.slideIndex = 1;
        this.slideWrap = true;
        this.slideInterval = 0;
        this.slidePause = "hover";
        this.slideNoTransition = true;
        this.extraSlides = false;
        this.zone = zone;
        this.loginUser = myGlobals.LoginUser;
    }
    Object.defineProperty(CarouselViewComponent.prototype, "ngGridItemEvent", {
        get: function () {
            return this._ngGridItemEvent;
        },
        set: function (v) {
            if (v) {
                this._ngGridItemEvent = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    CarouselViewComponent.prototype.ngOnInit = function () {
        var self = this;
        var container = this.container;
        this.containertype = container.containertype;
    };
    CarouselViewComponent.prototype.ngAfterViewInit = function () {
        this.initContainerForDropzone();
        var self = this;
        this._changeDetectionRef.detectChanges();
    };
    CarouselViewComponent.prototype.initContainerForDropzone = function () {
        var self = this;
        var container = this.container;
        container.opacity = 1;
        container.dispImageArray = [];
        container.itemsPerPage = 1;
        container.currentPage = 1;
        container.gotoLastPage = false;
        var totalImageArray = [];
        for (var j = 0; j < container.containerimages.length; j++) {
            totalImageArray.push(container.containerimages[j]);
        }
        this.containertype = container.containertype;
        container.totalImageArray = totalImageArray;
        this.copyArrayFromTotalToDisplay();
    };
    CarouselViewComponent.prototype.currentPageChanged = function (event, container) {
        container.currentPage = event.page;
        this.copyArrayFromTotalToDisplay();
    };
    CarouselViewComponent.prototype.numberOfPages = function (totalPages, container) {
        container.totalPages = totalPages;
    };
    CarouselViewComponent.prototype.copyArrayFromTotalToDisplay = function () {
        var self = this;
        var container = this.container;
        this.containerimage = container.totalImageArray[(container.currentPage - 1)];
        console.log(this.containerimage);
    };
    CarouselViewComponent.prototype.previousPage = function (event, container) {
        var self = this;
        var container = this.container;
        this.container.currentPage1 = container.currentPage - 1;
        console.log(this.containerimage);
    };
    CarouselViewComponent.prototype.nextPage = function (event, container) {
        var self = this;
        var container = this.container;
        this.container.currentPage1 = container.currentPage + 1;
        console.log("nextPage > " + this.container.currentPage1);
        console.log(this.containerimage);
    };
    CarouselViewComponent.prototype.onClickPreview = function (index) {
        var self = this;
        var imgLength = self.container.containerimages.length;
        var fancyArray = [];
        for (var j = 0; j < imgLength; j++) {
            var containerimage = self.container.containerimages[j];
            var imgUrl = self.serviceUrl + "/upload/gallery/" + containerimage.imagename;
            var objImage = {
                href: imgUrl
            };
            fancyArray.push(objImage);
        }
        $.fancybox.open(fancyArray, {
            autoSize: true,
            index: index,
            prevEffect: 'none',
            nextEffect: 'none',
            helpers: {
                buttons: {}
            }
        });
    };
    __decorate([
        core_1.ViewChild('imgblock'), 
        __metadata('design:type', core_1.ElementRef)
    ], CarouselViewComponent.prototype, "imgblock", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CarouselViewComponent.prototype, "container", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CarouselViewComponent.prototype, "ngGridItemEvent", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CarouselViewComponent.prototype, "onContainerDelete", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CarouselViewComponent.prototype, "onContainerUpdate", void 0);
    CarouselViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'carouselview',
            templateUrl: 'carouselview.component.html',
            directives: [pagination_component_1.PaginationComponent, forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.NgIf]
        }), 
        __metadata('design:paramtypes', [core_1.NgZone, core_1.ChangeDetectorRef, core_1.ElementRef, auth_service_1.AuthService])
    ], CarouselViewComponent);
    return CarouselViewComponent;
}());
exports.CarouselViewComponent = CarouselViewComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC92aWV3Zm9vZGV0YWlsL2Nhcm91c2Vsdmlldy9jYXJvdXNlbHZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxxQkFFSyxlQUFlLENBQUMsQ0FBQTtBQUNyQix1QkFBbUMsaUJBQWlCLENBQUMsQ0FBQTtBQUNyRCxzQkFBeUMsZ0JBQWdCLENBQUMsQ0FBQTtBQUcxRCw2QkFBNEIsb0NBQW9DLENBQUMsQ0FBQTtBQUdqRSxxQ0FBa0MsOENBQThDLENBQUMsQ0FBQTtBQUNqRixJQUFPLFNBQVMsV0FBVyxlQUFlLENBQUMsQ0FBQztBQVE1QztJQWtESSwrQkFBWSxJQUFZLEVBQVUsbUJBQXNDLEVBQzdELFVBQXNCLEVBQ3JCLFdBQXdCO1FBRkYsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFtQjtRQUM3RCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3JCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBaERwQyxtQkFBYyxHQUFZLEVBQUUsQ0FBQztRQXFCWCxzQkFBaUIsR0FBeUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDN0Qsc0JBQWlCLEdBQXlCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBTy9FLGVBQVUsR0FBVyxTQUFTLENBQUMsVUFBVSxDQUFDO1FBVTFDLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxPQUFPLENBQUM7UUFDckIsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBS2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUV6QyxDQUFDO0lBL0NRLHNCQUFXLGtEQUFlO2FBQTFCO1lBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqQyxDQUFDO2FBRUQsVUFBMkIsQ0FBTTtZQUM3QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7WUFFOUIsQ0FBQztRQUtMLENBQUM7OztPQVhBO0lBK0NELHdDQUFRLEdBQVI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUM7SUFDakQsQ0FBQztJQUVELCtDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNoQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFJZixJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVELHdEQUF3QixHQUF4QjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRS9CLFNBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLFNBQVMsQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBRTlCLFNBQVMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRzNCLFNBQVMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLFNBQVMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBRy9CLElBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUV6QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDeEQsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztRQUM3QyxTQUFTLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUU1QyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztJQUd2QyxDQUFDO0lBRUQsa0RBQWtCLEdBQWxCLFVBQW1CLEtBQVUsRUFBRSxTQUFjO1FBS3pDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUVuQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztJQUV2QyxDQUFDO0lBRUQsNkNBQWEsR0FBYixVQUFjLFVBQWUsRUFBRSxTQUFjO1FBR3pDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ3RDLENBQUM7SUFFRCwyREFBMkIsR0FBM0I7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUcvQixJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELDRDQUFZLEdBQVosVUFBYSxLQUFVLEVBQUUsU0FBYztRQUNuQyxJQUFJLElBQUksR0FBQyxJQUFJLENBQUM7UUFDZCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRy9CLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDO1FBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBSXJDLENBQUM7SUFDRCx3Q0FBUSxHQUFSLFVBQVMsS0FBVSxFQUFFLFNBQWM7UUFFL0IsSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDO1FBQ2QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUcvQixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQztRQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBSXJDLENBQUM7SUFHRCw4Q0FBYyxHQUFkLFVBQWUsS0FBYTtRQUN4QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBRXRELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNwQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBRWpDLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsa0JBQWtCLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQztZQUU3RSxJQUFJLFFBQVEsR0FBRztnQkFDWCxJQUFJLEVBQUUsTUFBTTthQUNmLENBQUM7WUFDRixVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFRCxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDeEIsUUFBUSxFQUFFLElBQUk7WUFDZCxLQUFLLEVBQUUsS0FBSztZQUNaLFVBQVUsRUFBRSxNQUFNO1lBQ2xCLFVBQVUsRUFBRSxNQUFNO1lBQ2xCLE9BQU8sRUFBRTtnQkFLTCxPQUFPLEVBQUUsRUFBRTthQUNkO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWhMRDtRQUFDLGdCQUFTLENBQUMsVUFBVSxDQUFDOzsyREFBQTtJQUV0QjtRQUFDLFlBQUssRUFBRTs7NERBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7Z0VBQUE7SUFlUjtRQUFDLGFBQU0sRUFBRTs7b0VBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7b0VBQUE7SUFoQ2I7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsVUFBVSxFQUFFLENBQUMsMENBQW1CLEVBQUUsZ0NBQXdCLEVBQUUsd0JBQWUsRUFBQyxhQUFJLENBQUM7U0FDcEYsQ0FBQzs7NkJBQUE7SUF5TEYsNEJBQUM7QUFBRCxDQXhMQSxBQXdMQyxJQUFBO0FBeExZLDZCQUFxQix3QkF3TGpDLENBQUEiLCJmaWxlIjoiYXBwL3ZpZXdmb29kZXRhaWwvY2Fyb3VzZWx2aWV3L2Nhcm91c2Vsdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZH1cbmZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVMsTmdJZn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3Zm9vIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtQYWdpbmF0aW9uQ29tcG9uZW50fSBmcm9tICcuLi8uLi9zaGFyZWQvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vLi4vZ2xvYmFscycpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnY2Fyb3VzZWx2aWV3JyxcbiAgICB0ZW1wbGF0ZVVybDogJ2Nhcm91c2Vsdmlldy5jb21wb25lbnQuaHRtbCdcbiAgICBkaXJlY3RpdmVzOiBbUGFnaW5hdGlvbkNvbXBvbmVudCwgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTLCBDT1JFX0RJUkVDVElWRVMsTmdJZl1cbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHB1YmxpYyBjb250YWluZXJ0eXBlOiBzdHJpbmc7XG4gICAgXG4gICAgY3VycmVudFZpZXdmb286IFZpZXdmb28gPSB7fTtcbiAgICBcbiAgICBAVmlld0NoaWxkKCdpbWdibG9jaycpIGltZ2Jsb2NrOiBFbGVtZW50UmVmO1xuXG4gICAgQElucHV0KCkgcHVibGljIGNvbnRhaW5lcjogYW55O1xuXG4gICAgQElucHV0KCkgcHVibGljIGdldCBuZ0dyaWRJdGVtRXZlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uZ0dyaWRJdGVtRXZlbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBuZ0dyaWRJdGVtRXZlbnQodjogYW55KSB7XG4gICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICB0aGlzLl9uZ0dyaWRJdGVtRXZlbnQgPSB2O1xuICAgICAgICAgICAgLy90aGlzLnVwZGF0ZVBhZ2luZ0Jhc2Vkb25IVygpO1xuICAgICAgICB9XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJHYWxsYXJ5Q29tcG9uZW50IG5nR3JpZEl0ZW1FdmVudCBjaGFuZ2VkXCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHYpO1xuXG4gICAgICAgIC8vdGhpcy50b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2VzKCk7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpIHByaXZhdGUgb25Db250YWluZXJEZWxldGU6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBwcml2YXRlIG9uQ29udGFpbmVyVXBkYXRlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAvL0BPdXRwdXQoKSBwcml2YXRlIG9uQ29udGFpbmVySW1hZ2VDbGljazogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBsb2dpblVzZXI6IFVzZXI7XG5cbiAgICB2aWV3Zm9vaWQ6IHN0cmluZztcbiAgICBjb250YWluZXJpZDogc3RyaW5nO1xuICAgIHNlcnZpY2VVcmw6IHN0cmluZyA9IG15R2xvYmFscy5zZXJ2aWNlVXJsO1xuICAgIGl0ZW06IGFueTtcbiAgICBteURyb3B6b25lOiBhbnk7XG5cbiAgICBkWm9uZTogYW55O1xuXG4gICAgem9uZTogTmdab25lO1xuICAgIFxuICAgIGNvbnRhaW5lcmltYWdlOiBhbnk7ICAgIFxuICAgIFxuICAgIHNsaWRlSW5kZXggPSAxO1xuICAgIHNsaWRlV3JhcCA9IHRydWU7XG4gICAgc2xpZGVJbnRlcnZhbCA9IDA7XG4gICAgc2xpZGVQYXVzZSA9IFwiaG92ZXJcIjtcbiAgICBzbGlkZU5vVHJhbnNpdGlvbiA9IHRydWU7XG4gICAgZXh0cmFTbGlkZXMgPSBmYWxzZTtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcih6b25lOiBOZ1pvbmUsIHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xuICAgICAgICB0aGlzLnpvbmUgPSB6b25lO1xuXG4gICAgICAgIHRoaXMubG9naW5Vc2VyID0gbXlHbG9iYWxzLkxvZ2luVXNlcjtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICB0aGlzLmNvbnRhaW5lcnR5cGUgPSBjb250YWluZXIuY29udGFpbmVydHlwZTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdENvbnRhaW5lckZvckRyb3B6b25lKCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbi8vICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgIHNlbGYuaW5pdENvbnRhaW5lckZvckRyb3B6b25lKCk7XG4vLyAgICAgICAgfSwxMDAwKVxuICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9ICAgIFxuXG4gICAgaW5pdENvbnRhaW5lckZvckRyb3B6b25lKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcblxuICAgICAgICBjb250YWluZXIub3BhY2l0eSA9IDE7XG4gICAgICAgIGNvbnRhaW5lci5kaXNwSW1hZ2VBcnJheSA9IFtdO1xuXG4gICAgICAgIGNvbnRhaW5lci5pdGVtc1BlclBhZ2UgPSAxO1xuICAgICAgICAvL3RoaXMudXBkYXRlUGFnaW5nQmFzZWRvbkhXKCk7XG5cbiAgICAgICAgY29udGFpbmVyLmN1cnJlbnRQYWdlID0gMTtcbiAgICAgICAgY29udGFpbmVyLmdvdG9MYXN0UGFnZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vW10uc2xpY2UgPT09IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbiAgICAgICAgdmFyIHRvdGFsSW1hZ2VBcnJheSA9IFtdO1xuICAgICAgIFxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbnRhaW5lci5jb250YWluZXJpbWFnZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHRvdGFsSW1hZ2VBcnJheS5wdXNoKGNvbnRhaW5lci5jb250YWluZXJpbWFnZXNbal0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGFpbmVydHlwZSA9IGNvbnRhaW5lci5jb250YWluZXJ0eXBlO1xuICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5ID0gdG90YWxJbWFnZUFycmF5O1xuXG4gICAgICAgIHRoaXMuY29weUFycmF5RnJvbVRvdGFsVG9EaXNwbGF5KCk7XG5cbiAgICAgICAvLyB0aGlzLmNyZWF0aW5nRHJvcHpvbmVJbnN0YW5jZXMoKTtcbiAgICB9XG5cbiAgICBjdXJyZW50UGFnZUNoYW5nZWQoZXZlbnQ6IGFueSwgY29udGFpbmVyOiBhbnkpIHtcbiAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKFwiY3VycmVudFBhZ2VDaGFuZ2VkID4gXCIpO1xuICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2coZXZlbnQucGFnZSk7XG4gICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyhjb250YWluZXIudG90YWxJbWFnZUFycmF5Lmxlbmd0aCk7XG5cbiAgICAgICAgY29udGFpbmVyLmN1cnJlbnRQYWdlID0gZXZlbnQucGFnZTtcblxuICAgICAgICB0aGlzLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheSgpO1xuXG4gICAgfVxuXG4gICAgbnVtYmVyT2ZQYWdlcyh0b3RhbFBhZ2VzOiBhbnksIGNvbnRhaW5lcjogYW55KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJudW1iZXJPZlBhZ2VzID4gXCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgICAgY29udGFpbmVyLnRvdGFsUGFnZXMgPSB0b3RhbFBhZ2VzO1xuICAgIH1cblxuICAgIGNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheSgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdGhpcy5jb250YWluZXJpbWFnZSA9IGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbKGNvbnRhaW5lci5jdXJyZW50UGFnZS0xKV07XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29udGFpbmVyaW1hZ2UpO1xuICAgIH1cbiAgICBcbiAgICBwcmV2aW91c1BhZ2UoZXZlbnQ6IGFueSwgY29udGFpbmVyOiBhbnkpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIC8vdGhpcy5jb250YWluZXJpbWFnZSA9IGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbKGNvbnRhaW5lci5jdXJyZW50UGFnZS0yKV07XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jdXJyZW50UGFnZTEgPSBjb250YWluZXIuY3VycmVudFBhZ2UtMTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb250YWluZXJpbWFnZSk7XG4gICAgICAgIC8vdGhpcy5jdXJyZW50UGFnZUNoYW5nZWQoZXZlbnQsIGNvbnRhaW5lcik7XG4gICAgICAvLyAgdGhpcy5udW1iZXJPZlBhZ2VzKHRvdGFsUGFnZXM6IGFueSwgY29udGFpbmVyOiBhbnkpXG4gICAgICAgIFxuICAgIH1cbiAgICBuZXh0UGFnZShldmVudDogYW55LCBjb250YWluZXI6IGFueSl7XG4gICAgICAgIC8vYWxlcnQoXCJIZWxsb1wiKTtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICAvL3RoaXMuY29udGFpbmVyaW1hZ2UgPSBjb250YWluZXIudG90YWxJbWFnZUFycmF5Wyhjb250YWluZXIuY3VycmVudFBhZ2UpXTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmN1cnJlbnRQYWdlMSA9IGNvbnRhaW5lci5jdXJyZW50UGFnZSsxO1xuICAgICAgICBjb25zb2xlLmxvZyhcIm5leHRQYWdlID4gXCIrdGhpcy5jb250YWluZXIuY3VycmVudFBhZ2UxKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb250YWluZXJpbWFnZSk7XG4gICAgICAgIC8vdGhpcy5jdXJyZW50UGFnZUNoYW5nZWQoZXZlbnQsIGNvbnRhaW5lcik7XG4gICAgICAvLyAgdGhpcy5udW1iZXJPZlBhZ2VzKHRvdGFsUGFnZXM6IGFueSwgY29udGFpbmVyOiBhbnkpXG4gICAgICAgIFxuICAgIH1cbiAgICBcblxuICAgIG9uQ2xpY2tQcmV2aWV3KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgaW1nTGVuZ3RoID0gc2VsZi5jb250YWluZXIuY29udGFpbmVyaW1hZ2VzLmxlbmd0aDtcblxuICAgICAgICB2YXIgZmFuY3lBcnJheSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGltZ0xlbmd0aDsgaisrKSB7XG5cbiAgICAgICAgICAgIHZhciBjb250YWluZXJpbWFnZSA9IHNlbGYuY29udGFpbmVyLmNvbnRhaW5lcmltYWdlc1tqXTtcbiAgICAgICAgICAgIHZhciBpbWdVcmwgPSBzZWxmLnNlcnZpY2VVcmwgKyBcIi91cGxvYWQvZ2FsbGVyeS9cIiArIGNvbnRhaW5lcmltYWdlLmltYWdlbmFtZTtcblxuICAgICAgICAgICAgdmFyIG9iakltYWdlID0ge1xuICAgICAgICAgICAgICAgIGhyZWY6IGltZ1VybFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZhbmN5QXJyYXkucHVzaChvYmpJbWFnZSk7XG4gICAgICAgIH1cblxuICAgICAgICAkLmZhbmN5Ym94Lm9wZW4oZmFuY3lBcnJheSwge1xuICAgICAgICAgICAgYXV0b1NpemU6IHRydWUsXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICBwcmV2RWZmZWN0OiAnbm9uZScsXG4gICAgICAgICAgICBuZXh0RWZmZWN0OiAnbm9uZScsXG4gICAgICAgICAgICBoZWxwZXJzOiB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGh1bWJzOiB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3NSxcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidXR0b25zOiB7fVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG59XG5cbiJdfQ==
