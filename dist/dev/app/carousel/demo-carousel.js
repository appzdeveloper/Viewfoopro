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
var carousel_1 = require('../shared/carousel/carousel');
var common_1 = require('@angular/common');
var DemoCarousel = (function () {
    function DemoCarousel() {
        this.model = {};
        this.slideIndex = 1;
        this.slideWrap = true;
        this.slideInterval = 5000;
        this.slidePause = "hover";
        this.slideNoTransition = false;
        this.extraSlides = false;
    }
    DemoCarousel.prototype.onIndexFieldChange = function (event) {
        this.slideIndex = event.target.value;
    };
    DemoCarousel.prototype.onIndexChange = function (newValue) {
        this.slideIndex = newValue;
    };
    DemoCarousel.prototype.onIntervalFieldChange = function (event) {
        this.slideInterval = event.target.value;
    };
    DemoCarousel.prototype.onWrapCheckboxChange = function (event) {
        this.slideWrap = event.target.checked;
    };
    DemoCarousel.prototype.onPauseCheckboxChange = function (event) {
        this.slidePause = event.target.checked ? "hover" : "";
    };
    DemoCarousel.prototype.onAnimationCheckboxChange = function (event) {
        this.slideNoTransition = !event.target.checked;
    };
    DemoCarousel.prototype.onExtraCheckboxChange = function (event) {
        this.extraSlides = event.target.checked;
    };
    DemoCarousel.prototype.onSlideStart = function () {
    };
    DemoCarousel.prototype.onSlideEnd = function () {
    };
    DemoCarousel = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'demo-carousel',
            templateUrl: 'demo-carousel.html',
            directives: [common_1.NgIf, carousel_1.Carousel, carousel_1.CarouselSlide, carousel_1.CarouselCaption]
        }), 
        __metadata('design:paramtypes', [])
    ], DemoCarousel);
    return DemoCarousel;
}());
exports.DemoCarousel = DemoCarousel;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jYXJvdXNlbC9kZW1vLWNhcm91c2VsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMseUJBQXVELDZCQUE2QixDQUFDLENBQUE7QUFDckYsdUJBQW1CLGlCQUFpQixDQUFDLENBQUE7QUFTckM7SUFVSTtRQVJBLFVBQUssR0FBRyxFQUFFLENBQUM7UUFTUCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztRQUMxQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFDRCx5Q0FBa0IsR0FBbEIsVUFBbUIsS0FBSztRQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ3pDLENBQUM7SUFDRCxvQ0FBYSxHQUFiLFVBQWMsUUFBUTtRQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztJQUMvQixDQUFDO0lBQ0QsNENBQXFCLEdBQXJCLFVBQXNCLEtBQUs7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUM1QyxDQUFDO0lBQ0QsMkNBQW9CLEdBQXBCLFVBQXFCLEtBQUs7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUMxQyxDQUFDO0lBQ0QsNENBQXFCLEdBQXJCLFVBQXNCLEtBQUs7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQzFELENBQUM7SUFDRCxnREFBeUIsR0FBekIsVUFBMEIsS0FBSztRQUMzQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuRCxDQUFDO0lBQ0QsNENBQXFCLEdBQXJCLFVBQXNCLEtBQUs7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUM1QyxDQUFDO0lBQ0QsbUNBQVksR0FBWjtJQUVBLENBQUM7SUFDRCxpQ0FBVSxHQUFWO0lBRUEsQ0FBQztJQWxETDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLG9CQUFvQjtZQUNqQyxVQUFVLEVBQUUsQ0FBQyxhQUFJLEVBQUUsbUJBQVEsRUFBRSx3QkFBYSxFQUFFLDBCQUFlLENBQUM7U0FDL0QsQ0FBQzs7b0JBQUE7SUE4Q0YsbUJBQUM7QUFBRCxDQTdDQSxBQTZDQyxJQUFBO0FBN0NZLG9CQUFZLGVBNkN4QixDQUFBIiwiZmlsZSI6ImFwcC9jYXJvdXNlbC9kZW1vLWNhcm91c2VsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDYXJvdXNlbCwgQ2Fyb3VzZWxTbGlkZSwgQ2Fyb3VzZWxDYXB0aW9ufSBmcm9tICcuLi9zaGFyZWQvY2Fyb3VzZWwvY2Fyb3VzZWwnO1xuaW1wb3J0IHtOZ0lmfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdGb3JtIH0gICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnZGVtby1jYXJvdXNlbCcsXG4gICAgdGVtcGxhdGVVcmw6ICdkZW1vLWNhcm91c2VsLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtOZ0lmLCBDYXJvdXNlbCwgQ2Fyb3VzZWxTbGlkZSwgQ2Fyb3VzZWxDYXB0aW9uXVxufSlcbmV4cG9ydCBjbGFzcyBEZW1vQ2Fyb3VzZWwge1xuXG4gICAgbW9kZWwgPSB7fTtcblxuICAgIHNsaWRlSW5kZXg7XG4gICAgc2xpZGVXcmFwO1xuICAgIHNsaWRlSW50ZXJ2YWw7XG4gICAgc2xpZGVQYXVzZTtcbiAgICBzbGlkZU5vVHJhbnNpdGlvbjtcbiAgICBleHRyYVNsaWRlcztcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gMTtcbiAgICAgICAgdGhpcy5zbGlkZVdyYXAgPSB0cnVlO1xuICAgICAgICB0aGlzLnNsaWRlSW50ZXJ2YWwgPSA1MDAwO1xuICAgICAgICB0aGlzLnNsaWRlUGF1c2UgPSBcImhvdmVyXCI7XG4gICAgICAgIHRoaXMuc2xpZGVOb1RyYW5zaXRpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5leHRyYVNsaWRlcyA9IGZhbHNlO1xuICAgIH1cbiAgICBvbkluZGV4RmllbGRDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIH1cbiAgICBvbkluZGV4Q2hhbmdlKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2xpZGVJbmRleCA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgICBvbkludGVydmFsRmllbGRDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zbGlkZUludGVydmFsID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIH1cbiAgICBvbldyYXBDaGVja2JveENoYW5nZShldmVudCkge1xuICAgICAgICB0aGlzLnNsaWRlV3JhcCA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAgIH1cbiAgICBvblBhdXNlQ2hlY2tib3hDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zbGlkZVBhdXNlID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQgPyBcImhvdmVyXCIgOiBcIlwiO1xuICAgIH1cbiAgICBvbkFuaW1hdGlvbkNoZWNrYm94Q2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2xpZGVOb1RyYW5zaXRpb24gPSAhZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgfVxuICAgIG9uRXh0cmFDaGVja2JveENoYW5nZShldmVudCkge1xuICAgICAgICB0aGlzLmV4dHJhU2xpZGVzID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgfVxuICAgIG9uU2xpZGVTdGFydCgpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlN0YXJ0IHNsaWRpbmdcIik7XG4gICAgfVxuICAgIG9uU2xpZGVFbmQoKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJFbmQgc2xpZGluZ1wiKTtcbiAgICB9XG59XG4iXX0=
