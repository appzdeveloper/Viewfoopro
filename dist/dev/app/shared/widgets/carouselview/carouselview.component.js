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
var auth_service_1 = require('../../services/auth.service');
var pagination_component_1 = require('../../pagination/pagination.component');
var myGlobals = require('../../../globals');
var CarouselViewComponent = (function () {
    function CarouselViewComponent(_changeDetectionRef, elementRef, authService) {
        this._changeDetectionRef = _changeDetectionRef;
        this.elementRef = elementRef;
        this.authService = authService;
        this.currentViewfoo = {};
        this.changeComment = new core_1.EventEmitter();
        this.changeShare = new core_1.EventEmitter();
        this.serviceUrl = myGlobals.serviceUrl;
        this.imageUrl = myGlobals.imageUrl + '/upload/gallery/';
        this.loginUser = myGlobals.LoginUser;
    }
    CarouselViewComponent.prototype.ngOnInit = function () {
        if (!this.container.containerimages) {
            this.container.containerimages = [];
        }
    };
    CarouselViewComponent.prototype.ngAfterViewInit = function () {
        this.initContainerForDropzone();
        var self = this;
        this._changeDetectionRef.detectChanges();
    };
    CarouselViewComponent.prototype.commentImage = function (containerimage) {
        this.changeComment.emit(containerimage);
    };
    CarouselViewComponent.prototype.shareImage = function (containerimage) {
        this.changeShare.emit(containerimage);
    };
    CarouselViewComponent.prototype.initContainerForDropzone = function () {
        var self = this;
        var container = this.container;
        this.containertype = container.containertype;
        container.opacity = 1;
        container.dispImageArray = [];
        container.itemsPerPage = 1;
        container.currentPage = 1;
        container.gotoLastPage = false;
        var totalImageArray = [];
        for (var j = 0; j < container.containerimages.length; j++) {
            totalImageArray.push(container.containerimages[j]);
        }
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
    CarouselViewComponent.prototype.onClickImage = function (containerimage) {
        containerimage.isclicked = !containerimage.isclicked;
        if (this.currContainerImage && this.currContainerImage != containerimage) {
            this.currContainerImage.isclicked = false;
        }
        this.currContainerImage = containerimage;
    };
    CarouselViewComponent.prototype.onClickPreview = function (index) {
        var self = this;
        var imgLength = self.container.containerimages.length;
        var fancyArray = [];
        for (var j = 0; j < imgLength; j++) {
            var containerimage = self.container.containerimages[j];
            var imgUrl = containerimage.imagename;
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
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CarouselViewComponent.prototype, "container", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CarouselViewComponent.prototype, "currentViewfoo", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CarouselViewComponent.prototype, "changeComment", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CarouselViewComponent.prototype, "changeShare", void 0);
    CarouselViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'carouselview',
            templateUrl: 'carouselview.component.html',
            directives: [pagination_component_1.PaginationComponent, forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.NgIf]
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, core_1.ElementRef, auth_service_1.AuthService])
    ], CarouselViewComponent);
    return CarouselViewComponent;
}());
exports.CarouselViewComponent = CarouselViewComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvd2lkZ2V0cy9jYXJvdXNlbHZpZXcvY2Fyb3VzZWx2aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EscUJBRUssZUFBZSxDQUFDLENBQUE7QUFDckIsdUJBQW1DLGlCQUFpQixDQUFDLENBQUE7QUFDckQsc0JBQXlDLGdCQUFnQixDQUFDLENBQUE7QUFHMUQsNkJBQTRCLDZCQUE2QixDQUFDLENBQUE7QUFHMUQscUNBQWtDLHVDQUF1QyxDQUFDLENBQUE7QUFDMUUsSUFBTyxTQUFTLFdBQVcsa0JBQWtCLENBQUMsQ0FBQztBQVEvQztJQTBCSSwrQkFBb0IsbUJBQXNDLEVBQy9DLFVBQXNCLEVBQ3JCLFdBQXdCO1FBRmhCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFDL0MsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNyQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQXZCcEIsbUJBQWMsR0FBUSxFQUFFLENBQUM7UUFNdkIsa0JBQWEsR0FBNEIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDNUQsZ0JBQVcsR0FBNEIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFTNUUsZUFBVSxHQUFXLFNBQVMsQ0FBQyxVQUFVLENBQUM7UUFDMUMsYUFBUSxHQUFXLFNBQVMsQ0FBQyxRQUFRLEdBQUcsa0JBQWtCLENBQUM7UUFRdkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQ3pDLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQ0ksRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3hDLENBQUM7SUFFTCxDQUFDO0lBRUQsK0NBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ2hDLElBQUksSUFBSSxHQUFH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QUU7Z0JBS0wsT0FBTyxFQUFFLEVBQUU7YUFDZDtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUF4S0Q7UUFBQyxZQUFLLEVBQUU7OzREQUFBO0lBQ1I7UUFBQyxZQUFLLEVBQUU7O2lFQUFBO0lBTVI7UUFBQyxhQUFNLEVBQUU7O2dFQUFBO0lBQ1Q7UUFBQyxhQUFNLEVBQUU7OzhEQUFBO0lBbEJiO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsY0FBYztZQUN4QixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFVBQVUsRUFBRSxDQUFDLDBDQUFtQixFQUFFLGdDQUF3QixFQUFFLHdCQUFlLEVBQUMsYUFBSSxDQUFDO1NBQ3BGLENBQUM7OzZCQUFBO0lBK0tGLDRCQUFDO0FBQUQsQ0E5S0EsQUE4S0MsSUFBQTtBQTlLWSw2QkFBcUIsd0JBOEtqQyxDQUFBIiwiZmlsZSI6ImFwcC9zaGFyZWQvd2lkZ2V0cy9jYXJvdXNlbHZpZXcvY2Fyb3VzZWx2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgTmdab25lLCBJbnB1dCwgT3V0cHV0LCBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlLCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0NoaWxkfVxuZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NPUkVfRElSRUNUSVZFUyxOZ0lmfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3Zm9vIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7UGFnaW5hdGlvbkNvbXBvbmVudH0gZnJvbSAnLi4vLi4vcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vLi4vLi4vZ2xvYmFscycpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnY2Fyb3VzZWx2aWV3JyxcbiAgICB0ZW1wbGF0ZVVybDogJ2Nhcm91c2Vsdmlldy5jb21wb25lbnQuaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW1BhZ2luYXRpb25Db21wb25lbnQsIFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUywgQ09SRV9ESVJFQ1RJVkVTLE5nSWZdXG59KVxuZXhwb3J0IGNsYXNzIENhcm91c2VsVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICAvL0BWaWV3Q2hpbGQoJ2ltZ2Jsb2NrJykgaW1nYmxvY2s6IEVsZW1lbnRSZWY7XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgY29udGFpbmVyOiBhbnk7XG4gICAgQElucHV0KCkgcHVibGljIGN1cnJlbnRWaWV3Zm9vOiBhbnkgPSB7fTtcblxuXG4gICAgLy9AT3V0cHV0KCkgcHJpdmF0ZSBvbkNvbnRhaW5lckRlbGV0ZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgLy9AT3V0cHV0KCkgcHJpdmF0ZSBvbkNvbnRhaW5lclVwZGF0ZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgLy9AT3V0cHV0KCkgcHJpdmF0ZSBvbkNvbnRhaW5lckltYWdlQ2xpY2s6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBwcml2YXRlIGNoYW5nZUNvbW1lbnQ6IEV2ZW50RW1pdHRlcjxDb250YWluZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBwcml2YXRlIGNoYW5nZVNoYXJlOiBFdmVudEVtaXR0ZXI8Q29udGFpbmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGxvZ2luVXNlcjogVXNlcjtcblxuICAgIHZpZXdmb29pZDogc3RyaW5nO1xuICAgIGNvbnRhaW5lcmlkOiBzdHJpbmc7XG5cbiAgICBjdXJyQ29udGFpbmVySW1hZ2U6IGFueTtcbiAgICBjb250YWluZXJ0eXBlOnN0cmluZztcbiAgICBzZXJ2aWNlVXJsOiBzdHJpbmcgPSBteUdsb2JhbHMuc2VydmljZVVybDtcbiAgICBpbWFnZVVybDogc3RyaW5nID0gbXlHbG9iYWxzLmltYWdlVXJsICsgJy91cGxvYWQvZ2FsbGVyeS8nO1xuXG4gICAgY29udGFpbmVyaW1hZ2U6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xuXG4gICAgICAgIHRoaXMubG9naW5Vc2VyID0gbXlHbG9iYWxzLkxvZ2luVXNlcjtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYoIXRoaXMuY29udGFpbmVyLmNvbnRhaW5lcmltYWdlcykge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY29udGFpbmVyaW1hZ2VzID0gW107XG4gICAgICAgIH1cbiAgICAgXG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmluaXRDb250YWluZXJGb3JEcm9wem9uZSgpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4vLyAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuLy8gICAgICAgICAgICBzZWxmLmluaXRDb250YWluZXJGb3JEcm9wem9uZSgpO1xuLy8gICAgICAgIH0sMTAwMClcbiAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgY29tbWVudEltYWdlKGNvbnRhaW5lcmltYWdlOiBhbnkpe1xuICAgICAgICB0aGlzLmNoYW5nZUNvbW1lbnQuZW1pdChjb250YWluZXJpbWFnZSk7XG4gICAgfVxuICAgIHNoYXJlSW1hZ2UoY29udGFpbmVyaW1hZ2U6IGFueSl7XG4gICAgICAgIHRoaXMuY2hhbmdlU2hhcmUuZW1pdChjb250YWluZXJpbWFnZSk7XG4gICAgfVxuXG4gICAgaW5pdENvbnRhaW5lckZvckRyb3B6b25lKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5jb250YWluZXJ0eXBlID0gY29udGFpbmVyLmNvbnRhaW5lcnR5cGU7XG4gICAgICAgIGNvbnRhaW5lci5vcGFjaXR5ID0gMTtcbiAgICAgICAgY29udGFpbmVyLmRpc3BJbWFnZUFycmF5ID0gW107XG5cbiAgICAgICAgY29udGFpbmVyLml0ZW1zUGVyUGFnZSA9IDE7XG4gICAgICAgIC8vdGhpcy51cGRhdGVQYWdpbmdCYXNlZG9uSFcoKTtcblxuICAgICAgICBjb250YWluZXIuY3VycmVudFBhZ2UgPSAxO1xuICAgICAgICBjb250YWluZXIuZ290b0xhc3RQYWdlID0gZmFsc2U7XG5cbiAgICAgICAgLy9bXS5zbGljZSA9PT0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuICAgICAgICB2YXIgdG90YWxJbWFnZUFycmF5IDogYW55ID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb250YWluZXIuY29udGFpbmVyaW1hZ2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB0b3RhbEltYWdlQXJyYXkucHVzaChjb250YWluZXIuY29udGFpbmVyaW1hZ2VzW2pdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXkgPSB0b3RhbEltYWdlQXJyYXk7XG5cbiAgICAgICAgdGhpcy5jb3B5QXJyYXlGcm9tVG90YWxUb0Rpc3BsYXkoKTtcblxuICAgICAgIC8vIHRoaXMuY3JlYXRpbmdEcm9wem9uZUluc3RhbmNlcygpO1xuICAgIH1cblxuICAgIGN1cnJlbnRQYWdlQ2hhbmdlZChldmVudDogYW55LCBjb250YWluZXI6IGFueSkge1xuICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2coXCJjdXJyZW50UGFnZUNoYW5nZWQgPiBcIik7XG4gICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyhldmVudC5wYWdlKTtcbiAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXkubGVuZ3RoKTtcblxuICAgICAgICBjb250YWluZXIuY3VycmVudFBhZ2UgPSBldmVudC5wYWdlO1xuXG4gICAgICAgIHRoaXMuY29weUFycmF5RnJvbVRvdGFsVG9EaXNwbGF5KCk7XG5cbiAgICB9XG5cbiAgICBudW1iZXJPZlBhZ2VzKHRvdGFsUGFnZXM6IGFueSwgY29udGFpbmVyOiBhbnkpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIm51bWJlck9mUGFnZXMgPiBcIik7XG4gICAgICAgIC8vY29uc29sZS5sb2coZXZlbnQpO1xuICAgICAgICBjb250YWluZXIudG90YWxQYWdlcyA9IHRvdGFsUGFnZXM7XG4gICAgfVxuXG4gICAgY29weUFycmF5RnJvbVRvdGFsVG9EaXNwbGF5KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcblxuXG4gICAgICAgIHRoaXMuY29udGFpbmVyaW1hZ2UgPSBjb250YWluZXIudG90YWxJbWFnZUFycmF5Wyhjb250YWluZXIuY3VycmVudFBhZ2UtMSldO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvbnRhaW5lcmltYWdlKTtcbiAgICB9XG5cbiAgICBwcmV2aW91c1BhZ2UoZXZlbnQ6IGFueSwgY29udGFpbmVyOiBhbnkpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIC8vdGhpcy5jb250YWluZXJpbWFnZSA9IGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbKGNvbnRhaW5lci5jdXJyZW50UGFnZS0yKV07XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIuY3VycmVudFBhZ2UxID0gY29udGFpbmVyLmN1cnJlbnRQYWdlLTE7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29udGFpbmVyaW1hZ2UpO1xuICAgICAgICAvL3RoaXMuY3VycmVudFBhZ2VDaGFuZ2VkKGV2ZW50LCBjb250YWluZXIpO1xuICAgICAgLy8gIHRoaXMubnVtYmVyT2ZQYWdlcyh0b3RhbFBhZ2VzOiBhbnksIGNvbnRhaW5lcjogYW55KVxuXG4gICAgfVxuICAgIG5leHRQYWdlKGV2ZW50OiBhbnksIGNvbnRhaW5lcjogYW55KXtcbiAgICAgICAgLy9hbGVydChcIkhlbGxvXCIpO1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIC8vdGhpcy5jb250YWluZXJpbWFnZSA9IGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbKGNvbnRhaW5lci5jdXJyZW50UGFnZSldO1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmN1cnJlbnRQYWdlMSA9IGNvbnRhaW5lci5jdXJyZW50UGFnZSsxO1xuICAgICAgICBjb25zb2xlLmxvZyhcIm5leHRQYWdlID4gXCIrdGhpcy5jb250YWluZXIuY3VycmVudFBhZ2UxKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb250YWluZXJpbWFnZSk7XG4gICAgICAgIC8vdGhpcy5jdXJyZW50UGFnZUNoYW5nZWQoZXZlbnQsIGNvbnRhaW5lcik7XG4gICAgICAvLyAgdGhpcy5udW1iZXJPZlBhZ2VzKHRvdGFsUGFnZXM6IGFueSwgY29udGFpbmVyOiBhbnkpXG5cbiAgICB9XG5cblxuICAgIG9uQ2xpY2tJbWFnZShjb250YWluZXJpbWFnZTogYW55KSB7XG4gICAgICAgIGNvbnRhaW5lcmltYWdlLmlzY2xpY2tlZCA9ICFjb250YWluZXJpbWFnZS5pc2NsaWNrZWQ7XG4gICAgICAgIGlmKHRoaXMuY3VyckNvbnRhaW5lckltYWdlICYmIHRoaXMuY3VyckNvbnRhaW5lckltYWdlICE9IGNvbnRhaW5lcmltYWdlKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJDb250YWluZXJJbWFnZS5pc2NsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJDb250YWluZXJJbWFnZSA9IGNvbnRhaW5lcmltYWdlO1xuICAgIH1cblxuICAgIG9uQ2xpY2tQcmV2aWV3KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgaW1nTGVuZ3RoID0gc2VsZi5jb250YWluZXIuY29udGFpbmVyaW1hZ2VzLmxlbmd0aDtcblxuICAgICAgICB2YXIgZmFuY3lBcnJheSA6IGFueSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGltZ0xlbmd0aDsgaisrKSB7XG5cbiAgICAgICAgICAgIHZhciBjb250YWluZXJpbWFnZSA9IHNlbGYuY29udGFpbmVyLmNvbnRhaW5lcmltYWdlc1tqXTtcbiAgICAgICAgICAgIHZhciBpbWdVcmwgPSBjb250YWluZXJpbWFnZS5pbWFnZW5hbWU7XG5cbiAgICAgICAgICAgIHZhciBvYmpJbWFnZSA9IHtcbiAgICAgICAgICAgICAgICBocmVmOiBpbWdVcmxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmYW5jeUFycmF5LnB1c2gob2JqSW1hZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgJC5mYW5jeWJveC5vcGVuKGZhbmN5QXJyYXksIHtcbiAgICAgICAgICAgIGF1dG9TaXplOiB0cnVlLFxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgcHJldkVmZmVjdDogJ25vbmUnLFxuICAgICAgICAgICAgbmV4dEVmZmVjdDogJ25vbmUnLFxuICAgICAgICAgICAgaGVscGVyczoge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRodW1iczoge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzUsXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnV0dG9uczoge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=
